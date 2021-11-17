import { AddressZero, Zero } from "@ethersproject/constants"
import {
  MasterchefResponse,
  useMasterchefBalances,
} from "../store/wallet/hooks"
import { POOLS_MAP, PoolName, TRANSACTION_TYPES, PoolTypes, AXIAL_MASTERCHEF_CONTRACT_ADDRESS } from "../constants"
import {
  formatBNToPercentString,
  getContract,
  getTokenSymbolForPoolType,
} from "../libs"
import { useEffect, useState } from "react"
import { AppState } from "../store"
import { BigNumber } from "@ethersproject/bignumber"
import LPTOKEN_UNGUARDED_ABI from "../constants/abis/lpTokenUnguarded.json"
import { LpTokenUnguarded } from "../../types/ethers-contracts/LpTokenUnguarded"
import META_SWAP_ABI from "../constants/abis/metaSwap.json"
import { MetaSwap } from "../../types/ethers-contracts/MetaSwap"
import { parseUnits } from "@ethersproject/units"
import { useActiveWeb3React } from "."
import { useSelector } from "react-redux"
import { useSwapContract } from "./useContract"
import { ethers } from "ethers"

interface TokenShareType {
  percent: string
  symbol: string
  value: BigNumber
}

export type Partners = "keep" | "sharedStake" | "alchemix"
export interface PoolDataType {
  adminFee: BigNumber
  aParameter: BigNumber
  apr: number | null
  rapr: number | null
  name: string
  reserve: BigNumber | null
  swapFee: BigNumber
  tokens: TokenShareType[]
  totalLocked: BigNumber
  utilization: BigNumber | null
  virtualPrice: BigNumber
  volume: number | null
  isPaused: boolean
  lpTokenPriceUSD: BigNumber
  lpToken: string
}

export interface UserShareType {
  lpTokenBalance: BigNumber
  name: string // TODO: does this need to be on user share?
  share: BigNumber
  tokens: TokenShareType[]
  usdBalance: BigNumber
  underlyingTokensAmount: BigNumber
  masterchefBalance: MasterchefResponse | null
}

export type PoolDataHookReturnType = [PoolDataType, UserShareType | null]

const emptyPoolData = {
  adminFee: Zero,
  aParameter: Zero,
  apr: 0,
  rapr: 0,
  name: "",
  reserve: null,
  swapFee: Zero,
  tokens: [],
  totalLocked: Zero,
  utilization: null,
  virtualPrice: Zero,
  volume: 0,
  aprs: {},
  lpTokenPriceUSD: Zero,
  lpToken: "",
  isPaused: false,
} as PoolDataType

export default function usePoolData(
  poolName?: PoolName,
  useMasterchef?: boolean, //use LP info or masterchef info as source of data for balances
): PoolDataHookReturnType {
  const { account, library, chainId } = useActiveWeb3React()
  const swapContract = useSwapContract(poolName)
  const { tokenPricesUSD, lastTransactionTimes, swapStats, masterchefApr } = useSelector(
    (state: AppState) => state.application,
  )
  const lastDepositTime = lastTransactionTimes[TRANSACTION_TYPES.DEPOSIT]
  const lastWithdrawTime = lastTransactionTimes[TRANSACTION_TYPES.WITHDRAW]
  const lastSwapTime = lastTransactionTimes[TRANSACTION_TYPES.SWAP]
  const lastMigrateTime = lastTransactionTimes[TRANSACTION_TYPES.MIGRATE]
  const masterchefBalances = useMasterchefBalances()
  const [poolData, setPoolData] = useState<PoolDataHookReturnType>([
    {
      ...emptyPoolData,
      name: poolName || "",
    },
    null,
  ])

  useEffect(() => {
    async function getSwapData(): Promise<void> {
      if (
        poolName == null ||
        swapContract == null ||
        tokenPricesUSD == null ||
        library == null ||
        chainId == null
      ) {
        if(poolName && library) {
          const POOL = POOLS_MAP[poolName]
          if(POOL.type !== PoolTypes.LP) {
            return
          }

          let masterchefPool
          if(masterchefApr && masterchefBalances){
            masterchefPool = masterchefApr[POOL.addresses[43114]]
          } else {
            return
          }

          const lpTokenContract = getContract(
            POOL.lpToken.addresses[43114],
            LPTOKEN_UNGUARDED_ABI,
            library,
            account ?? undefined,
          ) as LpTokenUnguarded

          const [totalLpTokenBalance] = await Promise.all([
            lpTokenContract.balanceOf(AXIAL_MASTERCHEF_CONTRACT_ADDRESS[43114]),
          ])
              
          const poolApr = masterchefPool.apr ?? 0

          let DEXLockedBN = BigNumber.from(0)

          if(masterchefPool.tokenPoolPrice > 0 && totalLpTokenBalance.gt("0x0")) {
            const totalLocked = masterchefPool.tokenPoolPrice * (+totalLpTokenBalance/1e18)
            DEXLockedBN = BigNumber.from(totalLocked.toFixed(0)).mul(BigNumber.from(10).pow(18))
          }

          let tokenPoolPriceBN = BigNumber.from(0)
          try{
            tokenPoolPriceBN = ethers.utils.parseUnits(masterchefPool.tokenPoolPrice.toFixed(2))
          }catch(error){
            console.log("Error converting Float to BN")
          }

          const poolData = {
            name: poolName,
            rapr: poolApr,
            tokens: [],
            reserve: BigNumber.from("0"),
            totalLocked: DEXLockedBN,
            virtualPrice: BigNumber.from("0"),
            adminFee: BigNumber.from("0"),
            swapFee: BigNumber.from("0"),
            aParameter: BigNumber.from("0"),
            volume: 0,
            utilization: null,
            apr: 0,
            lpTokenPriceUSD: tokenPoolPriceBN,
            lpToken: POOL.lpToken.symbol,
            isPaused: false,
          }

          const userMasterchefBalances = masterchefBalances[POOL.lpToken.symbol]
          if(!userMasterchefBalances){
            setPoolData([poolData, null])
            return
          } 

          const userLpTokenBalance = userMasterchefBalances.userInfo.amount
          
          const share = userLpTokenBalance?.mul(BigNumber.from(10).pow(18))
          .div(
            totalLpTokenBalance.isZero()
              ? BigNumber.from("1")
              : totalLpTokenBalance,
          )

          const usdBalance = DEXLockedBN.isZero() ? BigNumber.from("0") :
            DEXLockedBN.mul(share).div(BigNumber.from(10).pow(18))

          const userShareData = account
          ? {
              name: poolName,
              share: share,
              underlyingTokensAmount: userLpTokenBalance,
              usdBalance: usdBalance,
              tokens: [],
              lpTokenBalance: userLpTokenBalance,
              masterchefBalance: userMasterchefBalances,
            }
          : null

          setPoolData([poolData, userShareData])
          return
        } else {
          return
        }
      }
        
      const POOL = POOLS_MAP[poolName]
      const userMasterchefBalances = masterchefBalances
        ? masterchefBalances[POOL.lpToken.symbol]
        : null
      const effectivePoolTokens = POOL.underlyingPoolTokens || POOL.poolTokens
      const isMetaSwap = POOL.metaSwapAddresses != null
      let metaSwapContract = null as MetaSwap | null
      if (isMetaSwap) {
        metaSwapContract = getContract(
          POOL.metaSwapAddresses?.[chainId] as string,
          META_SWAP_ABI,
          library,
          account ?? undefined,
        ) as MetaSwap
      }
      const effectiveSwapContract = metaSwapContract || swapContract 
 
      // Swap fees, price, and LP Token data
      const [swapStorage, aParameter, isPaused] = await Promise.all([
        effectiveSwapContract.swapStorage(),
        effectiveSwapContract.getA(),
        effectiveSwapContract.paused(),
      ])
      
      let poolApr = 0
      if(masterchefApr){
        poolApr = masterchefApr[POOL.addresses[43114]].apr ?? 0
      }

      const { adminFee, lpToken: lpTokenAddress, swapFee } = swapStorage
      const lpTokenContract = getContract(
        lpTokenAddress,
        LPTOKEN_UNGUARDED_ABI,
        library,
        account ?? undefined,
      ) as LpTokenUnguarded
      const totalLpTokenBalance = await lpTokenContract.totalSupply()
    
      //      lpTokenContract.add(masterchef)
      const userLpTokenBalance = useMasterchef && userMasterchefBalances 
        ? userMasterchefBalances.userInfo.amount 
        : await lpTokenContract.balanceOf(account || AddressZero)

      const virtualPrice = totalLpTokenBalance.isZero()
        ? BigNumber.from(10).pow(18)
        : await effectiveSwapContract.getVirtualPrice()

      // Pool token data
      const tokenBalances: BigNumber[] = await Promise.all(
        effectivePoolTokens.map(async (token, i) => {
          const balance = await effectiveSwapContract.getTokenBalance(i)
          return BigNumber.from(10)
            .pow(18 - token.decimals) // cast all to 18 decimals
            .mul(balance)
        }),
      )
      const tokenBalancesSum: BigNumber = tokenBalances.reduce((sum, b) =>
        sum.add(b),
      )
      const tokenBalancesUSD = effectivePoolTokens.map((token, i, arr) => {
        // use another token to estimate USD price of meta LP tokens
        const symbol =
          isMetaSwap && i === arr.length - 1
            ? getTokenSymbolForPoolType(POOL.type)
            : token.symbol
        const balance = tokenBalances[i]
        return balance
          .mul(parseUnits(String(tokenPricesUSD[symbol] || 0), 18))
          .div(BigNumber.from(10).pow(18))
      })
      const tokenBalancesUSDSum: BigNumber = tokenBalancesUSD.reduce((sum, b) =>
        sum.add(b),
      )
      const lpTokenPriceUSD = tokenBalancesSum.isZero()
        ? Zero
        : tokenBalancesUSDSum
          .mul(BigNumber.from(10).pow(18))
          .div(tokenBalancesSum)

      function calculatePctOfTotalShare(lpTokenAmount: BigNumber): BigNumber {
        const baseCalc = useMasterchef && masterchefApr
          ? BigNumber.from(masterchefApr[POOL.addresses[43114]].totalStaked)
          : totalLpTokenBalance

        // returns the % of total lpTokens
        return lpTokenAmount
          .mul(BigNumber.from(10).pow(18))
          .div(
            baseCalc.isZero()
              ? BigNumber.from("1")
              : baseCalc,
          )
      }

      // lpToken balance in wallet as a % of total lpTokens, plus lpTokens staked elsewhere
      const userShare = calculatePctOfTotalShare(userLpTokenBalance)
      const userPoolTokenBalances = tokenBalances.map((balance) => {
        return userShare.mul(balance).div(BigNumber.from(10).pow(18))
      })
      const userPoolTokenBalancesSum: BigNumber = userPoolTokenBalances.reduce(
        (sum, b) => sum.add(b),
      )
      const userPoolTokenBalancesUSD = tokenBalancesUSD.map((balance) => {
        return userShare.mul(balance).div(BigNumber.from(10).pow(18))
      })
      const userPoolTokenBalancesUSDSum: BigNumber = userPoolTokenBalancesUSD.reduce(
        (sum, b) => sum.add(b),
      )

      const poolTokens = effectivePoolTokens.map((token, i) => ({
        symbol: token.symbol,
        percent: formatBNToPercentString(
          tokenBalances[i]
            .mul(10 ** 5)
            .div(
              totalLpTokenBalance.isZero()
                ? BigNumber.from("1")
                : tokenBalancesSum,
            ),
          5,
        ),
        value: tokenBalances[i],
      }))
      const userPoolTokens = effectivePoolTokens.map((token, i) => ({
        symbol: token.symbol,
        percent: formatBNToPercentString(
          tokenBalances[i]
            .mul(10 ** 5)
            .div(
              totalLpTokenBalance.isZero()
                ? BigNumber.from("1")
                : tokenBalancesSum,
            ),
          5,
        ),
        value: userPoolTokenBalances[i],
      }))
      const poolAddress = POOL.addresses[chainId]
      const { oneDayVolume, apr, utilization } =
        swapStats && poolAddress in swapStats
          ? swapStats[poolAddress]
          : { oneDayVolume: null, apr: null, utilization: null }
      const poolData = {
        name: poolName,
        rapr: poolApr,
        tokens: poolTokens,
        reserve: tokenBalancesUSDSum,
        totalLocked: totalLpTokenBalance,
        virtualPrice: virtualPrice,
        adminFee: adminFee,
        swapFee: swapFee,
        aParameter: aParameter,
        volume: oneDayVolume,
        utilization: utilization ? parseUnits(utilization, 18) : null,
        apr: apr,
        lpTokenPriceUSD,
        lpToken: POOL.lpToken.symbol,
        isPaused,
      }
      const userShareData = account
        ? {
            name: poolName,
            share: userShare,
            underlyingTokensAmount: userPoolTokenBalancesSum,
            usdBalance: userPoolTokenBalancesUSDSum,
            tokens: userPoolTokens,
            lpTokenBalance: userLpTokenBalance,
            masterchefBalance: userMasterchefBalances,
          }
        : null
      setPoolData([poolData, userShareData])
    }
    void getSwapData()
  }, [
    lastDepositTime,
    lastWithdrawTime,
    lastSwapTime,
    lastMigrateTime,
    poolName,
    swapContract,
    tokenPricesUSD,
    masterchefBalances,
    account,
    library,
    chainId,
    swapStats,
    masterchefApr,
    useMasterchef
  ])

  return poolData
}
