import { createSelector } from "@reduxjs/toolkit";
import { initialState } from "./slice";
import { ethers } from "ethers";
import { RootState } from "store/types";
import { env } from "environment";
import { EthersDomains } from "./Ethers/selectors";
import { Web3Domains } from "./Web3/selectors";

export const BlockChainDomains = {
  selectBlockChainDomain: (state: RootState) =>
    state.blockChain || initialState,
  selectMainTokenABIDomain: (state: RootState) =>
    state.blockChain?.mainTokenABI || undefined,
  selectContractsDomain: (state: RootState) =>
    state.blockChain?.contracts || { ...initialState.contracts },
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
  selectContracts: createSelector(
    BlockChainDomains.selectBlockChainDomain,
    (blockChainState) => blockChainState.contracts
  ),
  selectCalculatedContracts: createSelector(
    [
      EthersDomains.selectPrivateProviderDomain,
      Web3Domains.selectLibraryDomain,
      BlockChainDomains.selectMainTokenABIDomain,
    ],
    (provider, library, mainTokenABI) => {
      if (provider && library && mainTokenABI) {
        return {
          //we checked in index if environment variable exists
          mainTokenContract: new ethers.Contract(
            env.MAIN_TOKEN_ADDRESS || "",
            mainTokenABI,
            provider
          ),
        };
      }
      return {
        mainTokenContract: undefined,
      };
    }
  ),
};
