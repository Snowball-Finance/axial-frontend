import { createSelector } from "@reduxjs/toolkit";

import { RootState } from "store/types";
import { initialState } from "./slice";

export const SwapDomains = {
  mainDomain: (state: RootState) => state.swap || initialState,
  swapRouterABI: (state: RootState) =>
    state.swap?.swapRouterABI || initialState.swapRouterABI,
  swapRouterAddress: (state: RootState) =>
    state.swap?.swapRouterAddress || initialState.swapRouterAddress,
  swapTokens: (state: RootState) => state.swap?.tokens || initialState.tokens,
  isGettingBestPath: (state: RootState) =>
    state.swap?.isGettingBestPath || initialState.isGettingBestPath,
  bestPath: (state: RootState) => state.swap?.bestPath || initialState.bestPath,
  isSwapping: (state: RootState) =>
    state.swap?.isSwapping || initialState.isSwapping,
};

export const SwapSelectors = {
  selectSwapState: createSelector([SwapDomains.mainDomain], (state) => state),
  selectSwapRouterABI: createSelector(
    [SwapDomains.swapRouterABI],
    (abi) => abi
  ),
  selectSwapRouterAddress: createSelector(
    [SwapDomains.swapRouterAddress],
    (address) => address
  ),
  selectIsGettingBestPath: createSelector(
    [SwapDomains.isGettingBestPath],
    (isGettingBestPath) => isGettingBestPath
  ),
  selectBestPath: createSelector(
    [SwapDomains.bestPath],
    (bestPath) => bestPath
  ),
  selectIsSwapping: createSelector(
    [SwapDomains.isSwapping],
    (isSwapping) => isSwapping
  ),
  selectSwapTokens: createSelector(
    [SwapDomains.swapTokens],
    (tokens) => tokens
  ),
};
