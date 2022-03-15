import { PayloadAction } from "@reduxjs/toolkit";
import {
  ContainerState,
  FindBestPathPayload,
  GasPrices,
  Slippages,
} from "./types";
import { createSlice } from "store/toolkit";
import { useInjectReducer, useInjectSaga } from "store/redux-injectors";
import { swapSaga } from "./saga";
import { LocalStorageKeys, storage } from "store/storage";

// The initial state of the Swap container
export const initialState: ContainerState = {
  swapRouterAddress: "",
  swapRouterABI: undefined,
  isGettingBestPath: false,
  bestPath: undefined,
  isSwapping: false,
  tokens: {},
  infiniteApproval:
    storage.read(LocalStorageKeys.INFINITE_APPROVAL_FOR_SWAP) || false,
  slippageSelected: Slippages.OneTenth,
  selectedGasPrice: GasPrices.Standard,
};

const swapSlice = createSlice({
  name: "swap",
  initialState,
  reducers: {
    setSwapRouterConfigs(
      state,
      action: PayloadAction<{
        address: ContainerState["swapRouterAddress"];
        abi: ContainerState["swapRouterABI"];
        tokens: ContainerState["tokens"];
      }>
    ) {
      state.swapRouterAddress = action.payload.address;
      state.swapRouterABI = action.payload.abi;
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
    setInfiniteApproval(state, action: PayloadAction<boolean>) {
      state.infiniteApproval = action.payload;
      storage.write(
        LocalStorageKeys.INFINITE_APPROVAL_FOR_SWAP,
        action.payload
      );
    },
    setSlippageSelected(state, action: PayloadAction<Slippages>) {
      state.slippageSelected = action.payload;
    },
    swap() {},
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
