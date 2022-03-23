import { createSelector } from "@reduxjs/toolkit";
import { RootState } from "store/types";

import { initialState } from "./slice";

export const Web3Domains = {
  selectWeb3Domain: (state: RootState) => state.web3 || initialState,
  selectWeb3ErrorDomain: (state: RootState) =>
    state.web3?.error || initialState.error,
  selectChainIDDomain: (state: RootState) => state.web3?.chainId || undefined,
  selectAccountDomain: (state: RootState) => state.web3?.account || undefined,
  selectLibraryDomain: (state: RootState) => state.web3?.library || undefined,
  selectNetworkLibraryDomain: (state: RootState) =>
    state.web3?.networkLibrary || undefined,
};

export const Web3Selectors = {
  selectWeb3Error: createSelector(
    Web3Domains.selectWeb3ErrorDomain,
    (error) => error
  ),
  selectChainID: createSelector(
    Web3Domains.selectChainIDDomain,
    (chainId) => chainId
  ),
  selectWeb3: createSelector(
    Web3Domains.selectWeb3Domain,
    (web3State) => web3State
  ),
  selectAccount: createSelector(
    Web3Domains.selectAccountDomain,
    (account) => account
  ),
  selectIsConnectingToWallet: createSelector(
    Web3Domains.selectWeb3Domain,
    (web3State) => web3State.isConnectingToWallet
  ),
  selectIsActive: createSelector(
    Web3Domains.selectWeb3Domain,
    (web3State) => web3State.active
  ),
  selectConnector: createSelector(
    Web3Domains.selectWeb3Domain,
    (web3State) => web3State.connector
  ),
  selectLibrary: createSelector(
    Web3Domains.selectWeb3Domain,
    (web3State) => web3State.library
  ),
  selectNetworkLibrary: createSelector(
    Web3Domains.selectWeb3Domain,
    (web3State) => web3State.networkLibrary
  ),
  selectActivate: createSelector(
    Web3Domains.selectWeb3Domain,
    (web3State) => web3State.activate
  ),
  selectDeactivate: createSelector(
    Web3Domains.selectWeb3Domain,
    (web3State) => web3State.deactivate
  ),
};
