import { createSelector } from "@reduxjs/toolkit";
import { RootState } from "store/types";

import { initialState } from "./slice";

export const EthersDomains = {
  selectDomain: (state: RootState) => state.ethers || initialState,
  selectPrivateProviderDomain: (state: RootState) =>
    state.ethers?.privateProvider || undefined,
};

export const EthersSelectors = {
  selectEthers: createSelector(
    EthersDomains.selectDomain,
    (ethersState) => ethersState
  ),
  selectPrivateProvider: createSelector(
    EthersDomains.selectPrivateProviderDomain,
    (privateProvider) => privateProvider
  ),
};
