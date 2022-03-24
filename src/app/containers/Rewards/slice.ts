import { PayloadAction } from "@reduxjs/toolkit";
import {
  ApproveAndDepositPayload,
  ApproveAndWithdrawPayload,
  ContainerState,
  SwapStatsReponse,
} from "./types";
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
  isGettingMasterChefBalances: false,
  isGettingMasterchefApr: false,
  isGettingSwapStats: false,
  masterChefBalances: undefined,
  swapStats: undefined,
  masterchefApr: undefined,
  isDepositing: false,
  isWithdrawing: false,
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
    setRewardPools(state, action: PayloadAction<ContainerState["pools"]>) {
      state.pools = action.payload;
    },
    getMasterChefBalances(state, action: PayloadAction<void>) {},
    setIsGettingMasterChefBalances(state, action: PayloadAction<boolean>) {},
    setMasterChefBalances(
      state,
      action: PayloadAction<ContainerState["masterChefBalances"]>
    ) {
      state.masterChefBalances = action.payload;
    },
    getMasterchefAPR(state, action: PayloadAction<void>) {},
    getSwapStats(state, action: PayloadAction<void>) {},
    setIsGettingSwapStats(state, action: PayloadAction<boolean>) {
      state.isGettingSwapStats = action.payload;
    },
    setSwapStats(state, action: PayloadAction<SwapStatsReponse[]>): void {
      const formattedPayload = Object.values(action.payload).reduce(
        (acc, data) => {
          if (isNaN(data.last_apr) || isNaN(data.last_vol)) {
            return acc;
          }
          const apr = data.last_apr;
          const tvl = 0;
          const oneDayVolume = data.last_vol;
          const utilization = 0;
          return {
            ...acc,
            [data.swapaddress]: {
              apr,
              tvl,
              oneDayVolume,
              utilization,
            },
          };
        },
        {}
      );
      state.swapStats = formattedPayload;
    },
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
    approveAndDeposit(
      state,
      action: PayloadAction<ApproveAndDepositPayload>
    ) {},
    setIsDepositing(state, action: PayloadAction<boolean>) {
      state.isDepositing = action.payload;
    },
    setIsWithdrawing(state, action: PayloadAction<boolean>) {
      state.isWithdrawing = action.payload;
    },

    approveAndWithdraw(
      state,
      action: PayloadAction<ApproveAndWithdrawPayload>
    ) {},
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
