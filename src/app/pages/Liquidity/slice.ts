import { ContainerState } from "./types";
import { createSlice } from "store/toolkit";
import { useInjectReducer, useInjectSaga } from "store/redux-injectors";

import { liquidityPageSaga } from "./saga";

// The initial state of the LiquidityPage container
export const initialState: ContainerState = {
  pools: undefined,
  pool: undefined,
  poolTokens: undefined,
  poolData: undefined,
  userShareData: undefined,
};

const liquidityPageSlice = createSlice({
  name: "liquidityPage",
  initialState,
  reducers: {},
});

export const {
  actions: LiquidityPageActions,
  reducer: LiquidityPageReducer,
  name: sliceKey,
} = liquidityPageSlice;

export const useLiquidityPageSlice = () => {
  useInjectReducer({ key: sliceKey, reducer: LiquidityPageReducer });
  useInjectSaga({ key: sliceKey, saga: liquidityPageSaga });
  return { LiquidityPageActions };
};
