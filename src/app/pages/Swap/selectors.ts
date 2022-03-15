import { createSelector } from "@reduxjs/toolkit";

import { GlobalDomains } from "app/appSelectors";
import { RootState } from "store/types";
import { initialState } from "./slice";
import { TokenOption } from "./types";
import {
  calculatePrice,
  formatBNToString,
} from "app/containers/utils/contractUtils";
import { Zero } from "app/containers/Rewards/constants";
import { TOKENS_MAP } from "app/constants";

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
      const visibleTokens = Object.values(TOKENS_MAP).filter(
        ({ isLPToken }) => !isLPToken
      );

      visibleTokens.forEach(({ symbol, icon, decimals }) => {
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
            balance: tokenBalance,
            balanceUSD: formatBNToString(tokenBalanceUSD, 18, 2),
            decimals,
          });
        }
      });

      return fromTokens
        .filter((item) =>
          item.value.toLowerCase().includes(searchValue.toLowerCase())
        )
        .sort(
          (a: TokenOption, b: TokenOption) =>
            parseFloat(b?.balance) - parseFloat(a?.balance)
        );
    }
  ),
  toTokenOptions: createSelector(
    GlobalDomains.tokens,
    GlobalDomains.tokenPricesUSD,
    SwapPageDomains.fromToken,
    SwapPageDomains.searchValue,
    (tokens, tokenPricesUSD, fromToken, searchValue) => {
      const toTokens: TokenOption[] = [];
      const visibleTokens = Object.values(TOKENS_MAP).filter(
        ({ isLPToken }) => !isLPToken
      );

      visibleTokens.forEach(({ symbol, icon, decimals }) => {
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
            balance: tokenBalance,
            balanceUSD: formatBNToString(tokenBalanceUSD, 18, 2),
            decimals,
          });
        }
      });

      return toTokens
        .filter((item) =>
          item.value.toLowerCase().includes(searchValue.toLowerCase())
        )
        .sort(
          (a: TokenOption, b: TokenOption) =>
            parseFloat(b?.balance) - parseFloat(a?.balance)
        );
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
};
