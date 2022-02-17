import { TRANSACTION_TYPES } from "../constants";
import { AppState } from "../store";
import { BigNumber } from "@ethersproject/bignumber";
import { Bridge } from "../../types/ethers-contracts/Bridge";
import { Erc20 } from "../../types/ethers-contracts/Erc20";
import { GasPrices } from "../store/module/user";
import checkAndApproveTokenForTrade from "../libs/checkAndApproveTokenForTrade";
import { parseUnits } from "@ethersproject/units";
import { AggregatorSwapParams, updateLastTransactionTimes } from "../store/application";
import { useActiveWeb3React } from ".";
import { useAllContracts } from "./useContract";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { AxialAggregator } from "../../types/ethers-contracts/AxialAggregator";

type Contracts = {
  aggregatorContract: AxialAggregator | null;
  bridgeContract: Bridge | null;
};

type SwapSide = {
  amount: BigNumber;
  symbol: string;
  poolName: string;
  tokenIndex: number;
};

type FormState = {
  from: SwapSide;
  to: SwapSide & { amountMediumSynth: BigNumber };
};

type ApproveAndSwapStateArgument = FormState & Contracts;

export function useApproveAndSwap(): (state: ApproveAndSwapStateArgument, swapParams: AggregatorSwapParams | null) => Promise<void> {
  const dispatch = useDispatch();
  const tokenContracts = useAllContracts();
  const { account, chainId } = useActiveWeb3React();
  const { gasStandard, gasFast, gasInstant } = useSelector((state: AppState) => state.application);
  const { gasPriceSelected, gasCustom, infiniteApproval } = useSelector((state: AppState) => state.user);

  return async function approveAndSwap(state: ApproveAndSwapStateArgument, swapParams: AggregatorSwapParams | null): Promise<void> {
    try {
      if (!account) throw new Error("Wallet must be connected");
      if (!swapParams) throw new Error("Swap params must be provided");
      if (!state.aggregatorContract) throw new Error("Aggregator contract not found");
      if (chainId === undefined) throw new Error("Unknown chain");

      // Set gas price if selected or use standard
      let gasPrice;
      if (gasPriceSelected === GasPrices.Custom) {
        gasPrice = gasCustom?.valueSafe;
      } else if (gasPriceSelected === GasPrices.Fast) {
        gasPrice = gasFast;
      } else if (gasPriceSelected === GasPrices.Instant) {
        gasPrice = gasInstant;
      } else {
        gasPrice = gasStandard;
      }

      // Format selected gas price amount
      gasPrice = parseUnits(String(gasPrice) || "45", 9);

      const tokenContract = tokenContracts?.[state.from.symbol] as Erc20;
      if (tokenContract == null) return;

      // Approve aggregator to spend token
      await checkAndApproveTokenForTrade(tokenContract, state.aggregatorContract.address, account, state.from.amount, infiniteApproval, gasPrice, {
        onTransactionError: () => {
          throw new Error("Your transaction could not be completed");
        }
      });

      // Send swap transaction
      const swapTransaction = await state.aggregatorContract.swap(swapParams.bestPath, swapParams.to, swapParams.fee, swapParams.useInternalRouter);
      await swapTransaction?.wait();

      dispatch(
        updateLastTransactionTimes({
          [TRANSACTION_TYPES.SWAP]: Date.now()
        })
      );

      return Promise.resolve();
    } catch (e) {
      console.error(e);
    }
  };
}
