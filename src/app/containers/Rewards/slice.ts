import { PayloadAction } from "@reduxjs/toolkit";
import { ContainerState } from "./types";
import { createSlice } from "store/toolkit";
import { useInjectReducer, useInjectSaga } from "store/redux-injectors";

import { rewardsSaga } from "./saga";
import { TRANSACTION_TYPES } from "app/constants";

// The initial state of the Rewards container
export const initialState: ContainerState = {
  lastTransactionTimes: {
    [TRANSACTION_TYPES.DEPOSIT]: Date.now(),
    [TRANSACTION_TYPES.WITHDRAW]: Date.now(),
    [TRANSACTION_TYPES.SWAP]: Date.now(),
    [TRANSACTION_TYPES.MIGRATE]: Date.now(),
  },
  pools: {},
  tokenPricesUSD: {},
  isGettingMasterChefBalances: false,
  isGettingMasterchefApr: false,
  masterChefBalances: undefined,
  swapStats: null,
  masterchefApr: undefined,
};

interface LastTransactionTimes {
  [transactionType: string]: number;
}
export interface ExtraTokens {
  address: string;
  tokenPerSec: string;
}

export interface MasterchefApr {
  [swapAddress: string]: {
    apr: number;
    lptvl: number;
    totalStaked: string;
    tokenPoolPrice: number;
    extraTokens: ExtraTokens[];
  };
}

const rewardsSlice = createSlice({
  name: "rewards",
  initialState,
  reducers: {
    getRewardPoolsData(
      state,
      action: PayloadAction<ContainerState["pools"]>
    ) {},
    setRewardPoolsData(state, action: PayloadAction<any>) {},
    getMasterChefBalances(state, action: PayloadAction<void>) {},
    setIsGettingMasterChefBalances(state, action: PayloadAction<boolean>) {},
    setMasterChefBalances(
      state,
      action: PayloadAction<ContainerState["masterChefBalances"]>
    ) {
      state.masterChefBalances = action.payload;
    },
    getMasterchefAPR(state, action: PayloadAction<void>) {},
    setIsGettingMasterchefApr(state, action: PayloadAction<boolean>) {},
    setMasterChefAPR(
      state,
      action: PayloadAction<ContainerState["masterchefApr"]>
    ) {
      state.masterchefApr = action.payload;
    },
    updateLastTransactionTimes(
      state,
      action: PayloadAction<LastTransactionTimes>
    ): void {
      state.lastTransactionTimes = {
        ...state.lastTransactionTimes,
        ...action.payload,
      };
    },
    updateMasterchefApr(state, action: PayloadAction<MasterchefApr>): void {
      state.masterchefApr = action.payload;
    },
  },
});

export const {
  actions: RewardsActions,
  reducer: RewardsReducer,
  name: sliceKey,
} = rewardsSlice;

export const useRewardsSlice = () => {
  useInjectReducer({ key: sliceKey, reducer: RewardsReducer });
  useInjectSaga({ key: sliceKey, saga: rewardsSaga });
  return { RewardsActions };
};
