import { createSelector } from "@reduxjs/toolkit";

import { RootState } from "store/types";
import { initialState } from "./slice";
import { Pools } from "./types";

export const RewardsDomains = {
  root: (state: RootState) => state.rewards,
  lastTransactionTimes: (state: RootState) =>
    state.rewards?.lastTransactionTimes || initialState.lastTransactionTimes,
  pools: (state: RootState) => state.rewards?.pools || initialState.pools,
  UserShareData: (poolKey: Pools) => (state: RootState) =>
    state?.rewards?.pools[poolKey]?.userShareData || undefined,
  isGettingPoolsData: (state: RootState) =>
    state.rewards?.isGettingPoolsData || initialState.isGettingPoolsData,
  isGettingPoolsBalances: (state: RootState) =>
    state.rewards?.isGettingPoolsBalances ||
    initialState.isGettingPoolsBalances,
  isGettingAprData: (state: RootState) =>
    state.rewards?.isGettingAprData || initialState.isGettingAprData,
  isGettingSwapStats: (state: RootState) =>
    state.rewards?.isGettingSwapStats || initialState.isGettingSwapStats,
  poolsBalances: (state: RootState) =>
    state.rewards?.poolsBalances || initialState.poolsBalances,
  swapStats: (state: RootState) =>
    state.rewards?.swapStats || initialState.swapStats,
  aprData: (state: RootState) => state.rewards?.aprData || initialState.aprData,
  isDepositing: (state: RootState) =>
    state.rewards?.isDepositing || initialState.isDepositing,
  isWithdrawing: (state: RootState) =>
    state.rewards?.isWithdrawing || initialState.isWithdrawing,
};

export const RewardsSelectors = {
  root: createSelector(RewardsDomains.root, (root) => root),
  lastTransactionTimes: createSelector(
    RewardsDomains.lastTransactionTimes,
    (lastTransactionTimes) => lastTransactionTimes
  ),
  pools: createSelector([RewardsDomains.pools], (pools) => pools),
  isGettingPoolsBalances: createSelector(
    RewardsDomains.isGettingPoolsBalances,
    (isGettingPoolsBalances) => isGettingPoolsBalances
  ),
  isGettingAprData: createSelector(
    RewardsDomains.isGettingAprData,
    (isGetting) => isGetting
  ),
  isGettingSwapStats: createSelector(
    RewardsDomains.isGettingSwapStats,
    (isGettingSwapStats) => isGettingSwapStats
  ),
  poolsBalances: createSelector(
    RewardsDomains.poolsBalances,
    (poolsBalances) => poolsBalances
  ),
  swapStats: createSelector(RewardsDomains.swapStats, (swapStats) => swapStats),
  aprData: createSelector(RewardsDomains.aprData, (apr) => apr),
  isDepositing: createSelector(
    RewardsDomains.isDepositing,
    (isDepositing) => isDepositing
  ),
  isWithdrawing: createSelector(
    RewardsDomains.isWithdrawing,
    (isWithdrawing) => isWithdrawing
  ),
  poolData: (key?: string) =>
    createSelector(RewardsDomains.pools, (pools) => {
      if (key && pools) {
        return pools[key]?.poolData;
      }
      return undefined;
    }),
  userShareData: (key?: string) =>
    createSelector(RewardsDomains.pools, (pools) =>
      key ? pools[key]?.userShareData : undefined
    ),
  isGettingPoolsData: createSelector(
    RewardsDomains.isGettingPoolsData,
    (isGettingPoolsData) => isGettingPoolsData
  ),
};
