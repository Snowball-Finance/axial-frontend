import { PayloadAction } from "@reduxjs/toolkit";
import { TokenSymbols } from "app/containers/Swap/types";
import { GenericGasResponse } from "app/providers/gasPrice";
import { createSlice } from "store/toolkit";
import { useInjectReducer, useInjectSaga } from "./redux-injectors";
import { globalSaga } from "./saga";
export interface GlobalState {
  isGettingTokenPrices: boolean;
  tokenPricesUSD: { [K in TokenSymbols]?: number };
  gasPrice:GenericGasResponse|undefined;
}
// The initial state of the LoginPage container
export const initialState: GlobalState = {
  isGettingTokenPrices: false,
  tokenPricesUSD: {},
  gasPrice:undefined,
};

const globalSlice = createSlice({
  name: "global",
  initialState,
  reducers: {
    getTokenPricesUSD(state, action: PayloadAction<void>) {},
    setTokenPricesUSD(
      state,
      action: PayloadAction<GlobalState["tokenPricesUSD"]>
    ) {
      state.tokenPricesUSD = action.payload;
    },
    setIsGettingTokenPrices(state, action: PayloadAction<boolean>) {
      state.isGettingTokenPrices = action.payload;
    },
    getGasPrice(state, action: PayloadAction<void>) {},
    setGasPrice(state, action: PayloadAction<GlobalState["gasPrice"]>) {
      state.gasPrice = action.payload;
    }
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
