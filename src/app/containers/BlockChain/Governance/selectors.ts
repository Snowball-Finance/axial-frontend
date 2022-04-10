import { createSelector } from "@reduxjs/toolkit";
import { BNToFloat } from "common/format";
import { env } from "environment";
import { ethers } from "ethers";
import { RootState } from "store/types";
import { EthersDomains } from "../Ethers/selectors";
import { Web3Domains } from "../Web3/selectors";
import { initialState } from "./slice";
import { ContainerState, ProposalFilters, ProposalStates } from "./types";

export const GovernanceDomains = {
  selectGovernanceDomain: (state: RootState) =>
    state.governance || initialState,
  selectSelectedProposalFilterDomain: (state: RootState) =>
    state.governance?.selectedProposalFilter ||
    initialState.selectedProposalFilter,
  selectProposalsDomain: (state: RootState) =>
    state.governance?.proposals || [],
  selectSelectedProposalDomain: (state: RootState) =>
    state.governance?.selectedProposal || initialState.selectedProposal,
  selectIsLoadingProposalsDomain: (state: RootState) =>
    state.governance?.isLoadingProposals || initialState.isLoadingProposals,
  selectIsSubmittingNewProposalsDomain: (state: RootState) =>
    state.governance?.isSubmittingNewProposal ||
    initialState.isSubmittingNewProposal,
  selectIsVotingForDomain: (state: RootState) =>
    state.governance?.isVotingFor || initialState.isVotingFor,
  selectIsVotingAgainstDomain: (state: RootState) =>
    state.governance?.isVotingAgainst || initialState.isVotingAgainst,
  selectIsNewProposalFormOpenDomain: (state: RootState) =>
    state.governance?.isNewProposalFormOpen ||
    initialState.isNewProposalFormOpen,
  selectSyncedProposalsWithBlockchainDomain: (state: RootState) =>
    state.governance?.syncedProposalsWithBlockchain || false,
  selectNewProposalFieldsDomain: (state: RootState) =>
    state.governance?.newProposalFields || {
      ...initialState.newProposalFields,
      error: { ...initialState.newProposalFields.error },
    },
  selectIsLoadingReceiptDomain: (state: RootState) =>
    state.governance?.iseGettingReceipt || initialState.iseGettingReceipt,
  selectReceiptDomain: (state: RootState) =>
    state.governance?.receipt || { ...initialState.receipt },
  selectGovernanceTokenABIDomain: (state: RootState) =>
    state.governance?.governanceTokenABI || undefined,
  selectGovernanceTokenContractDomain: (state: RootState) =>
    state.governance?.governanceTokenContract || undefined,
  selectGovernanceABIDomain: (state: RootState) =>
    state.governance?.governanceABI || undefined,
};

export const GovernanceSelectors = {
  selectSyncedProposalsWithBlockChain: createSelector(
    GovernanceDomains.selectSyncedProposalsWithBlockchainDomain,
    (syncedProposalsWithBlockchain) => syncedProposalsWithBlockchain
  ),
  selectGovernance: createSelector(
    GovernanceDomains.selectGovernanceDomain,
    (governanceState) => governanceState
  ),
  selectIsLoadingGovernanceTokenBalance: createSelector(
    GovernanceDomains.selectGovernanceDomain,
    (governanceState) => governanceState.isGettingGovernanceTokenBalance
  ),
  selectGovernanceTokenBalance: createSelector(
    GovernanceDomains.selectGovernanceDomain,
    (governanceState) => governanceState.governanceTokenBalance
  ),
  accruingTokenBalance: createSelector(
    GovernanceDomains.selectGovernanceDomain,
    (governanceState) => governanceState.accruingTokenBalance
  ),
  mainTokenAmountStakedForAccruing: createSelector(
    GovernanceDomains.selectGovernanceDomain,
    (governanceState) => governanceState.totalMainTokenStakedForAccruingToken
  ),
  totalAccruedToken: createSelector(
    GovernanceDomains.selectGovernanceDomain,
    (governanceState) => governanceState.totalAccruedToken
  ),
  selectFloatedGovernanceTokenBalance: createSelector(
    GovernanceDomains.selectGovernanceDomain,
    (governanceState) => {
      if (governanceState.governanceTokenBalance) {
        const floated =
          BNToFloat(governanceState.governanceTokenBalance, 18)?.toFixed(3) ||
          "0.000";
        return floated;
      }
    }
  ),
  selectIsLoadingReceipt: createSelector(
    GovernanceDomains.selectIsLoadingReceiptDomain,
    (isLoadingReceipt) => isLoadingReceipt
  ),
  selectReceipt: createSelector(
    GovernanceDomains.selectReceiptDomain,
    (receipt) => receipt
  ),
  selectSelectedProposalFilter: createSelector(
    GovernanceDomains.selectSelectedProposalFilterDomain,
    (filter) => filter
  ),
  selectSelectedProposal: createSelector(
    GovernanceDomains.selectSelectedProposalDomain,
    (proposal) => proposal
  ),
  selectProposals: createSelector(
    GovernanceDomains.selectProposalsDomain,
    (proposals) => proposals
  ),
  selectNewProposalFields: createSelector(
    GovernanceDomains.selectNewProposalFieldsDomain,
    (fields) => fields
  ),
  selectNewProposalField: (field: keyof ContainerState["newProposalFields"]) =>
    createSelector(
      GovernanceDomains.selectNewProposalFieldsDomain,
      (fields) => fields[field]
    ),
  selectIsVotingFor: createSelector(
    GovernanceDomains.selectIsVotingForDomain,
    (isVotingFor) => isVotingFor
  ),
  selectIsVotingAgainst: createSelector(
    GovernanceDomains.selectIsVotingAgainstDomain,
    (isVotingAgainst) => isVotingAgainst
  ),
  selectIsNewProposalFormOpen: createSelector(
    GovernanceDomains.selectIsNewProposalFormOpenDomain,
    (isNewProposalFormOpen) => isNewProposalFormOpen
  ),
  selectIsLoadingProposals: createSelector(
    GovernanceDomains.selectIsLoadingProposalsDomain,
    (isLoading) => isLoading
  ),
  selectIsSubmittingNewProposal: createSelector(
    GovernanceDomains.selectIsSubmittingNewProposalsDomain,
    (isLoading) => isLoading
  ),
  selectFilteredProposalsProposals: createSelector(
    [
      GovernanceDomains.selectProposalsDomain,
      GovernanceDomains.selectSelectedProposalFilterDomain,
    ],
    (proposals, filters) => {
      let list = [...proposals];
      if (filters === ProposalFilters.Active) {
        list = list.filter((p) => p.state === ProposalStates.active);
      }
      return list;
    }
  ),
  selectCanAddNewProposal: createSelector(
    [GovernanceDomains.selectGovernanceDomain, Web3Domains.selectAccountDomain],
    (governance, account) => {
      if (governance.governanceTokenBalance) {
        const floatedBalance = BNToFloat(
          governance.governanceTokenBalance,
          18
        )?.toFixed(3);
        if (
          Number(floatedBalance) > Number(env.MINIMUM_TOKEN_FOR_VOTING) &&
          account
        ) {
          return true;
        }
      }
      return false;
    }
  ),
  selectGovernanceTokenContract: createSelector(
    [
      EthersDomains.selectPrivateProviderDomain,
      Web3Domains.selectLibraryDomain,
      GovernanceDomains.selectGovernanceTokenABIDomain,
    ],
    (provider, library, governanceTokenABI) => {
      if (provider && library && governanceTokenABI) {
        if (!env.GOVERNANCE_TOKEN_CONTRACT_ADDRESS) {
          throw new Error(
            "Governance Token Contract Address is not defined in environment, please define REACT_APP_GOVERNANCE_TOKEN_CONTRACT_ADDRESS"
          );
        }
        return new ethers.Contract(
          env.GOVERNANCE_TOKEN_CONTRACT_ADDRESS,
          governanceTokenABI,
          provider
        );
      }
      return undefined;
    }
  ),
};
