

import FarmDepositPage from './farmDepositPage'

import {
  DepositTransaction,
  TransactionItem,
} from "../../interfaces/transactions"
import { POOLS_MAP, PoolName, Token } from "../../constants"
import React, { ReactElement, useEffect, useMemo, useState } from "react"
import {
  TokensStateType,
  useTokenFormState,
} from "../../hooks/useTokenFormState"
import { formatBNToString, shiftBNDecimals } from "../../libs"
import usePoolData, { PoolDataType } from "../../hooks/usePoolData"

import { AppState } from "../../store"
import { BigNumber } from "@ethersproject/bignumber"
import { TokenPricesUSD } from "../../store/application"
import { Zero } from "@ethersproject/constants"
import { calculateGasEstimate } from "../../libs/gasEstimate"
import { calculatePriceImpact } from "../../libs/priceImpact"
import { formatGasToString } from "../../libs/gas"
import { parseUnits } from "@ethersproject/units"
import { useActiveWeb3React } from "../../hooks"
import { useApproveAndDeposit } from "../../hooks/useApproveAndDeposit"
import { usePoolTokenBalances } from "../../store/wallet/hooks"
import { useSelector } from "react-redux"
import { useSwapContract } from "../../hooks/useContract"
import { symbolName } from 'typescript'

interface Props {
  poolName: PoolName
}

function FarmDeposit({ poolName = 'A4D Stablecoins' }: Props): ReactElement | null {
  const POOL = POOLS_MAP[poolName]
  const { account } = useActiveWeb3React()
  const approveAndDeposit = useApproveAndDeposit(poolName)
  const [poolData, userShareData] = usePoolData(poolName)
  const swapContract = useSwapContract(poolName)
  const allTokens = useMemo(() => {
    const arr = Array.from(
      new Set(
        POOL.poolTokens
          .concat(POOL.underlyingPoolTokens || [])
          ,
      ),
    )
    arr.push(POOL.lpToken)
    return arr
  }, [POOL.poolTokens, POOL.underlyingPoolTokens, POOL.lpToken])
  const [tokenFormState, updateTokenFormState] = useTokenFormState(allTokens)
  const [shouldDepositWrapped, setShouldDepositWrapped] = useState(false)
  useEffect(() => {
    // empty out previous token state when switchng between wrapped and unwrapped
    if (shouldDepositWrapped) {
      updateTokenFormState(
        [POOL.lpToken].reduce(
          (acc, { symbol }) => ({
            ...acc,
            [symbol]: "",
          }),
          {},
        ),
      )
    } else {
      updateTokenFormState(
        (POOL.underlyingPoolTokens || []).reduce(
          (acc, { symbol }) => ({
            ...acc,
            [symbol]: "",
          }),
          {},
        ),
      )
    }
  }, [
    shouldDepositWrapped,
    updateTokenFormState,
    POOL.poolTokens,
    POOL.underlyingPoolTokens,
    POOL.lpToken
  ])
  const tokenBalances = usePoolTokenBalances()
  const { tokenPricesUSD, gasStandard, gasFast, gasInstant } = useSelector(
    (state: AppState) => state.application,
  )

  // Merge underlying token usd prices and tokenPricesUSD array
  const [underlyingPoolData] = usePoolData(POOL.underlyingPool)
  let newTokenPricesUSD
  if (underlyingPoolData.lpTokenPriceUSD != Zero) {
    const underlyingTokenUSDValue = parseFloat(
      formatBNToString(poolData.lpTokenPriceUSD, 18, 2),
    )
    newTokenPricesUSD = {
      ...tokenPricesUSD,
      ...{
        [underlyingPoolData.lpToken]: underlyingTokenUSDValue,
      },
    }
  }

  const { gasPriceSelected, gasCustom } = useSelector(
    (state: AppState) => state.user,
  )
  const gasPrice = BigNumber.from(
    formatGasToString(
      { gasStandard, gasFast, gasInstant },
      gasPriceSelected,
      gasCustom,
    ),
  )
  const [estDepositLPTokenAmount, setEstDepositLPTokenAmount] = useState(Zero)
  const [priceImpact, setPriceImpact] = useState(Zero)

  useEffect(() => {
    // evaluate if a new deposit will exceed the pool's per-user limit
    async function calculateMaxDeposits(): Promise<void> {
      if (
        swapContract == null ||
        userShareData == null ||
        poolData == null ||
        account == null
      ) {
        setEstDepositLPTokenAmount(Zero)
        return
      }
      const tokenInputSum = parseUnits(
        allTokens
          .reduce(
            (sum, { symbol }) => sum + (+tokenFormState[symbol].valueRaw || 0),
            0,
          )
          .toFixed(18),
        18,
      )
      let depositLPTokenAmount
      if (poolData.totalLocked.gt(0) && tokenInputSum.gt(0)) {
        depositLPTokenAmount = await swapContract.calculateTokenAmount(
          POOL.poolTokens.map(({ symbol }) => tokenFormState[symbol].valueSafe),
          true, // deposit boolean
        )
      } else {
        // when pool is empty, estimate the lptokens by just summing the input instead of calling contract
        depositLPTokenAmount = tokenInputSum
      }
      setEstDepositLPTokenAmount(depositLPTokenAmount)

      setPriceImpact(
        calculatePriceImpact(
          tokenInputSum,
          depositLPTokenAmount,
          poolData.virtualPrice,
        ),
      )
    }
    void calculateMaxDeposits()
  }, [
    poolData,
    tokenFormState,
    swapContract,
    userShareData,
    account,
    POOL.poolTokens,
    POOL.underlyingPoolTokens,
    shouldDepositWrapped,
    allTokens,
  ])

  // A represention of tokens used for UI
  const tokens = [
    {
      symbol: POOL.lpToken.symbol,
      name: POOL.lpToken.name,
      icon: POOL.lpToken.icon,
      max: formatBNToString(
        tokenBalances?.[POOL.lpToken.symbol] || Zero,
        POOL.lpToken.decimals,
      ),
      inputValue: tokenFormState[POOL.lpToken.symbol].valueRaw,
    },
  ]

  const exceedsWallet = allTokens.some(({ symbol }) => {
    const exceedsBoolean = (tokenBalances?.[symbol] || Zero).lt(
      BigNumber.from(tokenFormState[symbol].valueSafe),
    )
    return exceedsBoolean
  })

  async function onConfirmTransaction(): Promise<void> {
    await approveAndDeposit(tokenFormState, shouldDepositWrapped, true)
    // Clear input after deposit
    updateTokenFormState(
      allTokens.reduce(
        (acc, t) => ({
          ...acc,
          [t.symbol]: "",
        }),
        {},
      ),
    )
  }
  function updateTokenFormValue(symbol: string, value: string): void {
    updateTokenFormState({ [symbol]: value })
  }
  const depositTransaction = buildTransactionData(
    tokenFormState,
    poolData,
    [POOL.lpToken],
    POOL.lpToken,
    priceImpact,
    estDepositLPTokenAmount,
    gasPrice,
    newTokenPricesUSD,
  )

  return (
    <FarmDepositPage
      onConfirmTransaction={onConfirmTransaction}
      onChangeTokenInputValue={updateTokenFormValue}
      onToggleDepositWrapped={() =>
        setShouldDepositWrapped((prevState) => !prevState)
      }
      shouldDepositWrapped={shouldDepositWrapped}
      title={poolName}
      tokens={tokens}
      exceedsWallet={exceedsWallet}
      poolData={poolData}
      myShareData={userShareData}
      transactionData={depositTransaction}
    />
  )
}


function buildTransactionData(
  tokenFormState: TokensStateType,
  poolData: PoolDataType | null,
  poolTokens: Token[],
  poolLpToken: Token,
  priceImpact: BigNumber,
  estDepositLPTokenAmount: BigNumber,
  gasPrice: BigNumber,
  tokenPricesUSD?: TokenPricesUSD,
): DepositTransaction {
  const from = {
    items: [] as TransactionItem[],
    totalAmount: Zero,
    totalValueUSD: Zero,
  }
  const TOTAL_AMOUNT_DECIMALS = 18
  poolTokens.forEach((token) => {
    const { symbol, decimals } = token
    const amount = BigNumber.from(tokenFormState[symbol].valueSafe)
    const usdPriceBN = parseUnits(
      (tokenPricesUSD?.[symbol] || 0).toFixed(2),
      18,
    )
    if (amount.lte("0")) return
    const item = {
      token,
      amount,
      singleTokenPriceUSD: usdPriceBN,
      valueUSD: amount.mul(usdPriceBN).div(BigNumber.from(10).pow(decimals)),
    }
    from.items.push(item)
    from.totalAmount = from.totalAmount.add(
      shiftBNDecimals(amount, TOTAL_AMOUNT_DECIMALS - decimals),
    )
    from.totalValueUSD = from.totalValueUSD.add(usdPriceBN)
  })

  const lpTokenPriceUSD = poolData?.lpTokenPriceUSD || Zero
  const toTotalValueUSD = estDepositLPTokenAmount
    .mul(lpTokenPriceUSD)
    ?.div(BigNumber.from(10).pow(poolLpToken.decimals))
  const to = {
    item: {
      token: poolLpToken,
      amount: estDepositLPTokenAmount,
      singleTokenPriceUSD: lpTokenPriceUSD,
      valueUSD: toTotalValueUSD,
    },
    totalAmount: estDepositLPTokenAmount,
    totalValueUSD: toTotalValueUSD,
  }
  const shareOfPool = poolData?.totalLocked.gt(0)
    ? estDepositLPTokenAmount
      .mul(BigNumber.from(10).pow(18))
      .div(estDepositLPTokenAmount.add(poolData?.totalLocked))
    : BigNumber.from(10).pow(18)
  const gasAmount = calculateGasEstimate("addLiquidity").mul(gasPrice) // units of gas * GWEI/Unit of gas

  const txnGasCost = {
    amount: gasAmount,
    valueUSD: tokenPricesUSD?.ETH
      ? parseUnits(tokenPricesUSD.ETH.toFixed(2), 18) // USD / ETH  * 10^18
        .mul(gasAmount) // GWEI
        .div(BigNumber.from(10).pow(25)) // USD / ETH * GWEI * ETH / GWEI = USD
      : null,
  }

  return {
    from,
    to,
    priceImpact,
    shareOfPool,
    txnGasCost,
  }
}


export default FarmDeposit
