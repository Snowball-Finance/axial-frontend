import { createSelector } from "@reduxjs/toolkit";
import { initialState } from "store/slice";
import { RootState } from "store/types";

export const GlobalDomains = {
  root: (state: RootState) => state,
  isGettingTokenPrices: (state: RootState) =>
    state?.global?.isGettingTokenPrices || false,
  tokenPricesUSD: (state: RootState) => state?.global?.tokenPricesUSD || {},
  gasPrice: (state: RootState) => state?.global?.gasPrice || undefined,
  tokens: (state: RootState) => state?.global?.tokens || undefined,
  infiniteApproval: (state: RootState) =>
    state.global?.infiniteApproval || initialState.infiniteApproval,
  tokensInQueueToApprove: (state: RootState) =>
    state.global?.tokensInQueueToApprove || initialState.tokensInQueueToApprove,
  selectedSlippage: (state: RootState) =>
    state.global?.selectedSlippage || initialState.selectedSlippage,
  customSlippage: (state: RootState) => state.global?.customSlippage,
  isAdvancedOptionsOpen: (state: RootState) =>
    state.global?.isAdvancedOptionsOpen,
};

export const globalSelectors = {
  root: createSelector([GlobalDomains.root], (root) => root),
  isGettingTokenPrices: createSelector(
    [GlobalDomains.isGettingTokenPrices],
    (isGettingTokenPrices) => isGettingTokenPrices
  ),
  tokenPricesUSD: createSelector(
    [GlobalDomains.tokenPricesUSD],
    (tokenPricesUSD) => tokenPricesUSD
  ),
  tokenPriceInUSD: (token: string) =>
    createSelector(GlobalDomains.tokenPricesUSD, (prices) => {
      return prices[token] || 0;
    }),
  gasPrice: createSelector([GlobalDomains.gasPrice], (gasPrice) => gasPrice),
  tokens: createSelector([GlobalDomains.tokens], (tokens) => tokens),
  infiniteApproval: createSelector(
    [GlobalDomains.infiniteApproval],
    (infiniteApproval) => infiniteApproval
  ),
  tokensInQueueToApprove: createSelector(
    GlobalDomains.tokensInQueueToApprove,
    (tokensInQueueToApprove) => tokensInQueueToApprove
  ),
  selectedSlippage: createSelector(
    [GlobalDomains.selectedSlippage],
    (slippage) => slippage
  ),
  customSlippage: createSelector(
    [GlobalDomains.customSlippage],
    (customSlippage) => customSlippage
  ),
  isAdvancedOptionsOpen: createSelector(
    [GlobalDomains.isAdvancedOptionsOpen],
    (isAdvancedOptionsOpen) => isAdvancedOptionsOpen
  ),
};
