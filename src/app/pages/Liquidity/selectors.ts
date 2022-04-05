import { createSelector } from "@reduxjs/toolkit";
import { Zero } from "app/containers/Rewards/constants";
import { RewardsDomains } from "app/containers/Rewards/selectors";
import { Pool, PoolTypes } from "app/containers/Rewards/types";
import { RootState } from "store/types";
import { initialState } from "./slice";

export const LiquidityPageDomains = {
  liquidityPage: (state: RootState) => state.liquidityPage || initialState,
  pools: (state: RootState) => state.liquidityPage?.pools || initialState.pools,
  pool: (state: RootState) => state.liquidityPage?.pool || initialState.pool,
  poolTokens: (state: RootState) =>
    state.liquidityPage?.poolTokens || initialState.poolTokens,
  poolData: (state: RootState) =>
    state.liquidityPage?.poolData || initialState.poolData,
  userShareData: (state: RootState) =>
    state.liquidityPage?.userShareData || initialState.userShareData,
  depositTokenAmounts: (state: RootState) =>
    state.liquidityPage?.depositTokenAmounts ||
    initialState.depositTokenAmounts,
  withdrawPercentage: (state: RootState) =>
    state.liquidityPage?.withdrawPercentage || initialState.withdrawPercentage,
  selectedTokenToWithdraw: (state: RootState) =>
    state.liquidityPage?.selectedTokenToWithdraw ||
    initialState.selectedTokenToWithdraw,
  withdrawTokenAmounts: (state: RootState) =>
    state.liquidityPage?.withdrawTokenAmounts ||
    initialState.withdrawTokenAmounts,
  depositRaw: (state: RootState) =>
    state.liquidityPage?.depositRaw || initialState.depositRaw,
  depositTransactionData: (state: RootState) =>
    state.liquidityPage?.depositTransactionData ||
    initialState.depositTransactionData,
  withdrawReviewData: (state: RootState) =>
    state.liquidityPage?.withdrawReviewData || initialState.withdrawReviewData,
  withdrawBonus: (state: RootState) =>
    state.liquidityPage?.withdrawBonus || initialState.withdrawBonus,
  tokensAreApproved: (state: RootState) =>
    state.liquidityPage?.tokensAreApproved,
  isCheckingForApproval: (state: RootState) =>
    state.liquidityPage?.isCheckingForApproval,
};

export const LiquidityPageSelectors = {
  selectLiquidityPage: createSelector(
    LiquidityPageDomains.liquidityPage,
    (liquidityPageState) => liquidityPageState
  ),
  liquidityPools: createSelector(RewardsDomains.pools, (pools) => {
    const poolsData: Pool[] = [];
    for (let key in pools) {
      if (pools[key].poolType !== PoolTypes.LP) {
        poolsData.push(pools[key]);
      }
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
  selectedPool: createSelector(LiquidityPageDomains.pool, (pool) => pool),
  liquidityPool: (key: string) =>
    createSelector(RewardsDomains.pools, (pools) => pools[key]),
  liquidityPoolTokens: (key: string) =>
    createSelector(RewardsDomains.pools, (pools) => {
      if (pools[key]) {
        return pools[key].underlyingPoolTokens || pools[key].poolTokens;
      }
      return [];
    }),

  liquidityDepositTokenAmounts: createSelector(
    LiquidityPageDomains.depositTokenAmounts,
    (depositTokenAmounts) => depositTokenAmounts
  ),
  liquidityDepositTokenAmount: (key: string) =>
    createSelector(
      LiquidityPageDomains.depositTokenAmounts,
      (depositTokenAmounts) => depositTokenAmounts[key]
    ),
  withdrawPercentage: createSelector(
    LiquidityPageDomains.withdrawPercentage,
    (withdrawPercentage) => withdrawPercentage
  ),
  selectedTokenToWithdraw: createSelector(
    LiquidityPageDomains.selectedTokenToWithdraw,
    (selectedTokenToWithdraw) => selectedTokenToWithdraw
  ),
  withdrawTokenAmounts: createSelector(
    LiquidityPageDomains.withdrawTokenAmounts,
    (withdrawTokenAmounts) => withdrawTokenAmounts
  ),
  withdrawAmount: (key: string) =>
    createSelector(
      LiquidityPageDomains.withdrawTokenAmounts,
      (withdrawTokenAmounts) => withdrawTokenAmounts[key]
    ),
  depositRaw: createSelector(
    LiquidityPageDomains.depositRaw,
    (depositRaw) => depositRaw
  ),
  depositTransactionData: createSelector(
    LiquidityPageDomains.depositTransactionData,
    (depositTransactionData) => depositTransactionData
  ),
  withdrawReviewData: createSelector(
    LiquidityPageDomains.withdrawReviewData,
    (withdrawReviewData) => withdrawReviewData
  ),
  withdrawBonus: createSelector(
    LiquidityPageDomains.withdrawBonus,
    (withdrawBonus) => withdrawBonus
  ),
  tokensAreApproved: createSelector(
    LiquidityPageDomains.tokensAreApproved,
    (tokensAreApproved) => tokensAreApproved
  ),
  isCheckingForApproval: createSelector(
    LiquidityPageDomains.isCheckingForApproval,
    (isCheckingForApproval) => isCheckingForApproval
  ),
};
