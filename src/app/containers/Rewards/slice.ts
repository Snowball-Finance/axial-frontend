import { PayloadAction } from "@reduxjs/toolkit";
import {
  DepositPayload,
  WithdrawPayload,
  ContainerState,
  SwapStatsReponse,
  TRANSACTION_TYPES,
} from "./types";
import { createSlice } from "store/toolkit";
import { useInjectReducer, useInjectSaga } from "store/redux-injectors";

import { rewardsSaga } from "./saga";

// The initial state of the Rewards container
export const initialState: ContainerState = {
  lastTransactionTimes: {
    [TRANSACTION_TYPES.DEPOSIT]: Date.now(),
    [TRANSACTION_TYPES.WITHDRAW]: Date.now(),
    [TRANSACTION_TYPES.SWAP]: Date.now(),
    [TRANSACTION_TYPES.MIGRATE]: Date.now(),
  },
  pools: {},
  isGettingPoolsBalances: false,
  isGettingAprData: false,
  isGettingSwapStats: false,
  poolsBalances: undefined,
  swapStats: undefined,
  aprData: undefined,
  isDepositing: false,
  isWithdrawing: false,
  isGettingPoolsData: false,
};

interface LastTransactionTimes {
  [transactionType: string]: number;
}
export interface ExtraTokens {
  address: string;
  tokenPerSec: string;
}

export interface AprData {
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
    setIsGettingPoolsBalances(state, action: PayloadAction<boolean>) {},
    setPoolsBalances(
      state,
      action: PayloadAction<ContainerState["poolsBalances"]>
    ) {
      state.poolsBalances = action.payload;
    },
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
    setIsGettingAprData(state, action: PayloadAction<boolean>) {},
    setAprData(state, action: PayloadAction<ContainerState["aprData"]>) {
      state.aprData = action.payload;
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
    deposit(state, action: PayloadAction<DepositPayload>) {},
    setIsDepositing(state, action: PayloadAction<boolean>) {
      state.isDepositing = action.payload;
    },
    setIsWithdrawing(state, action: PayloadAction<boolean>) {
      state.isWithdrawing = action.payload;
    },
    withdraw(state, action: PayloadAction<WithdrawPayload>) {},
    setIsGettingPoolsData(state, action: PayloadAction<boolean>) {
      state.isGettingPoolsData = action.payload;
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
