import { createSelector } from "@reduxjs/toolkit";

import { ethers } from "ethers";
import { env } from "../../../environment";
import { RootState } from "../../../store/types";
import { selectPrivateProviderDomain } from "../Ethers/selectors";
import { selectAccountDomain, selectLibraryDomain } from "../Web3/selectors";

import { initialState } from "./slice";
import { ContainerState, ProposalFilters, ProposalStates } from "./types";

const selectGovernanceDomain = (state: RootState) =>
  state.governance || initialState;
const selectSelectedProposalFilterDomain = (state: RootState) =>
  state.governance?.selectedProposalFilter ||
  initialState.selectedProposalFilter;
export const selectProposalsDomain = (state: RootState) =>
  state.governance?.proposals || [];
const selectSelectedProposalDomain = (state: RootState) =>
  state.governance?.selectedProposal || initialState.selectedProposal;
const selectIsLoadingProposalsDomain = (state: RootState) =>
  state.governance?.isLoadingProposals || initialState.isLoadingProposals;
const selectIsSubmittingNewProposalsDomain = (state: RootState) =>
  state.governance?.isSubmittingNewProposal ||
  initialState.isSubmittingNewProposal;
const selectIsVotingForDomain = (state: RootState) =>
  state.governance?.isVotingFor || initialState.isVotingFor;
const selectIsVotingAgainstDomain = (state: RootState) =>
  state.governance?.isVotingAgainst || initialState.isVotingAgainst;
const selectIsNewProposalFormOpenDomain = (state: RootState) =>
  state.governance?.isNewProposalFormOpen || initialState.isNewProposalFormOpen;
const selectSyncedProposalsWithBlockchainDomain = (state: RootState) =>
  state.governance?.syncedProposalsWithBlockchain || false;

export const selectSyncedProposalsWithBlockChain = createSelector(
  selectSyncedProposalsWithBlockchainDomain,
  (syncedProposalsWithBlockchain) => syncedProposalsWithBlockchain
);

export const selectNewProposalFieldsDomain = (state: RootState) =>
  state.governance?.newProposalFields || {
    ...initialState.newProposalFields,
    error: { ...initialState.newProposalFields.error },
  };
const selectIsLoadingReceiptDomain = (state: RootState) =>
  state.governance?.iseGettingReceipt || initialState.iseGettingReceipt;
const selectReceiptDomain = (state: RootState) =>
  state.governance?.receipt || { ...initialState.receipt };
export const selectGovernanceTokenABIDomain = (state: RootState) =>
  state.governance?.governanceTokenABI || undefined;
export const selectGovernanceTokenContractDomain = (state: RootState) =>
  state.governance?.governanceTokenContract || undefined;

export const selectGovernanceABIDomain = (state: RootState) =>
  state.governance?.governanceABI || undefined;

export const selectGovernance = createSelector(
  [selectGovernanceDomain],
  (governanceState) => governanceState
);
export const selectTotalGovernanceTokenSupply = createSelector(
  [selectGovernanceDomain],
  (blockChainState) => blockChainState.totalGovernanceTokenSupply
);
export const selectIsLoadingGovernanceTokenBalance = createSelector(
  [selectGovernanceDomain],
  (blockChainState) => blockChainState.isGettingGovernanceTokenBalance
);

export const selectGovernanceTokenBalance = createSelector(
  [selectGovernanceDomain],
  (blockChainState) => blockChainState.governanceTokenBalance
);
export const selectIsLoadingReceipt = createSelector(
  [selectIsLoadingReceiptDomain],
  (isLoadingReceipt) => isLoadingReceipt
);

export const selectReceipt = createSelector(
  [selectReceiptDomain],
  (receipt) => receipt
);

export const selectSelectedProposalFilter = createSelector(
  [selectSelectedProposalFilterDomain],
  (filter) => filter
);

export const selectSelectedProposal = createSelector(
  [selectSelectedProposalDomain],
  (proposal) => proposal
);

export const selectProposals = createSelector(
  [selectProposalsDomain],
  (proposals) => proposals
);

export const selectNewProposalFields = createSelector(
  [selectNewProposalFieldsDomain],
  (fields) => fields
);

export const selectNewProposalField = (
  field: keyof ContainerState["newProposalFields"]
) => createSelector([selectNewProposalFieldsDomain], (fields) => fields[field]);

export const selectIsVotingFor = createSelector(
  [selectIsVotingForDomain],
  (isVotingFor) => isVotingFor
);
export const selectIsVotingAgainst = createSelector(
  [selectIsVotingAgainstDomain],
  (isVotingAgainst) => isVotingAgainst
);
export const selectIsNewProposalFormOpen = createSelector(
  [selectIsNewProposalFormOpenDomain],
  (isNewProposalFormOpen) => isNewProposalFormOpen
);

export const selectIsLoadingProposals = createSelector(
  [selectIsLoadingProposalsDomain],
  (isLoading) => isLoading
);

export const selectIsSubmittingNewProposal = createSelector(
  [selectIsSubmittingNewProposalsDomain],
  (isLoading) => isLoading
);

export const selectFilteredProposalsProposals = createSelector(
  [selectProposalsDomain, selectSelectedProposalFilterDomain],
  (proposals, filters) => {
    let list = [...proposals];
    if (filters === ProposalFilters.Active) {
      list = list.filter((p) => p.state === ProposalStates.active);
    }
    return list;
  }
);

export const selectCanAddNewProposal = createSelector(
  [selectGovernanceDomain, selectAccountDomain],
  (governance, account) => {
    if (
      governance.governanceTokenBalance &&
      governance.governanceTokenBalance.toNumber() >
        Number(env.MINIMUM_TOKEN_FOR_VOTING) &&
      account
    ) {
      return true;
    }
    return false;
  }
);

export const selectGovernanceTokenContract = createSelector(
  [
    selectPrivateProviderDomain,
    selectLibraryDomain,
    selectGovernanceTokenABIDomain,
  ],
  (provider, library, governanceABI) => {
    if (provider && library && governanceABI) {
      if (!env.GOVERNANCE_TOKEN_CONTRACT_ADDRESS) {
        throw new Error(
          "Governance Token Contract Address is not defined in environment, please define REACT_APP_GOVERNANCE_TOKEN_CONTRACT_ADDRESS"
        );
      }
      return new ethers.Contract(
        env.GOVERNANCE_TOKEN_CONTRACT_ADDRESS,
        governanceABI,
        provider
      );
    }
    return undefined;
  }
);
