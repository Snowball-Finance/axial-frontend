import { createSelector } from "@reduxjs/toolkit";

import { RootState } from "store/types";
import { initialState } from "./slice";

export const SwapDomains = {
  mainDomain: (state: RootState) => state.swap || initialState,
  aggregatorABI: (state: RootState) =>
    state.swap?.aggregatorABI || initialState.aggregatorABI,
  aggregatorAddress: (state: RootState) =>
    state.swap?.aggregatorAddress || initialState.aggregatorAddress,
  swapTokens: (state: RootState) => state.swap?.tokens || initialState.tokens,
  isGettingBestPath: (state: RootState) =>
    state.swap?.isGettingBestPath || initialState.isGettingBestPath,
  bestPath: (state: RootState) => state.swap?.bestPath || initialState.bestPath,
  isSwapping: (state: RootState) =>
    state.swap?.isSwapping || initialState.isSwapping,
  isApproving: (state: RootState) =>
    state.swap?.isApproving || initialState.isApproving,
  isTokenApproved: (state: RootState) =>
    state.swap?.isTokenApproved || initialState.isTokenApproved,
};

export const SwapSelectors = {
  selectSwapState: createSelector([SwapDomains.mainDomain], (state) => state),
  aggregatorABI: createSelector(
    [SwapDomains.aggregatorABI],
    (abi) => abi
  ),
  aggregatorAddress: createSelector(
    [SwapDomains.aggregatorAddress],
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
  selectIsApproving: createSelector(
    [SwapDomains.isApproving],
    (isApproving) => isApproving
  ),
  selectIsTokenApproved: createSelector(
    [SwapDomains.isTokenApproved],
    (isTokenApproved) => isTokenApproved
  ),
};
