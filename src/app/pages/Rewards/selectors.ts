import { createSelector } from "@reduxjs/toolkit";
import { Zero } from "app/containers/Rewards/constants";

import { RewardsDomains } from "app/containers/Rewards/selectors";
import { Pool, Pools } from "app/containers/Rewards/types";
import { RootState } from "store/types";
import { initialState } from "./slice";
import { axialJlpToken } from "./staticValue";

export const RewardsPageDomains = {
  rewardsPage: (state: RootState) => state.rewardsPage || initialState,
  pools: (state: RootState) => state.rewardsPage?.pools || initialState.pools,
  pool: (state: RootState) => state.rewardsPage?.pool || initialState.pool,
  poolTokens: (state: RootState) =>
    state.rewardsPage?.poolTokens || initialState.poolTokens,
  poolData: (state: RootState) =>
    state.rewardsPage?.poolData || initialState.poolData,
  userShareData: (state: RootState) =>
    state.rewardsPage?.userShareData || initialState.userShareData,
  depositValue: (state: RootState) =>
    state.rewardsPage?.depositValue || initialState.depositValue,
};

export const RewardsPageSelectors = {
  selectRewardsPage: createSelector(
    RewardsPageDomains.rewardsPage,
    (rewardsPageState) => rewardsPageState
  ),
  rewardsPools: createSelector(RewardsDomains.pools, (pools) => {
    const poolsData: Pool[] = [];
    for (let key in pools) {
      poolsData.push(pools[key]);
    }

    return poolsData.sort((a, b) => {
      if (
        (a.userShareData?.usdBalance || Zero).gt(Zero) ||
        (b.userShareData?.usdBalance || Zero).gt(Zero)
      ) {
        return (a.userShareData?.usdBalance || Zero).gt(
          b.userShareData?.usdBalance || Zero
        )
          ? -1
          : 1;
      } else {
        return (a.poolData?.reserve || Zero).gt(b.poolData?.reserve || Zero)
          ? -1
          : 1;
      }
    });
  }),
  rewardsPool: (key: string) =>
    createSelector(RewardsDomains.pools, (pools) => pools[key]),
  selectedPool: createSelector(RewardsPageDomains.pool, (pool) => pool),
  rewardsPoolTokens: (key: string) =>
    createSelector(RewardsDomains.pools, (pools) => pools[key]?.poolTokens),
  rewardsPoolData: (key: string) =>
    createSelector(RewardsDomains.pools, (pools) => {
      if (key === Pools.AXIAL_JLP) {
        return {
          tokens: axialJlpToken,
        };
      }
      return pools[key]?.poolData;
    }),
  rewardsUserShareData: (key: string) =>
    createSelector(RewardsDomains.pools, (pools) => pools[key]?.userShareData),
  depositValue: createSelector(
    RewardsPageDomains.depositValue,
    (depositValue) => depositValue
  ),
};