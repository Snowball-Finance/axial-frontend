import { ContainerState } from "./types";
import { createSlice } from "store/toolkit";
import { useInjectReducer, useInjectSaga } from "store/redux-injectors";

import { liquidityPageSaga } from "./saga";
import { PayloadAction } from "@reduxjs/toolkit";
import { TokenSymbols } from "app/containers/Swap/types";
import { Pool } from "app/containers/Rewards/types";
import { zeroString } from "./constants";

// The initial state of the LiquidityPage container
export const initialState: ContainerState = {
  pools: undefined,
  pool: undefined,
  poolTokens: undefined,
  poolData: undefined,
  userShareData: undefined,
  depositTokenAmounts: {},
};

const liquidityPageSlice = createSlice({
  name: "liquidityPage",
  initialState,
  reducers: {
    setSelectedPool(state, action: PayloadAction<Pool | undefined>) {
      state.pool = action.payload;
      if (action.payload) {
        const tmp = {};
        const tokens = action.payload.poolTokens;
        for (let k in tokens) {
          tmp[k] = zeroString;
        }
        state.depositTokenAmounts = tmp;
      }
    },
    setLiquidityDepositTokenAmount(
      state,
      action: PayloadAction<{ symbol: TokenSymbols; value: string }>
    ) {
      let v = zeroString;
      const { symbol } = action.payload;
      if (!isNaN(parseFloat(action.payload.value))) {
        v = action.payload.value;
      }
      if (action.payload.value === "") {
        v = zeroString;
      }
      const valueToApply = v;
      const allValues = { ...state.depositTokenAmounts };
      allValues[symbol] = valueToApply;
      state.depositTokenAmounts = allValues;
    },
    deposit() {},
  },
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
