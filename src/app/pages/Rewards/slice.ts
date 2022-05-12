import { PayloadAction } from "@reduxjs/toolkit";

import { ContainerState } from "./types";
import { createSlice } from "store/toolkit";
import { useInjectReducer, useInjectSaga } from "store/redux-injectors";

import { rewardsPageSaga } from "./saga";
import { zeroString } from "../Liquidity/constants";
import { Pool, UserShareData } from "app/containers/Rewards/types";
import { divide, multiply } from "precise-math";

// The initial state of the RewardsPage container
export const initialState: ContainerState = {
  pools: undefined,
  pool: undefined,
  poolTokens: undefined,
  poolData: undefined,
  userShareData: undefined,
  rewardsPageUserShareData: undefined,
  isGettingUserShareDataInRewardsPage: false,
  isCompoundWithSnowballLoading: false,
  compoundWithSnowballAPY: "0.00",
  depositValue: zeroString,
  withdrawPercentage: 0,
  withdrawAmount: zeroString,
  isModalOpen: false,
  isClaimModalOpen: false,
  checkedClaimRewards: [],
  isClaimRewardsLoading: false,
};

const rewardsPageSlice = createSlice({
  name: "rewardsPage",
  initialState,
  reducers: {
    setCompoundWithSnowballLoading(state, action: PayloadAction<boolean>) {
      state.isCompoundWithSnowballLoading = action.payload;
    },
    setCompoundWithSnowballAPY(state, action: PayloadAction<string>) {
      state.compoundWithSnowballAPY = action.payload;
    },
    poolInfoByAddress(state, action: PayloadAction<string>) {},
    setSelectedPool(state, action: PayloadAction<Pool | undefined>) {
      state.pool = action.payload;
    },
    setDepositValue(state, action: PayloadAction<string>) {
      state.depositValue = action.payload;
    },
    deposit() {},
    withdraw() {},
    claim(state, action: PayloadAction<Pool>) {},
    setWithdrawPercentage(
      state,
      action: PayloadAction<{ percent: number; balance: number }>
    ) {
      const { balance, percent } = action.payload;
      state.withdrawPercentage = percent;
      //calculate percentage of balance
      const amount = divide(multiply(action.payload.percent, balance), 100);
      state.withdrawAmount = amount.toString();
    },
    setWithdrawAmount(state, action: PayloadAction<string>) {
      state.withdrawPercentage = 0;
      state.withdrawAmount = action.payload;
    },
    setIsModalOpen(state, action: PayloadAction<boolean>) {
      state.isModalOpen = action.payload;
    },
    setIsClaimModalOpen(state, action: PayloadAction<boolean>) {
      state.isClaimModalOpen = action.payload;
    },
    getRewardPoolData() {},
    setRewardsPageUserShareData(state, action: PayloadAction<UserShareData>) {
      state.rewardsPageUserShareData = action.payload;
    },
    setCheckedClaimRewards(state, action: PayloadAction<number[]>) {
      state.checkedClaimRewards = action.payload;
    },
    setisClaimRewardsLoading(state, action: PayloadAction<boolean>) {
      state.isClaimRewardsLoading = action.payload;
    },
    claimRewardsToken() {},
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
