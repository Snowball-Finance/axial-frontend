import {
  ContainerState,
  DepositTransactionData,
  LiquidityPageState,
  SelectTokenToWithdrawPayload,
  WithdrawReviewData,
  WithdrawTokenAmountChangePayload,
} from "./types";
import { createSlice } from "store/toolkit";
import { useInjectReducer, useInjectSaga } from "store/redux-injectors";

import { liquidityPageSaga } from "./saga";
import { PayloadAction } from "@reduxjs/toolkit";
import { TokenSymbols } from "app/containers/Swap/types";
import { ApproveAndWithdrawPayload, Pool } from "app/containers/Rewards/types";
import { zeroString } from "./constants";

// The initial state of the LiquidityPage container
export const initialState: ContainerState = {
  pools: undefined,
  pool: undefined,
  poolTokens: undefined,
  poolData: undefined,
  userShareData: undefined,
  depositTokenAmounts: {},
  withdrawTokenAmounts: {},
  withdrawPercentage: 0,
  selectedTokenToWithdraw: "combo",
  depositRaw: false,
  depositTransactionData: undefined,
  withdrawReviewData: undefined,
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
          const token = tokens[k];
          tmp[token.symbol] = zeroString;
        }
        state.depositTokenAmounts = tmp;
        state.withdrawTokenAmounts = tmp;
      }
    },
    resetTokens(state) {
      const pool = state.pool;
      if (pool) {
        const depositWrapped = state.depositRaw;
        const tokens = depositWrapped
          ? pool.underlyingPoolTokens
          : pool.poolTokens;
        const tmp = {};
        for (let k in tokens) {
          const token = tokens[k];
          tmp[token.symbol] = zeroString;
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
    setDepositRaw(state, action: PayloadAction<boolean>) {
      state.depositRaw = action.payload;
    },
    deposit() {},
    withdraw(state, action: PayloadAction<ApproveAndWithdrawPayload>) {},
    setWithdrawPercentage(state, action: PayloadAction<number>) {
      state.withdrawPercentage = action.payload;
    },
    setSelectedTokenToWithdraw(
      state,
      action: PayloadAction<SelectTokenToWithdrawPayload>
    ) {
      state.selectedTokenToWithdraw = action.payload.symbol;
    },
    setAmountForTokenToWithdraw(
      state,
      action: PayloadAction<WithdrawTokenAmountChangePayload>
    ) {},
    setTokenAmountsToWithdraw(
      state,
      action: PayloadAction<LiquidityPageState["withdrawTokenAmounts"]>
    ) {
      state.withdrawTokenAmounts = { ...action.payload };
    },
    setDepositTransactionData(
      state,
      action: PayloadAction<DepositTransactionData | undefined>
    ) {
      state.depositTransactionData = action.payload;
    },
    setWithdrawReviewData(
      state,
      action: PayloadAction<WithdrawReviewData | undefined>
    ) {
      state.withdrawReviewData = action.payload;
    },
    buildTransactionData() {},
    buildWithdrawReviewData() {},
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
