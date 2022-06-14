import { createSelector } from "@reduxjs/toolkit";
import { initialState } from "./slice";
import { RootState } from "store/types";


export const BlockChainDomains = {
  selectBlockChainDomain: (state: RootState) =>
    state.blockChain || initialState,
  selectMainTokenABIDomain: (state: RootState) =>
    state.blockChain?.mainTokenABI || undefined,
  selectPricesDomain: (state: RootState) =>
    state.blockChain?.prices || { ...initialState.prices },
  selectMainTokenBalanceDomain: (state: RootState) =>
    state.blockChain?.mainTokenBalance || undefined,
  numberOfFailedRetriesForGettingMainTokenBalanceDomain: (state: RootState) =>
    state.blockChain?.numberOfFailedRetriesForGettingMainTokenBalance || 0,
};

export const BlockChainSelectors = {
  selectBlockChain: createSelector(
    BlockChainDomains.selectBlockChainDomain,
    (blockChainState) => blockChainState
  ),
  selectPrices: createSelector(
    BlockChainDomains.selectPricesDomain,
    (prices) => prices
  ),
  selectMainTokenBalance: createSelector(
    BlockChainDomains.selectBlockChainDomain,
    (blockChainState) => blockChainState.mainTokenBalance
  ),
  selectIsLoadingSnobBalance: createSelector(
    BlockChainDomains.selectBlockChainDomain,
    (blockChainState) => blockChainState.isGettingMainTokenBalance
  ),
};
