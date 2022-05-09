import { createSelector } from "@reduxjs/toolkit";
import { RootState } from "store/types";
import { initialState } from "./slice";
import { ContainerState } from "./types";

export const GovernancePageDomains = {
  GovernancePage: (state: RootState) => state.governancePage || initialState,
  isVoteAllocationSelectionOpen: (state: RootState) =>
    state.governancePage?.isVoteAllocationSelectionOpen ||
    initialState.isVoteAllocationSelectionOpen,
  selectedVoteAllocationGauges: (state: RootState) =>
    state.governancePage?.selectedGauges || { ...initialState.selectedGauges },
  pairSearchInput: (state: RootState) =>
    state.governancePage?.pairSearchInput || initialState.pairSearchInput,
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
  isModalOpen: (state: RootState) =>
    state.governancePage?.isModalOpen || initialState.isModalOpen,
  selectedProposal: (state: RootState) =>
    state.governancePage?.selectedProposal || initialState.selectedProposal,
  isVoteAllocationModalOpen: (state: RootState) =>
    state.governancePage?.isVoteAllocationModalOpen ||
    initialState.isVoteAllocationModalOpen,
  allocationSortingData: (state: RootState) =>
    state.governancePage?.allocationSortingData ||
    initialState.allocationSortingData,
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
  selectedVoteAllocationGaugesObj: createSelector(
    GovernancePageDomains.selectedVoteAllocationGauges,
    (selectedVoteAllocationPairs) => selectedVoteAllocationPairs
  ),
  selectedVoteAllocationGaugesArray: createSelector(
    GovernancePageDomains.selectedVoteAllocationGauges,
    (selectedVoteAllocationGauges) => {
      return Object.values(selectedVoteAllocationGauges);
    }
  ),
  selectedVoteAllocationPair: (address: string) =>
    createSelector(
      GovernancePageDomains.selectedVoteAllocationGauges,
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
  selectIsModalOpen: createSelector(
    GovernancePageDomains.isModalOpen,
    (isModalOpen) => isModalOpen
  ),
  selectedProposal: createSelector(
    GovernancePageDomains.selectedProposal,
    (selectedProposal) => selectedProposal
  ),
  isVoteAllocationModalOpen: createSelector(
    GovernancePageDomains.isVoteAllocationModalOpen,
    (isVoteAllocationModalOpen) => isVoteAllocationModalOpen
  ),
  allocationSortingData: createSelector(
    GovernancePageDomains.allocationSortingData,
    (allocationSortingData) => allocationSortingData
  ),
};
