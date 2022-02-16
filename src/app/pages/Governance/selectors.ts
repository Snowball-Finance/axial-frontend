import { createSelector } from "@reduxjs/toolkit";
import {
  selectGaugesDomain,
  selectPoolProvidersDomain,
} from "app/containers/PoolsAndGauges/selectors";
import { GaugeItem } from "app/containers/PoolsAndGauges/types";

import { RootState } from "store/types";
import { initialState } from "./slice";
import { SelectablePoolProvider } from "./types";

const selectGovernancePageDomain = (state: RootState) =>
  state.governancePage || initialState;
const setIsVoteAllocationSelectionOpenDomain = (state: RootState) =>
  state.governancePage?.isVoteAllocationSelectionOpen ||
  initialState.isVoteAllocationSelectionOpen;
export const selectSelectedVoteAllocationPairsDomain = (state: RootState) =>
  state.governancePage?.selectedPairs || { ...initialState.selectedPairs };
const selectPairSearchInputDomain = (state: RootState) =>
  state.governancePage?.pairSearchInput || initialState.pairSearchInput;
const selectSelectedPoolProvidersDomain = (state: RootState) =>
  state.governancePage?.selectedPoolProviders || [
    ...initialState.selectedPoolProviders,
  ];
const isVotingForFarmsDomain = (state: RootState) =>
  state.governancePage?.isVotingForFarms || initialState.isVotingForFarms;

export const selectIsVotingForFarms = createSelector(
  [isVotingForFarmsDomain],
  (isVotingForFarms) => isVotingForFarms
);

export const selectPairSearchInputValue = createSelector(
  [selectPairSearchInputDomain],
  (v) => v
);

export const selectedPoolProviders = createSelector(
  [selectSelectedPoolProvidersDomain],
  (list) => list
);

export const selectPoolProviders = createSelector(
  [
    selectPoolProvidersDomain,
    selectSelectedPoolProvidersDomain,
    selectGaugesDomain,
    selectPairSearchInputDomain,
    selectSelectedVoteAllocationPairsDomain,
  ],
  (poolProviders, selectedPoolProviders, gauges, search, selectedPairs) => {
    const gaugesToShow: GaugeItem[] = [];
    //filter gauges bu search
    gauges.forEach((gauge) => {
      if (gauge.poolName.includes(search.toUpperCase())) {
        gaugesToShow.push({
          ...gauge,
          selected: !!selectedPairs[gauge.address],
        });
      }
    });
    const providers: { [key: string]: SelectablePoolProvider } = {};
    //parse providers
    for (const key in poolProviders) {
      if (Object.prototype.hasOwnProperty.call(poolProviders, key)) {
        providers[key] = {
          ...poolProviders[key],
          selected: selectedPoolProviders.includes(key),
          gauges: gaugesToShow.filter((item) => item.source === key),
        };
      }
    }
    //remove provider from list if it doesn't have gauge
    for (const key in providers) {
      if (Object.prototype.hasOwnProperty.call(providers, key)) {
        const element = providers[key];
        if (element.gauges.length === 0) {
          delete providers[key];
        }
      }
    }

    return Object.values(providers);
  }
);

export const selectSelectedVoteAllocationPairsObj = createSelector(
  [selectSelectedVoteAllocationPairsDomain],
  (selectedVoteAllocationPairs) => selectedVoteAllocationPairs
);

export const selectSelectedVoteAllocationPairsArray = createSelector(
  [selectSelectedVoteAllocationPairsDomain],
  (selectedVoteAllocationPairs) => {
    return Object.values(selectedVoteAllocationPairs);
  }
);

export const selectSelectedVoteAllocationPair = (address: string) =>
  createSelector(
    [selectSelectedVoteAllocationPairsDomain],
    (pairsObj) => pairsObj[address]
  );

export const selectIsVoteAllocationSelectionOpen = createSelector(
  [setIsVoteAllocationSelectionOpenDomain],
  (isOpen) => isOpen
);

export const selectGovernancePage = createSelector(
  [selectGovernancePageDomain],
  (governancePageState) => governancePageState
);
