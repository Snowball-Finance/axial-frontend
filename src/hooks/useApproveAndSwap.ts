import { SWAP_ROUTER_FEE, TRANSACTION_TYPES } from "../constants"
import { AppState } from "../store"
import { BigNumber } from "@ethersproject/bignumber"
import { Bridge } from "../../types/ethers-contracts/Bridge"
import { Erc20 } from "../../types/ethers-contracts/Erc20"
import { GasPrices } from "../store/module/user"
import checkAndApproveTokenForTrade from "../libs/checkAndApproveTokenForTrade"
import { parseUnits } from "@ethersproject/units"
import { BestPath, updateLastTransactionTimes } from "../store/application"
import { useActiveWeb3React } from "."
import { useAllContracts } from "./useContract"
import { useDispatch } from "react-redux"
import { useSelector } from "react-redux"
import { SwapRouter } from "../../types/ethers-contracts/SwapRouter"



type Contracts = {
  routerContract:
  | SwapRouter
  | null,
  bridgeContract: Bridge | null
}
type SwapSide = {
  amount: BigNumber
  symbol: string
  poolName: string
  tokenIndex: number
}
type FormState = {
  from: SwapSide
  to: SwapSide & { amountMediumSynth: BigNumber }
}
type ApproveAndSwapStateArgument = FormState & Contracts

export function useApproveAndSwap(): (
  state: ApproveAndSwapStateArgument,
  bestPath: BestPath | null
) => Promise<void> {
  const dispatch = useDispatch()
  const tokenContracts = useAllContracts()
  const { account, chainId } = useActiveWeb3React()
  const { gasStandard, gasFast, gasInstant } = useSelector(
    (state: AppState) => state.application,
  )
  const {
    gasPriceSelected,
    gasCustom,
    infiniteApproval,
  } = useSelector((state: AppState) => state.user)
  return async function approveAndSwap(
    state: ApproveAndSwapStateArgument,
    bestPath: BestPath | null
  ): Promise<void> {
    try {

      if (!account) throw new Error("Wallet must be connected")
      if (chainId === undefined) throw new Error("Unknown chain")
      // For each token being deposited, check the allowance and approve it if necessary
      const tokenContract = tokenContracts?.[state.from.symbol] as Erc20
      let gasPrice
      if (gasPriceSelected === GasPrices.Custom) {
        gasPrice = gasCustom?.valueSafe
      } else if (gasPriceSelected === GasPrices.Fast) {
        gasPrice = gasFast
      } else if (gasPriceSelected === GasPrices.Instant) {
        gasPrice = gasInstant
      } else {
        gasPrice = gasStandard
      }
      gasPrice = parseUnits(String(gasPrice) || "45", 9)
      if (tokenContract == null) return
      let addressToApprove = ""
      addressToApprove = state.routerContract?.address as string
      await checkAndApproveTokenForTrade(
        tokenContract,
        addressToApprove,
        account,
        state.from.amount,
        infiniteApproval,
        gasPrice,
        {
          onTransactionError: () => {
            throw new Error("Your transaction could not be completed")
          },
        },
      )
      if (bestPath) {
        const { adapters, amountIn, amountOut, path } = bestPath
        const swapTransaction = await (state.routerContract as NonNullable<
          typeof state.routerContract // we already check for nonnull above
        >).swapNoSplit({ amountIn, amountOut, path, adapters }, account,SWAP_ROUTER_FEE)
        await swapTransaction?.wait()
        dispatch(
          updateLastTransactionTimes({
            [TRANSACTION_TYPES.SWAP]: Date.now(),
          }),
        )
      }
      return Promise.resolve()
    } catch (e) {
      console.error(e)
    }
  }
}
