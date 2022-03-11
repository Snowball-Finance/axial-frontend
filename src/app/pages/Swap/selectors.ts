import { createSelector } from "@reduxjs/toolkit";
import { BigNumber } from "ethers";

import { BNToString } from "common/format";
import { GlobalDomains } from "app/appSelectors";
import { RootState } from "store/types";
import { initialState } from "./slice";
import { TokenOption } from "./types";

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
    SwapPageDomains.toToken,
    SwapPageDomains.searchValue,
    (tokens, tokenChange, searchValue) => {
      const fromTokens: TokenOption[] = [];
      for (let key in tokens) {
        if (tokens.hasOwnProperty(key) && tokenChange?.symbol !== key) {
          const { name, symbol, logo, decimals, balance } = tokens[key];
          const tokenBalance = BNToString(
            balance ?? BigNumber.from(0),
            decimals
          );
          fromTokens.push({
            value: symbol,
            label: name,
            icon: logo,
            balance: tokenBalance || "0",
            decimals,
          });
        }
      }
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
    SwapPageDomains.fromToken,
    SwapPageDomains.searchValue,
    (tokens, fromToken, searchValue) => {
      const toTokens: TokenOption[] = [];
      for (let key in tokens) {
        if (tokens.hasOwnProperty(key) && fromToken?.symbol !== key) {
          const { name, symbol, logo, decimals, balance } = tokens[key];
          const tokenBalance = BNToString(
            balance ?? BigNumber.from(0),
            decimals
          );
          toTokens.push({
            value: symbol,
            label: name,
            icon: logo,
            balance: tokenBalance || "0",
            decimals,
          });
        }
      }
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
