import { createSelector } from "@reduxjs/toolkit";
import { RootState } from "store/types";
import { initialState } from "./slice";
import { ContainerState } from "./types";

export const GovernancePageDomains = {
  GovernancePage: (state: RootState) => state.governancePage || initialState,
  isVoteAllocationSelectionOpen: (state: RootState) =>
    state.governancePage?.isVoteAllocationSelectionOpen ||
    initialState.isVoteAllocationSelectionOpen,
  selectedVoteAllocationPairs: (state: RootState) =>
    state.governancePage?.selectedGauges || { ...initialState.selectedGauges },
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
  currentExecutionContext: (state: RootState) =>
    state.governancePage?.currentExecutionContext || {
      ...initialState.currentExecutionContext,
    },
  submittedExecutionContexts: (state: RootState) =>
    state.governancePage?.submittedExecutionContexts || [],
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
  currentExecutionContext: createSelector(
    GovernancePageDomains.currentExecutionContext,
    (currentExecutionContext) => currentExecutionContext
  ),
  submittedExecutionContexts: createSelector(
    GovernancePageDomains.submittedExecutionContexts,
    (submittedExecutionContexts) => submittedExecutionContexts
  ),
  canSubmitNewExecutionContext: createSelector(
    GovernancePageDomains.currentExecutionContext,
    (currentExecutionContext) => {
      return (
        currentExecutionContext.description &&
        currentExecutionContext.contractAddress &&
        currentExecutionContext.data
      );
    }
  ),
};
