import { createSelector } from "@reduxjs/toolkit";
import { GlobalDomains } from "app/appSelectors";

import { Zero } from "app/containers/Rewards/constants";
import { RewardsDomains } from "app/containers/Rewards/selectors";
import { Pool, PoolTypes } from "app/containers/Rewards/types";
import { Token, TokenSymbols } from "app/containers/Swap/types";
import { BNToString } from "common/format";
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
  depositConfirmationData: (state: RootState) =>
    state.liquidityPage?.depositConfirmationData ||
    initialState.depositConfirmationData,
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
  withdrawTokenToShow: (tokenKey?: string) =>
    createSelector(
      [
        LiquidityPageDomains.withdrawTokenAmounts,
        LiquidityPageDomains.selectedTokenToWithdraw,
        LiquidityPageDomains.withdrawPercentage,
        GlobalDomains.tokens,
      ],
      (tokenAmounts, selectedToken, percentage, tokens) => {
        const tokensObject = calculateByPercentage({
          tokenAmounts,
          selectedToken,
          percentage,
          tokens,
        });
        if (tokenKey) {
          return tokensObject[tokenKey];
        }
        return tokensObject;
      }
    ),
  depositRaw: createSelector(
    LiquidityPageDomains.depositRaw,
    (depositRaw) => depositRaw
  ),
  depositConfirmationData: createSelector(
    LiquidityPageDomains.depositConfirmationData,
    (depositConfirmationData) => depositConfirmationData
  ),
};

interface CalculatorProps {
  tokens: { [K in TokenSymbols]?: Token } | undefined;
  percentage: number;
  selectedToken: TokenSymbols | "combo";
  tokenAmounts: { [K in TokenSymbols]?: string };
}

const calculateByPercentage = (props: CalculatorProps) => {
  const { tokenAmounts, selectedToken, percentage, tokens } = props;
  const tmpAmounts = { ...tokenAmounts };
  const tmpBalance = {};
  if (percentage) {
    if (selectedToken === "combo") {
      if (percentage) {
        for (const key in tokenAmounts) {
          if (tokens && tokens[key] && tokens[key].balance) {
            const element: Token = tokens[key];
            //calculate percentage amount of balance
            if (element.balance) {
              const balance = element.balance.mul(percentage).div(100);
              tmpBalance[key] = BNToString(balance, element.decimals);
            }
          }
        }
        return tmpBalance;
      }
    } else if (tokens && tokens[selectedToken]) {
      const element: Token = tokens[selectedToken] as Token;
      if (element.balance) {
        const balance = element.balance.mul(percentage).div(100);
        tmpAmounts[selectedToken] = BNToString(balance, element.decimals);
        return tmpAmounts;
      }
    }
  }
  return tokenAmounts;
};
