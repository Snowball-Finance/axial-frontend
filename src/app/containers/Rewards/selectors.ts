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
  isGettingMasterChefBalances: (state: RootState) =>
    state.rewards?.isGettingMasterChefBalances ||
    initialState.isGettingMasterChefBalances,
  isGettingMasterchefApr: (state: RootState) =>
    state.rewards?.isGettingMasterchefApr ||
    initialState.isGettingMasterchefApr,
  isGettingSwapStats: (state: RootState) =>
    state.rewards?.isGettingSwapStats || initialState.isGettingSwapStats,
  masterChefBalances: (state: RootState) =>
    state.rewards?.masterChefBalances || initialState.masterChefBalances,
  swapStats: (state: RootState) =>
    state.rewards?.swapStats || initialState.swapStats,
  masterchefApr: (state: RootState) =>
    state.rewards?.masterchefApr || initialState.masterchefApr,
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
  isGettingMasterChefBalances: createSelector(
    RewardsDomains.isGettingMasterChefBalances,
    (isGettingMasterChefBalances) => isGettingMasterChefBalances
  ),
  isGettingMasterchefApr: createSelector(
    RewardsDomains.isGettingMasterchefApr,
    (isGettingMasterchefApr) => isGettingMasterchefApr
  ),
  isGettingSwapStats: createSelector(
    RewardsDomains.isGettingSwapStats,
    (isGettingSwapStats) => isGettingSwapStats
  ),
  masterChefBalances: createSelector(
    RewardsDomains.masterChefBalances,
    (masterChefBalances) => masterChefBalances
  ),
  swapStats: createSelector(RewardsDomains.swapStats, (swapStats) => swapStats),
  masterchefApr: createSelector(
    RewardsDomains.masterchefApr,
    (masterchefApr) => masterchefApr
  ),
  isDepositing: createSelector(
    RewardsDomains.isDepositing,
    (isDepositing) => isDepositing
  ),
  isWithdrawing: createSelector(
    RewardsDomains.isWithdrawing,
    (isWithdrawing) => isWithdrawing
  ),
  poolData: (key: string) =>
    createSelector(RewardsDomains.pools, (pools) => pools[key]?.poolData),
  userShareData: (key?: string) =>
    createSelector(RewardsDomains.pools, (pools) =>
      key ? pools[key]?.userShareData : undefined
    ),
};
