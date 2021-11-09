import {
  POOLS_MAP,
  PoolName,
  TRANSACTION_TYPES,
  AXIAL_MASTERCHEF_CONTRACT_ADDRESS,
} from "../constants"
import { addSlippage, subtractSlippage } from "../libs/slippage"
import { formatUnits, parseUnits } from "@ethersproject/units"
import { useLPTokenContract, useSwapContract } from "./useContract"
import { AppState } from "../store"
import { BigNumber } from "@ethersproject/bignumber"
import { GasPrices } from "../store/module/user"
import MASTERCHEF_ABI from "../constants/abis/masterchef.json"
import { NumberInputState } from "../libs/numberInputState"
import checkAndApproveTokenForTrade from "../libs/checkAndApproveTokenForTrade"
import { formatDeadlineToNumber } from "../libs"
import { updateLastTransactionTimes } from "../store/application"
import { useActiveWeb3React } from "."
import { useDispatch } from "react-redux"
import { useSelector } from "react-redux"
import { ethers } from "ethers"

interface ApproveAndWithdrawStateArgument {
  tokenFormState: { [symbol: string]: NumberInputState }
  withdrawType: string
  lpTokenAmountToSpend: BigNumber
}

export function useApproveAndWithdraw(
  poolName: PoolName,
  mastechefWithdraw = false,
): (state: ApproveAndWithdrawStateArgument) => Promise<void> {
  const dispatch = useDispatch()
  const swapContract = useSwapContract(poolName)
  const { account, library } = useActiveWeb3React()
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
  const lpTokenContract = useLPTokenContract(poolName)
  const POOL = POOLS_MAP[poolName]

  return async function approveAndWithdraw(
    state: ApproveAndWithdrawStateArgument,
  ): Promise<void> {
    try {
      if (!account) throw new Error("Wallet must be connected")
      const masterchefContract = new ethers.Contract(
        AXIAL_MASTERCHEF_CONTRACT_ADDRESS[43114],
        MASTERCHEF_ABI,
        library?.getSigner(),
      )

      if (state.lpTokenAmountToSpend.isZero()) return
      if (lpTokenContract == null) return
      let gasPrice
      if (gasPriceSelected === GasPrices.Custom && gasCustom?.valueSafe) {
        gasPrice = gasCustom.valueSafe
      } else if (gasPriceSelected === GasPrices.Standard) {
        gasPrice = gasStandard
      } else if (gasPriceSelected === GasPrices.Instant) {
        gasPrice = gasInstant
      } else {
        gasPrice = gasFast
      }
      gasPrice = parseUnits(gasPrice?.toString() || "45", "gwei")
      if (!mastechefWithdraw) {
        const allowanceAmount =
          state.withdrawType === "IMBALANCE"
            ? addSlippage(
                state.lpTokenAmountToSpend,
                slippageSelected,
                slippageCustom,
              )
            : state.lpTokenAmountToSpend
        if (!swapContract) return
        await checkAndApproveTokenForTrade(
          lpTokenContract,
          swapContract.address,
          account,
          allowanceAmount,
          infiniteApproval,
          gasPrice,
          {
            onTransactionError: () => {
              throw new Error("Your transaction could not be completed")
            },
          },
        )

        console.debug(
          `lpTokenAmountToSpend: ${formatUnits(
            state.lpTokenAmountToSpend,
            18,
          )}`,
        )
        const deadline = Math.round(
          new Date().getTime() / 1000 +
            60 *
              formatDeadlineToNumber(
                transactionDeadlineSelected,
                transactionDeadlineCustom,
              ),
        )
        let spendTransaction
        if (state.withdrawType === "ALL") {
          spendTransaction = await swapContract.removeLiquidity(
            state.lpTokenAmountToSpend,
            POOL.poolTokens.map(({ symbol }) =>
              subtractSlippage(
                BigNumber.from(state.tokenFormState[symbol].valueSafe),
                slippageSelected,
                slippageCustom,
              ),
            ),
            deadline,
          )
        } else if (state.withdrawType === "IMBALANCE") {
          spendTransaction = await swapContract.removeLiquidityImbalance(
            POOL.poolTokens.map(
              ({ symbol }) => state.tokenFormState[symbol].valueSafe,
            ),
            addSlippage(
              state.lpTokenAmountToSpend,
              slippageSelected,
              slippageCustom,
            ),
            deadline,
          )
        } else {
          // state.withdrawType === [TokenSymbol]
          spendTransaction = await swapContract.removeLiquidityOneToken(
            state.lpTokenAmountToSpend,
            POOL.poolTokens.findIndex(
              ({ symbol }) => symbol === state.withdrawType,
            ),
            subtractSlippage(
              BigNumber.from(
                state.tokenFormState[state.withdrawType || ""].valueSafe,
              ),
              slippageSelected,
              slippageCustom,
            ),
            deadline,
          )
        }

        await spendTransaction.wait()
      } else {
        // eslint-disable-next-line @typescript-eslint/no-unsafe-call
        await masterchefContract.withdraw(
          POOL.lpToken.masterchefId,
          BigNumber.from(state.tokenFormState[POOL.lpToken.symbol].valueSafe),
        )
      }
      dispatch(
        updateLastTransactionTimes({
          [TRANSACTION_TYPES.WITHDRAW]: Date.now(),
        }),
      )
    } catch (e) {
      console.error(e)
    }
  }
}
