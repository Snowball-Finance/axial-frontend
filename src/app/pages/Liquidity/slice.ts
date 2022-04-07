import {
  ContainerState,
  DepositTransactionData,
  LiquidityPageState,
  SelectTokenToWithdrawPayload,
  TypeOfTokensToWithdraw,
  WithdrawReviewData,
  WithdrawTokenAmountChangePayload,
} from "./types";
import { createSlice } from "store/toolkit";
import { useInjectReducer, useInjectSaga } from "store/redux-injectors";

import { PayloadAction } from "@reduxjs/toolkit";
import { TokenSymbols } from "app/containers/Swap/types";
import { Pool } from "app/containers/Rewards/types";
import { zeroString } from "./constants";
import { BigNumber } from "ethers";
import { liquidityPageSaga } from "./saga";

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
  selectedTokenToWithdraw: TypeOfTokensToWithdraw.Combo,
  depositRaw: false,
  depositTransactionData: undefined,
  withdrawReviewData: undefined,
  withdrawBonus: undefined,
  tokensAreApprovedForDeposit: false,
  isCheckingForApproval: false,
  tokensAreApprovedForWithdrawal: false,
  isCalculatingForWithdrawal: false,
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
    withdraw(state, action: PayloadAction<void>) {},
    setWithdrawPercentage(state, action: PayloadAction<number>) {
      state.withdrawPercentage = action.payload;
    },
    resetPercentage(state) {
      state.withdrawPercentage = 0;
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
    setWithdrawBonus(state, action: PayloadAction<BigNumber | undefined>) {
      state.withdrawBonus = action.payload;
    },
    setTokensAreApproved(state, action: PayloadAction<boolean>) {
      state.tokensAreApprovedForDeposit = action.payload;
    },
    approveTokensForDeposit(state, action: PayloadAction<void>) {},
    checkIsAllTokensAreApprovedForDeposit(
      state,
      action: PayloadAction<void>
    ) {},
    setIsCheckingForApproval(state, action: PayloadAction<boolean>) {
      state.isCheckingForApproval = action.payload;
    },
    checkForWithdrawApproval(state, action: PayloadAction<void>) {},
    requestWithdrawApproval(state, action: PayloadAction<void>) {},
    setIsCalculatingForWithdrawal(state, action: PayloadAction<boolean>) {
      state.isCalculatingForWithdrawal = action.payload;
    },
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
