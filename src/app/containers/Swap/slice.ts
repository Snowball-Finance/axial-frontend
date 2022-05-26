import { PayloadAction } from "@reduxjs/toolkit";
import { ContainerState, FindBestPathPayload, GasPrices } from "./types";
import { createSlice } from "store/toolkit";
import { useInjectReducer, useInjectSaga } from "store/redux-injectors";
import { swapSaga } from "./saga";

// The initial state of the Swap container
export const initialState: ContainerState = {
  aggregatorAddress: "",
  aggregatorABI: undefined,
  isGettingBestPath: false,
  bestPath: undefined,
  isSwapping: false,
  tokens: {},
  selectedGasPrice: GasPrices.Standard,
  isTokenApproved: false,
  isApproving: false,
};

const swapSlice = createSlice({
  name: "swap",
  initialState,
  reducers: {
    setAggregatorConfigs(
      state,
      action: PayloadAction<{
        address: ContainerState["aggregatorAddress"];
        abi: ContainerState["aggregatorABI"];
        tokens: ContainerState["tokens"];
      }>
    ) {
      state.aggregatorAddress = action.payload.address;
      state.aggregatorABI = action.payload.abi;
      state.tokens = action.payload.tokens;
    },
    findBestPath(state, action: PayloadAction<FindBestPathPayload>) {},
    setIsGettingBestPath(state, action: PayloadAction<boolean>) {
      state.isGettingBestPath = action.payload;
    },
    setBestPath(state, action: PayloadAction<ContainerState["bestPath"]>) {
      state.bestPath = action.payload;
    },
    setIsSwapping(state, action: PayloadAction<boolean>) {
      state.isSwapping = action.payload;
    },
    setIsTokenApproved(state, action: PayloadAction<boolean>) {
      state.isTokenApproved = action.payload;
    },
    setIsApproving(state, action: PayloadAction<boolean>) {
      state.isApproving = action.payload;
    },
    swap() {},
    approve() {},
    tokenApprovalStatus() {},
  },
});

export const {
  actions: SwapActions,
  reducer: SwapReducer,
  name: sliceKey,
} = swapSlice;

export const useSwapSlice = () => {
  useInjectReducer({ key: sliceKey, reducer: SwapReducer });
  useInjectSaga({ key: sliceKey, saga: swapSaga });
  return { SwapActions };
};
