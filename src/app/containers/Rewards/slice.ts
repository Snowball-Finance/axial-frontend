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
  tokenPricesUSD: null,
  swapStats: null,
  masterchefApr: null,
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
    setRewardPools(state, action: PayloadAction<ContainerState["pools"]>) {
      state.pools = action.payload;
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
