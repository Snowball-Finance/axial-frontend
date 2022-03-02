import { createSelector } from "@reduxjs/toolkit";
import { GlobalDomains } from "app/appSelectors";

import { RootState } from "store/types";
import { initialState } from "./slice";

export const SwapPageDomains = {
  swapPage: (state: RootState) => state.swapPage || initialState,
  selectedFromToken: (state: RootState) =>
    state.swapPage?.selectedFromToken || initialState.selectedFromToken,
  selectedToToken: (state: RootState) =>
    state.swapPage?.selectedToToken || initialState.selectedToToken,
  fromAmount: (state: RootState) =>
    state.swapPage?.fromAmount || initialState.fromAmount,
  toAmount: (state: RootState) =>
    state.swapPage?.toAmount || initialState.toAmount,
};

export const SwapPageSelectors = {
  selectSwapPage: createSelector(
    SwapPageDomains.swapPage,
    (swapPageState) => swapPageState
  ),
  selectOrderedFromTokens: createSelector(
    GlobalDomains.tokens,
    SwapPageDomains.selectedToToken,
    (tokens, toToken) => {
      //do the logic here to filter and sort the tokens
    }
  ),
  selectOrderedToTokens: createSelector(
    GlobalDomains.tokens,
    SwapPageDomains.selectedFromToken,
    (tokens, fromToken) => {}
  ),
  selectSelectedFromToken: createSelector(
    SwapPageDomains.selectedFromToken,
    (selectedFromToken) => selectedFromToken
  ),
  selectSelectedToToken: createSelector(
    SwapPageDomains.selectedToToken,
    (selectedToToken) => selectedToToken
  ),
  selectFromAmount: createSelector(
    SwapPageDomains.fromAmount,
    (fromAmount) => fromAmount
  ),
  selectToAmount: createSelector(
    SwapPageDomains.toAmount,
    (toAmount) => toAmount
  ),
};
