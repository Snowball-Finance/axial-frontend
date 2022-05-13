import { createSelector } from "@reduxjs/toolkit";

import { GlobalDomains } from "app/appSelectors";
import { RootState } from "store/types";
import { initialState } from "./slice";
import { TokenOption } from "./types";
import {
  calculatePrice,
  formatBNToString,
  shiftBNDecimals,
} from "app/containers/utils/contractUtils";
import { Zero } from "app/containers/Rewards/constants";
import { SwapDomains } from "app/containers/Swap/selectors";

export const SwapPageDomains = {
  swapPage: (state: RootState) => state.swapPage || initialState,
  fromTokenError: (state: RootState) =>
    state.swapPage?.fromTokenError || initialState.fromTokenError,
  fromToken: (state: RootState) =>
    state.swapPage?.fromToken || initialState.fromToken,
  fromAmount: (state: RootState) =>
    state.swapPage?.fromAmount || initialState.fromAmount,
  toToken: (state: RootState) =>
    state.swapPage?.toToken || initialState.toToken,
  searchValue: (state: RootState) =>
    state.swapPage?.searchValue || initialState.searchValue,
  reviewSwapConfirmationData: (state: RootState) =>
    state.swapPage?.reviewSwapConfirmationData ||
    initialState.reviewSwapConfirmationData,
  hasConfirmedHighPriceImpact: (state: RootState) =>
    state.swapPage?.hasConfirmedHighPriceImpact ||
    initialState.hasConfirmedHighPriceImpact,
};

export const SwapPageSelectors = {
  selectSwapPage: createSelector(
    SwapPageDomains.swapPage,
    (swapPageState) => swapPageState
  ),
  fromTokenOptions: createSelector(
    GlobalDomains.tokens,
    GlobalDomains.tokenPricesUSD,
    SwapPageDomains.toToken,
    SwapPageDomains.searchValue,
    (tokens, tokenPricesUSD, tokenChange, searchValue) => {
      const fromTokens: TokenOption[] = [];
      const tokensArray = tokens ? Object.values(tokens) : [];
      const visibleTokens = tokensArray.filter(
        ({ isLPToken, blockSwap }) => !isLPToken && !blockSwap
      );

      visibleTokens.forEach(({ symbol, logo, decimals }) => {
        const icon = logo || "";
        if (tokenChange?.symbol !== symbol) {
          const tokenBalance = formatBNToString(
            tokens?.[symbol].balance || Zero,
            decimals
          );
          const tokenBalanceUSD =
            calculatePrice(tokenBalance, tokenPricesUSD?.[symbol], decimals) ||
            Zero;

          fromTokens.push({
            value: symbol,
            icon,
            balance: tokens?.[symbol].balance,
            balanceUSD: tokenBalanceUSD,
            decimals,
          });
        }
      });
      return fromTokens
        .filter((item) =>
          item.value.toLowerCase().includes(searchValue.toLowerCase())
        )
        .sort((a: TokenOption, b: TokenOption) => {
          if (a.balanceUSD.eq(b.balanceUSD)) {
            const amountA = shiftBNDecimals(a.balance || Zero, 18 - a.decimals);
            const amountB = shiftBNDecimals(b.balance || Zero, 18 - b.decimals);
            return amountA.gt(amountB) ? -1 : 1;
          } else if (a.balanceUSD.gt(b.balanceUSD)) {
            return -1;
          }
          return 1;
        });
    }
  ),
  toTokenOptions: createSelector(
    GlobalDomains.tokens,
    GlobalDomains.tokenPricesUSD,
    SwapPageDomains.fromToken,
    SwapPageDomains.searchValue,
    (tokens, tokenPricesUSD, fromToken, searchValue) => {
      const toTokens: TokenOption[] = [];
      const tokensArray = tokens ? Object.values(tokens) : [];
      const visibleTokens = tokensArray.filter(
        ({ isLPToken, blockSwap }) => !isLPToken && !blockSwap
      );

      visibleTokens.forEach(({ symbol, logo, decimals }) => {
        const icon = logo || "";
        if (fromToken?.symbol !== symbol) {
          const tokenBalance = formatBNToString(
            tokens?.[symbol].balance || Zero,
            decimals
          );
          const tokenBalanceUSD =
            calculatePrice(tokenBalance, tokenPricesUSD?.[symbol], decimals) ||
            Zero;
          toTokens.push({
            value: symbol,
            icon,
            balance: tokens?.[symbol].balance,
            balanceUSD: tokenBalanceUSD,
            decimals,
          });
        }
      });

      return toTokens
        .filter((item) =>
          item.value.toLowerCase().includes(searchValue.toLowerCase())
        )
        .sort((a: TokenOption, b: TokenOption) => {
          if (a.balanceUSD.eq(b.balanceUSD)) {
            const amountA = shiftBNDecimals(a.balance || Zero, 18 - a.decimals);
            const amountB = shiftBNDecimals(b.balance || Zero, 18 - b.decimals);
            return amountA.gt(amountB) ? -1 : 1;
          } else if (a.balanceUSD.gt(b.balanceUSD)) {
            return -1;
          }
          return 1;
        });
    }
  ),
  selectedFromToken: createSelector(
    SwapPageDomains.fromToken,
    (fromToken) => fromToken
  ),
  selectedFromAmount: createSelector(
    SwapPageDomains.fromAmount,
    (fromAmount) => fromAmount
  ),
  selectedToAmount: createSelector(
    SwapDomains.bestPath,
    SwapPageDomains.toToken,
    (bestPath, toToken) => {
      if (toToken) {
        return formatBNToString(
          bestPath?.bestPath?.amounts[bestPath?.bestPath?.amounts.length - 1] ||
            Zero,
          toToken?.decimals || 18
        );
      }

      return "0.0";
    }
  ),
  selectedToToken: createSelector(
    SwapPageDomains.toToken,
    (toToken) => toToken
  ),
  errorMessage: createSelector(
    SwapPageDomains.fromTokenError,
    (error) => error
  ),
  searchValue: createSelector(
    SwapPageDomains.searchValue,
    (searchValue) => searchValue
  ),
  reviewSwapConfirmationData: createSelector(
    SwapPageDomains.reviewSwapConfirmationData,
    (reviewSwapConfirmationData) => reviewSwapConfirmationData
  ),
  hasConfirmedHighPriceImpact: createSelector(
    SwapPageDomains.hasConfirmedHighPriceImpact,
    (hasConfirmedHighPriceImpact) => hasConfirmedHighPriceImpact
  ),
};
