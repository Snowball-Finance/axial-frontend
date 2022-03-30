import { PayloadAction } from "@reduxjs/toolkit";
import { createSlice } from "store/toolkit";
import { useInjectReducer, useInjectSaga } from "store/redux-injectors";

import { swapPageSaga } from "./saga";
import { ContainerState, TokenChangePayload } from "./types";
import { Token } from "app/containers/Swap/types";

export const initialState: ContainerState = {
  fromTokenError: "",
  fromToken: undefined,
  toToken: undefined,
  fromAmount: "",
  searchValue: "",
  isSwapModalOpen: false,
};

const swapPageSlice = createSlice({
  name: "swapPage",
  initialState,
  reducers: {
    setFromToken(state, action: PayloadAction<Token | undefined>) {
      state.fromToken = action.payload;
    },
    setToToken(state, action: PayloadAction<Token | undefined>) {
      state.toToken = action.payload;
    },
    setFromAmount(state, action: PayloadAction<string>) {
      state.fromAmount = action.payload;
    },
    setSearchValue(state, action: PayloadAction<string>) {
      state.searchValue = action.payload;
    },
    setFromTokenError(state, action: PayloadAction<string>) {
      state.fromTokenError = action.payload;
    },
    setSwapModalOpen(state, action: PayloadAction<boolean>) {
      state.isSwapModalOpen = action.payload;
    },
    amountChange(state, action: PayloadAction<string>) {},
    tokenChange(state, action: PayloadAction<TokenChangePayload>) {},
    maxAmountSelection() {},
    reverseTokenChange() {},
    confirmSwap() {},
  },
});

export const {
  actions: SwapPageActions,
  reducer: SwapPageReducer,
  name: sliceKey,
} = swapPageSlice;

export const useSwapPageSlice = () => {
  useInjectReducer({ key: sliceKey, reducer: SwapPageReducer });
  useInjectSaga({ key: sliceKey, saga: swapPageSaga });
  return { SwapPageActions };
};
