import { ContainerState } from "./types";
import { createSlice } from "store/toolkit";
import { useInjectReducer, useInjectSaga } from "store/redux-injectors";

import { rewardsPageSaga } from "./saga";
import { zeroString } from "../Liquidity/constants";
import { PayloadAction } from "@reduxjs/toolkit";
import { Pool } from "app/containers/Rewards/types";
import { divide, multiply } from "precise-math";

// The initial state of the RewardsPage container
export const initialState: ContainerState = {
  pools: undefined,
  pool: undefined,
  poolTokens: undefined,
  poolData: undefined,
  userShareData: undefined,
  depositValue: zeroString,
  withdrawPercentage: 0,
  withdrawAmount: zeroString,
};

const rewardsPageSlice = createSlice({
  name: "rewardsPage",
  initialState,
  reducers: {
    setSelectedPool(state, action: PayloadAction<Pool | undefined>) {
      state.pool = action.payload;
    },
    setDepositValue(state, action: PayloadAction<string>) {
      state.depositValue = action.payload;
    },
    deposit() {},
    withdraw() {},
    setWithdrawPercentage(state, action: PayloadAction<{percent:number,balance:number}>) {
      state.withdrawPercentage = action.payload.percent;
      //calculate percentage of balance
      const amount=multiply(action.payload.balance,(divide(action.payload.percent,100)));
      state.withdrawAmount=amount.toString();
    },
    setWithdrawAmount(state, action: PayloadAction<string>) {
      state.withdrawPercentage=0
      state.withdrawAmount = action.payload;
    }
  },
});

export const {
  actions: RewardsPageActions,
  reducer: RewardsPageReducer,
  name: sliceKey,
} = rewardsPageSlice;

export const useRewardsPageSlice = () => {
  useInjectReducer({ key: sliceKey, reducer: RewardsPageReducer });
  useInjectSaga({ key: sliceKey, saga: rewardsPageSaga });
  return { RewardsPageActions };
};
