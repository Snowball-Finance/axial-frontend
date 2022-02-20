import { createSelector } from "@reduxjs/toolkit";

import { RootState } from "store/types";
import { initialState } from "./slice";

export const RewardsDomains = {
  root: (state: RootState) => state.rewards,
  lastTransactionTimes: (state: RootState) =>
    state.rewards?.lastTransactionTimes || initialState.lastTransactionTimes,
  pools: (state: RootState) => state.rewards?.pools || initialState.pools,
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
};
