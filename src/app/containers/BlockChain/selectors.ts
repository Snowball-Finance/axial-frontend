import { createSelector } from '@reduxjs/toolkit';
import { selectPrivateProviderDomain } from "./Ethers/selectors";
import { selectLibraryDomain } from "./Web3/selectors";
import { initialState } from './slice';
import { ethers } from 'ethers'
import { CONTRACTS } from "config";
import SNOWBALL_ABI from 'libs/abis/snowball.json'
import SNOWCONE_ABI from 'libs/abis/snowcone.json'
import GAUGE_PROXY_ABI from 'libs/abis/gauge-proxy.json'
import { RootState } from "store/types";

const selectDomain = (state: RootState) => state.blockChain || initialState;
export const selectContractsDomain = (state: RootState) => state.blockChain?.contracts || { ...initialState.contracts };
export const selectPricesDomain = (state: RootState) => state.blockChain?.prices || { ...initialState.prices };

export const selectBlockChain = createSelector(
  [selectDomain],
  blockChainState => blockChainState,
);

export const selectPrices = createSelector(
  [selectPricesDomain],
  prices => prices,
);

export const selectSnobBalance = createSelector(
  [selectDomain],
  blockChainState => blockChainState.snowballBalance,
);

export const selectTotalSnowConeSupply = createSelector(
  [selectDomain],
  blockChainState => blockChainState.totalSnowConeSupply,
);

export const selectIsLoadingSnobBalance = createSelector(
  [selectDomain],
  blockChainState => blockChainState.isGettingSnobBalance,
);

export const selectIsLoadingSnowConeBalance = createSelector(
  [selectDomain],
  blockChainState => blockChainState.isGettingSnowConeBalance,
);

export const selectSnowConeBalance = createSelector(
  [selectDomain],
  blockChainState => blockChainState.snowConeBalance,
);

export const selectContracts = createSelector(
  [selectDomain],
  blockChainState => blockChainState.contracts,
);

export const selectCalculatedContracts = createSelector(
  [selectPrivateProviderDomain, selectLibraryDomain],
  (provider, library) => {
    if (provider && library) {
      return ({
        snob: new ethers.Contract(CONTRACTS.SNOWBALL, SNOWBALL_ABI, provider),
        //@ts-ignore
        snowCone: new ethers.Contract(CONTRACTS.SNOWCONE, SNOWCONE_ABI, provider),
        ...(CONTRACTS.GAUGE_PROXYV2 && { gaugeProxy: new ethers.Contract(CONTRACTS.GAUGE_PROXYV2, GAUGE_PROXY_ABI, provider) })
      })
    }
    return {
      snob: undefined,
      snowCone: undefined,
      gaugeProxy: undefined
    }
  }
)