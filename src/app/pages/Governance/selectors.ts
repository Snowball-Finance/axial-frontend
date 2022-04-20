import { createSelector } from "@reduxjs/toolkit";
import {
  selectGaugesDomain,
  selectPoolProvidersDomain,
} from "app/containers/PoolsAndGauges/selectors";
import { GaugeItem } from "app/containers/PoolsAndGauges/types";

import { RootState } from "store/types";
import { initialState } from "./slice";
import { ContainerState, SelectablePoolProvider } from "./types";

export const GovernancePageDomains = {
  GovernancePage: (state: RootState) => state.governancePage || initialState,
  isVoteAllocationSelectionOpen: (state: RootState) =>
    state.governancePage?.isVoteAllocationSelectionOpen ||
    initialState.isVoteAllocationSelectionOpen,
  selectedVoteAllocationPairs: (state: RootState) =>
    state.governancePage?.selectedPairs || { ...initialState.selectedPairs },
  pairSearchInput: (state: RootState) =>
    state.governancePage?.pairSearchInput || initialState.pairSearchInput,
  selectedPoolProviders: (state: RootState) =>
    state.governancePage?.selectedPoolProviders || [
      ...initialState.selectedPoolProviders,
    ],
  isVotingForFarms: (state: RootState) =>
    state.governancePage?.isVotingForFarms || initialState.isVotingForFarms,
    newProposalFields: (state: RootState) =>
    state.governancePage?.newProposalFields || {
      ...initialState.newProposalFields,
      error: { ...initialState.newProposalFields.error },
    },
};

export const GovernancePageSelectors = {
  GovernancePage: createSelector(
    GovernancePageDomains.GovernancePage,
    (governancePageState) => governancePageState
  ),
  selectNewProposalFields: createSelector(
    GovernancePageDomains.newProposalFields,
    (fields) => fields
  ),
  selectNewProposalField: (field: keyof ContainerState["newProposalFields"]) =>
    createSelector(
      GovernancePageDomains.newProposalFields,
      (fields) => fields[field]
    ),
  isVotingForFarms: createSelector(
    GovernancePageDomains.isVotingForFarms,
    (isVotingForFarms) => isVotingForFarms
  ),
  pairSearchInputValue: createSelector(
    GovernancePageDomains.pairSearchInput,
    (v) => v
  ),
  selectedPoolProviders: createSelector(
    GovernancePageDomains.selectedPoolProviders,
    (list) => list
  ),
  poolProviders: createSelector(
    [
      selectPoolProvidersDomain,
      GovernancePageDomains.selectedPoolProviders,
      selectGaugesDomain,
      GovernancePageDomains.pairSearchInput,
      GovernancePageDomains.selectedVoteAllocationPairs,
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
  ),
  selectedVoteAllocationPairsObj: createSelector(
    GovernancePageDomains.selectedVoteAllocationPairs,
    (selectedVoteAllocationPairs) => selectedVoteAllocationPairs
  ),
  selectedVoteAllocationPairsArray: createSelector(
    GovernancePageDomains.selectedVoteAllocationPairs,
    (selectedVoteAllocationPairs) => {
      return Object.values(selectedVoteAllocationPairs);
    }
  ),
  selectedVoteAllocationPair: (address: string) =>
    createSelector(
      GovernancePageDomains.selectedVoteAllocationPairs,
      (pairsObj) => pairsObj[address]
    ),
  isVoteAllocationSelectionOpen: createSelector(
    GovernancePageDomains.isVoteAllocationSelectionOpen,
    (isOpen) => isOpen
  ),
};
