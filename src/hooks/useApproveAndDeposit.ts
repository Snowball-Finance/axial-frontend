import { POOLS_MAP, PoolName, TRANSACTION_TYPES, Token, AXIAL_MASTERCHEF_CONTRACT_ADDRESS } from "../constants"
import { formatDeadlineToNumber, getContract } from "../libs"
import {
  useAllContracts,
  useLPTokenContract,
  useSwapContract,
} from "./useContract"
import { useDispatch, useSelector } from "react-redux"

import { AppState } from "../store"
import { BigNumber } from "@ethersproject/bignumber"
import { Erc20 } from "../../types/ethers-contracts/Erc20"
import { GasPrices } from "../store/module/user"
import { IS_PRODUCTION } from "../libs/environment"
import META_SWAP_ABI from "../constants/abis/metaSwap.json"
import MASTERCHEF_ABI from "../constants/abis/masterchef.json"
import { MetaSwap } from "../../types/ethers-contracts/MetaSwap"
import { NumberInputState } from "../libs/numberInputState"
import checkAndApproveTokenForTrade from "../libs/checkAndApproveTokenForTrade"
import { parseUnits } from "@ethersproject/units"
import { subtractSlippage } from "../libs/slippage"
import { updateLastTransactionTimes } from "../store/application"
import { useActiveWeb3React } from "."
import { useMemo } from "react"
import { ethers } from "ethers"
import { SwapFlashLoanNoWithdrawFee } from "../../types/ethers-contracts/SwapFlashLoanNoWithdrawFee"

interface ApproveAndDepositStateArgument {
  [tokenSymbol: string]: NumberInputState
}

export function useApproveAndDeposit(
  poolName: PoolName,
): (
  state: ApproveAndDepositStateArgument,
  shouldDepositWrapped?: boolean,
  masterchefDeposit?: boolean
) => Promise<void> {
  const dispatch = useDispatch()
  const swapContract = useSwapContract(poolName)
  const lpTokenContract = useLPTokenContract(poolName)
  const tokenContracts = useAllContracts()
  const { account, chainId, library } = useActiveWeb3React()
  const { gasStandard, gasFast, gasInstant } = useSelector(
    (state: AppState) => state.application,
  )
  const {
    slippageCustom,
    slippageSelected,
    gasPriceSelected,
    gasCustom,
    transactionDeadlineCustom,
    transactionDeadlineSelected,
    infiniteApproval,
  } = useSelector((state: AppState) => state.user)
  const POOL = POOLS_MAP[poolName]
  const metaSwapContract = useMemo(() => {
    if (POOL.metaSwapAddresses && chainId && library) {
      return getContract(
        POOL.metaSwapAddresses?.[chainId],
        META_SWAP_ABI,
        library,
        account ?? undefined,
      ) as MetaSwap
    }
    return null
  }, [chainId, library, POOL.metaSwapAddresses, account])

  return async function approveAndDeposit(
    state: ApproveAndDepositStateArgument,
    shouldDepositWrapped = false,
    masterchefDeposit = false
  ): Promise<void> {
    try {
      if (!account) throw new Error("Wallet must be connected")
      const poolTokens = shouldDepositWrapped
        ? (POOL.underlyingPoolTokens as Token[])
        : masterchefDeposit
        ? [POOL.lpToken]
        : POOL.poolTokens
      const masterchefContract = new ethers.Contract(
        AXIAL_MASTERCHEF_CONTRACT_ADDRESS[43114],
        MASTERCHEF_ABI,
        library?.getSigner(),
      )
      
      const effectiveSwapContract = masterchefDeposit
        ? masterchefContract
        : swapContract

      let gasPriceUnsafe: string | number | undefined
      if (gasPriceSelected === GasPrices.Custom) {
        gasPriceUnsafe = gasCustom?.valueSafe
      } else if (gasPriceSelected === GasPrices.Fast) {
        gasPriceUnsafe = gasFast
      } else if (gasPriceSelected === GasPrices.Instant) {
        gasPriceUnsafe = gasInstant
      } else {
        gasPriceUnsafe = gasStandard
      }
      const gasPrice = parseUnits(String(gasPriceUnsafe) || "45", 9)
      const approveSingleToken = async (token: Token): Promise<void> => {
        const spendingValue = BigNumber.from(state[token.symbol].valueSafe)
        if (spendingValue.isZero()) return
        const tokenContract = tokenContracts?.[token.symbol] as Erc20
        if (tokenContract == null) return
        if(!effectiveSwapContract) return
        await checkAndApproveTokenForTrade(
          tokenContract,
          effectiveSwapContract.address,
          account,
          spendingValue,
          infiniteApproval,
          gasPrice,
          {
            onTransactionError: () => {
              throw new Error("Your transaction could not be completed")
            },
          },
        )
        return
      }
      // For each token being deposited, check the allowance and approve it if necessary
      if (!IS_PRODUCTION) {
        for (const token of poolTokens) {
          await approveSingleToken(token)
        }
      } else {
        await Promise.all(poolTokens.map((token) => approveSingleToken(token)))
      }

      if(!masterchefDeposit){
        if(!lpTokenContract) return
        const isFirstTransaction = (await lpTokenContract.totalSupply()).isZero()
        let minToMint: BigNumber
        if (isFirstTransaction) {
          minToMint = BigNumber.from("0")
        } else {
          minToMint = await (effectiveSwapContract as SwapFlashLoanNoWithdrawFee).calculateTokenAmount(
            poolTokens.map(({ symbol }) => state[symbol].valueSafe),
            true, // deposit boolean
          )
        }
  
        minToMint = subtractSlippage(minToMint, slippageSelected, slippageCustom)
        const deadline = formatDeadlineToNumber(
          transactionDeadlineSelected,
          transactionDeadlineCustom,
        )
  
        const txnAmounts = poolTokens.map(({ symbol }) => state[symbol].valueSafe)
        const txnDeadline = Math.round(
          new Date().getTime() / 1000 + 60 * deadline,
        )
        const swapFlashLoanContract = effectiveSwapContract

        const spendTransaction = await (swapFlashLoanContract as SwapFlashLoanNoWithdrawFee)?.addLiquidity(
          txnAmounts,
          minToMint,
          txnDeadline,
        )

      await spendTransaction.wait()
      dispatch(
        updateLastTransactionTimes({
          [TRANSACTION_TYPES.DEPOSIT]: Date.now(),
        }),
      )
      return Promise.resolve()
      } else {
        // eslint-disable-next-line @typescript-eslint/no-unsafe-call
        await masterchefContract.deposit(
          POOL.lpToken.masterchefId,
          BigNumber.from(state[POOL.lpToken.symbol].valueSafe),
        )
      }



    } catch (e) {
      console.error(e)
    }
  }
}
