import { PayloadAction } from "@reduxjs/toolkit";
import { ContainerState } from "./types";
import { createSlice } from "store/toolkit";
import { useInjectReducer, useInjectSaga } from "store/redux-injectors";

import { swapPageSaga } from "./saga";
import { Token } from "app/containers/Swap/types";

// The initial state of the SwapPage2 container
export const initialState: ContainerState = {
  selectedFromToken: undefined,
  selectedToToken: undefined,
  fromAmount: "0",
  toAmount: "0",
};

const swapPageSlice = createSlice({
  name: "swapPage",
  initialState,
  reducers: {
    setSelectedFromToken(state, action: PayloadAction<Token>) {
      state.selectedFromToken = action.payload;
    },
    setSelectedToToken(state, action: PayloadAction<Token>) {
      state.selectedToToken = action.payload;
    },
    setEnteredFromAmount(state, action: PayloadAction<string>) {
      state.fromAmount = action.payload;
    },
    setEnteredToAmount(state, action: PayloadAction<string>) {
      state.toAmount = action.payload;
    },
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
