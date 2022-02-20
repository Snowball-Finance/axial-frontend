import { PayloadAction } from "@reduxjs/toolkit";
import { TokenSymbols } from "app/containers/Swap/types";
import { createSlice } from "store/toolkit";
import { useInjectReducer, useInjectSaga } from "./redux-injectors";
import { globalSaga } from "./saga";
interface ContainerState {
  isGettingTokenPrices: boolean;
  tokenPricesUSD: { [K in TokenSymbols]?: number };
}
// The initial state of the LoginPage container
export const initialState: ContainerState = {
  isGettingTokenPrices: false,
  tokenPricesUSD: {},
};

const globalSlice = createSlice({
  name: "global",
  initialState,
  reducers: {
    getTokenPricesUSD(state, action: PayloadAction<void>) {},
    setTokenPricesUSD(
      state,
      action: PayloadAction<ContainerState["tokenPricesUSD"]>
    ) {
      state.tokenPricesUSD = action.payload;
    },
    setIsGettingTokenPrices(state, action: PayloadAction<boolean>) {
      state.isGettingTokenPrices = action.payload;
    },
  },
});

export const {
  actions: GlobalActions,
  reducer: globalReducer,
  name: sliceKey,
} = globalSlice;
export const useGlobalSlice = () => {
  useInjectReducer({ key: sliceKey, reducer: globalReducer });
  useInjectSaga({ key: sliceKey, saga: globalSaga });
  return { GlobalActions };
};
