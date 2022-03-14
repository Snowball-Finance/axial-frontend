import { createSelector } from "@reduxjs/toolkit";
import { Zero } from "app/containers/Rewards/constants";

import { RewardsDomains } from "app/containers/Rewards/selectors";
import { Pool, Pools } from "app/containers/Rewards/types";
import { BigNumber } from "ethers";
import { RootState } from "store/types";
import { initialState } from "./slice";

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
  rewardsPoolTokens: (key: string) =>
    createSelector(RewardsDomains.pools, (pools) => pools[key].poolTokens),
  rewardsPoolData: (key: string) =>
    createSelector(RewardsDomains.pools, (pools) => {
      if (key === Pools.AXIAL_JLP) {
        return {
          tokens: [
            {
              percent: "24.19%",
              symbol: "TSD",
              value: BigNumber.from("0x012410c9d8d3e7774b6dfb"),
            },
          ],
        };
      }
      return pools[key].poolData;
    }),
  rewardsUserShareData: (key: string) =>
    createSelector(RewardsDomains.pools, (pools) => pools[key].userShareData),
};
