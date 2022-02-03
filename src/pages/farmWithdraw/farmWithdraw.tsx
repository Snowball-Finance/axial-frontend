import { POOLS_MAP, PoolName } from "../../constants"
import React, { ReactElement, useEffect, useState } from "react"
import { ReviewWithdrawData } from "../../components/withdraw/WithdrawPage"
import { commify, formatUnits, parseUnits } from "@ethersproject/units"

import { AppState } from "../../store"
import { BigNumber } from "@ethersproject/bignumber"
import { Zero } from "@ethersproject/constants"
import { calculateGasEstimate } from "../../libs/gasEstimate"
import { calculatePriceImpact } from "../../libs/priceImpact"
import { formatGasToString } from "../../libs/gas"
import { formatSlippageToString } from "../../libs/slippage"
import { useActiveWeb3React } from "../../hooks"
import { useApproveAndWithdraw } from "../../hooks/useApproveAndWithdraw"
import usePoolData from "../../hooks/usePoolData"
import { useSelector } from "react-redux"
import { useSwapContract } from "../../hooks/useContract"
import useWithdrawFormState from "../../hooks/useFarmWithdrawFormState"
import FarmWithdrawPage from "../../components/farmWithdrawPage/FarmWithdrawPage"

interface Props {
  poolName: PoolName
}
function FarmWithdraw({ poolName }: Props): ReactElement {
  const [poolData, userShareData] = usePoolData(poolName, true)
  const [withdrawFormState, updateWithdrawFormState] =
    useWithdrawFormState(poolName)
  const { slippageCustom, slippageSelected, gasPriceSelected, gasCustom } =
    useSelector((state: AppState) => state.user)
  const { tokenPricesUSD, gasStandard, gasFast, gasInstant } = useSelector(
    (state: AppState) => state.application,
  )
  const { approveAndWithdraw, transactionStatus } = useApproveAndWithdraw(
    poolName,
    true,
  )
  const swapContract = useSwapContract(poolName)
  const { account } = useActiveWeb3React()
  const POOL = POOLS_MAP[poolName]

  const [estWithdrawBonus, setEstWithdrawBonus] = useState(Zero)
  useEffect(() => {
    // evaluate if a new withdraw will exceed the pool's per-user limit
    function calculateWithdrawBonus(): void {
      if (
        swapContract == null ||
        userShareData == null ||
        poolData == null ||
        account == null
      ) {
        return
      }
      const tokenInputSum =
        userShareData.masterchefBalance?.userInfo.amount ?? BigNumber.from("0")

      const withdrawLPTokenAmount = tokenInputSum
      setEstWithdrawBonus(
        calculatePriceImpact(
          withdrawLPTokenAmount,
          tokenInputSum,
          poolData.virtualPrice,
          true,
        ),
      )
    }
    void calculateWithdrawBonus()
  }, [
    poolData,
    withdrawFormState,
    swapContract,
    userShareData,
    account,
    POOL.lpToken,
  ])
  async function onConfirmTransaction(): Promise<void> {
    const { withdrawType, tokenInputs, lpTokenAmountToSpend } =
      withdrawFormState
    await approveAndWithdraw({
      tokenFormState: tokenInputs,
      withdrawType,
      lpTokenAmountToSpend,
    })
    updateWithdrawFormState({ fieldName: "reset", value: "reset" })
  }

  const tokensData = React.useMemo(() => {
    return [
      {
        name: POOL.lpToken.name,
        symbol: POOL.lpToken.symbol,
        icon: POOL.lpToken.icon,
        inputValue: withdrawFormState.tokenInputs[POOL.lpToken.symbol].valueRaw,
      },
    ]
  }, [withdrawFormState, POOL.lpToken])
  const gasPrice = BigNumber.from(
    formatGasToString(
      { gasStandard, gasFast, gasInstant },
      gasPriceSelected,
      gasCustom,
    ),
  )
  const gasAmount = calculateGasEstimate("removeLiquidityImbalance").mul(
    gasPrice,
  ) // units of gas * GWEI/Unit of gas

  const txnGasCost = {
    amount: gasAmount,
    valueUSD: tokenPricesUSD?.ETH
      ? parseUnits(tokenPricesUSD.ETH.toFixed(2), 18) // USD / ETH  * 10^18
          .mul(gasAmount) // GWEI
          .div(BigNumber.from(10).pow(25)) // USD / ETH * GWEI * ETH / GWEI = USD
      : null,
  }

  const reviewWithdrawData: ReviewWithdrawData = {
    withdraw: [],
    rates: [],
    slippage: formatSlippageToString(slippageSelected, slippageCustom),
    priceImpact: estWithdrawBonus,
    txnGasCost: txnGasCost,
  }
  if (
    BigNumber.from(
      withdrawFormState.tokenInputs[POOL.lpToken.symbol].valueSafe,
    ).gt(0)
  ) {
    reviewWithdrawData.withdraw.push({
      name: POOL.lpToken.name,
      value: commify(
        formatUnits(
          withdrawFormState.tokenInputs[POOL.lpToken.symbol].valueSafe,
          POOL.lpToken.decimals,
        ),
      ),
      icon: POOL.lpToken.icon,
    })
    if (tokenPricesUSD != null) {
      reviewWithdrawData.rates.push({
        name: POOL.lpToken.name,
        value: formatUnits(
          withdrawFormState.tokenInputs[POOL.lpToken.symbol].valueSafe,
          POOL.lpToken.decimals,
        ),
        rate: "0",
      })
    }
  }
  return (
    <FarmWithdrawPage
      title={poolName}
      reviewData={reviewWithdrawData}
      tokensData={tokensData}
      poolData={poolData}
      myShareData={userShareData}
      formStateData={withdrawFormState}
      onConfirmTransaction={onConfirmTransaction}
      onFormChange={updateWithdrawFormState}
      transactionStatus={transactionStatus}
    />
  )
}

export default FarmWithdraw
