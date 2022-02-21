import { createSelector } from "@reduxjs/toolkit";
import { RootState } from "store/types";

export const GlobalDomains = {
  root: (state: RootState) => state,
  isGettingTokenPrices: (state: RootState) =>
    state?.global?.isGettingTokenPrices || false,
  tokenPricesUSD: (state: RootState) => state?.global?.tokenPricesUSD || {},
  gasPrice: (state: RootState) => state?.global?.gasPrice || undefined,
  tokens: (state: RootState) => state?.global?.tokens || undefined,
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
  gasPrice: createSelector([GlobalDomains.gasPrice], (gasPrice) => gasPrice),
  tokens: createSelector([GlobalDomains.tokens], (tokens) => tokens),
};
