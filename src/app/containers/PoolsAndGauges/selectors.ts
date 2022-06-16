import { createSelector } from "@reduxjs/toolkit";
import { GlobalDomains } from "app/appSelectors";
import { BNToFloat } from "common/format";
import { env } from "environment";
import { Contract, ethers } from "ethers";
import { multiply } from "precise-math";
import { RootState } from "store/types";
import { BlockChainDomains } from "../BlockChain/selectors";
import { Web3Domains } from "../BlockChain/Web3/selectors";
import { Pools } from "../Rewards/types";

import { initialState } from "./slice";
import { HarvestableToken } from "./types";

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
  harvestableTokensOfPool: (key?: Pools) =>
    createSelector(
      PoolsAndGaugesDomains.pools,
      GlobalDomains.tokens,
      GlobalDomains.tokenPricesUSD,
      (pools, tokens, prices) => {
        const returnArray: HarvestableToken[] = [];
        if (!key) return returnArray;
        const pool = Object.values(pools).find(
          (pool) => pool.symbol.toLowerCase() === key.toLowerCase()
        );
        if (!pool || !pool.gauge || !tokens) return returnArray;
        const harvestables = Object.keys(pool.gauge.harvestable);
        const tokensArray = Object.values(tokens);
        for (const harvestableAddress of harvestables) {
          for (let i = 0; i < tokensArray.length; i++) {
            const token = tokensArray[i];
            const amount =
              BNToFloat(pool.gauge.harvestable[harvestableAddress] || 0, 18) ||
              0;
            let equivalentAmount = 0;
            if (prices[token.symbol]) {
              equivalentAmount = multiply(amount, prices[token.symbol]);
            }
            if (
              token.address.toLowerCase() === harvestableAddress.toLowerCase()
            ) {
              const lastRewardAPR = pool.last_rewards_apr;
              let apr = "0";
              for (const tokenApr of lastRewardAPR) {
                if (tokenApr[0].toLowerCase() === token.address.toLowerCase()) {
                  apr = tokenApr[1];
                }
              }

              returnArray.push({
                token,
                amountToHarvest: amount,
                amountInUsd: equivalentAmount,
                apr,
              });
            }
          }
        }
        return returnArray;
      }
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
  [Web3Domains.selectLibraryDomain, selectGaugeProxyABIDomain],
  (library, abi) => {
    if (!env.GAUGE_PROXY_ADDRESS) {
      throw new Error(
        "REACT_APP_GAUGE_PROXY_ADDRESS is not defined in environment"
      );
    }
    if (library && abi) {
      if (!contract) {
        contract = new ethers.Contract(
          env.GAUGE_PROXY_ADDRESS,
          abi,
          library.getSigner()
        );
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
    BlockChainDomains.selectPricesDomain,
  ],
  (account, pools, prices) => {
    return account && pools.length > 0 && !!prices.mainToken;
  }
);
