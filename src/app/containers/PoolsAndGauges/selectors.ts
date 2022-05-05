import { createSelector } from "@reduxjs/toolkit";
import { env } from "environment";
import { Contract, ethers } from "ethers";

import { RootState } from "store/types";
import { EthersDomains } from "../BlockChain/Ethers/selectors";
import { BlockChainDomains } from "../BlockChain/selectors";
import { Web3Domains } from "../BlockChain/Web3/selectors";

import { initialState } from "./slice";

export const PoolsAndGaugesDomains = {
  root: (state: RootState) => state.poolsAndGauges || initialState,
  lastInfo: (state: RootState) =>
    state.poolsAndGauges?.lastInfo || initialState.lastInfo,
  gotUserPools: (state: RootState) =>
    state.poolsAndGauges?.gotUserPools || initialState.gotUserPools,
  isLoadingUserPoolsAndGauges: (state: RootState) =>
    state.poolsAndGauges?.isLoadingUserPoolsAndGauges ||
    initialState.isLoadingUserPoolsAndGauges,
  pools: (state: RootState) =>
    state.poolsAndGauges?.pools || initialState.pools,
  gauges: (state: RootState) =>
    state.poolsAndGauges?.gauges || initialState.gauges,
};

export const PoolsAndGaugesSelectors = {
  root: createSelector(
    PoolsAndGaugesDomains.root,
    (poolsAndGaugesState) => poolsAndGaugesState
  ),
  lastInfo: createSelector(
    PoolsAndGaugesDomains.lastInfo,
    (lastInfoState) => lastInfoState
  ),
  gotUserPools: createSelector(
    PoolsAndGaugesDomains.gotUserPools,
    (gotUserPoolsState) => gotUserPoolsState
  ),
  isLoadingUserPoolsAndGauges: createSelector(
    PoolsAndGaugesDomains.isLoadingUserPoolsAndGauges,
    (isLoadingUserPoolsAndGaugesState) => isLoadingUserPoolsAndGaugesState
  ),
  pools: createSelector(
    PoolsAndGaugesDomains.pools,
    (poolsState) => poolsState
  ),
  poolsArray: createSelector(PoolsAndGaugesDomains.pools, (poolsState) =>
    Object.values(poolsState)
  ),
  gauges: createSelector(
    PoolsAndGaugesDomains.gauges,
    (gaugesState) => gaugesState
  ),
};

const selectDomain = (state: RootState) => state.poolsAndGauges || initialState;
export const selectGaugeProxyABIDomain = (state: RootState) =>
  state.poolsAndGauges?.gaugeProxyABI || undefined;
export const selectGaugeContractDomain = (state: RootState) =>
  state.poolsAndGauges?.gaugeContract || undefined;
export const selectPoolsArrayDomain = (state: RootState) =>
  state.poolsAndGauges?.lastInfo || [];
const selectGotUserPoolsDomain = (state: RootState) =>
  state.poolsAndGauges?.gotUserPools || initialState.gotUserPools;
export const selectIsLoadingUserPoolsAndGaugesDomain = (state: RootState) =>
  state.poolsAndGauges?.isLoadingUserPoolsAndGauges ||
  initialState.isLoadingUserPoolsAndGauges;
export const selectPoolsObjDomain = (state: RootState) =>
  state.poolsAndGauges?.pools || {};
export const selectPoolProvidersDomain = (state: RootState) =>
  state.poolsAndGauges?.poolProviders || { ...initialState.poolProviders };
export const selectGaugesDomain = (state: RootState) =>
  state.poolsAndGauges?.gauges || [...initialState.gauges];
export const selectPoolsAndGaugesLastInfoDomain = (state: RootState) =>
  state.poolsAndGauges?.lastInfo || initialState.lastInfo;

export const selectPoolsAndGaugesLastInfo = createSelector(
  [selectPoolsAndGaugesLastInfoDomain],
  (lastInfo) => lastInfo
);

export const selectPoolsAndGauges = createSelector(
  [selectDomain],
  (poolsAndGaugesState) => poolsAndGaugesState
);

export const selectPoolsArray = createSelector(
  [selectPoolsArrayDomain],
  (pools) => pools
);
let contract: Contract | undefined;
export const selectGaugeContract = createSelector(
  [
    EthersDomains.selectPrivateProviderDomain,
    Web3Domains.selectLibraryDomain,
    selectGaugeProxyABIDomain,
  ],
  (provider, library, abi) => {
    if (!env.GAUGE_PROXY_ADDRESS) {
      throw new Error(
        "REACT_APP_GAUGE_PROXY_ADDRESS is not defined in environment"
      );
    }
    if (provider && library && abi) {
      if (!contract) {
        contract = new ethers.Contract(env.GAUGE_PROXY_ADDRESS, abi, provider);
      }
      return contract;
    }
    return undefined;
  }
);

export const selectIsLoadingUserPoolsAndGauges = createSelector(
  [selectIsLoadingUserPoolsAndGaugesDomain],
  (isLoading) => isLoading
);

export const selectGauges = createSelector(
  [selectGaugesDomain],
  (gauges) => gauges
);

export const selectGotUserPools = createSelector(
  [selectGotUserPoolsDomain],
  (v) => v
);

export const selectIsReadyToGetUserData = createSelector(
  [
    Web3Domains.selectAccountDomain,
    selectPoolsArrayDomain,
    EthersDomains.selectPrivateProviderDomain,
    BlockChainDomains.selectPricesDomain,
  ],
  (account, pools, provider, prices) => {
    return account && pools.length > 0 && provider && !!prices.mainToken;
  }
);
