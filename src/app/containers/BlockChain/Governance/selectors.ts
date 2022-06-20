import { createSelector } from "@reduxjs/toolkit";
import { BNToFloat } from "common/format";
import { env } from "environment";
import { ethers } from "ethers";
import { RootState } from "store/types";
import { EthersDomains } from "../Ethers/selectors";
import { Web3Domains } from "../Web3/selectors";
import { initialState } from "./slice";
import { Proposal, ProposalFilters, ProposalState } from "./types";

export const GovernanceDomains = {
  governance: (state: RootState) => state.governance || initialState,
  governanceTokenBalance: (state: RootState) =>
    state.governance?.governanceTokenBalance ||
    initialState.governanceTokenBalance,
  minimumTokenForNewProposal: (state: RootState) =>
    state.governance?.minimumTokenAmountForNewProposal || 0,
  selectedProposalFilter: (state: RootState) =>
    state.governance?.selectedProposalFilter ||
    initialState.selectedProposalFilter,
  proposals: (state: RootState) => state.governance?.proposals || [],
  selectedProposal: (state: RootState) =>
    state.governance?.selectedProposal || initialState.selectedProposal,
  isLoadingProposals: (state: RootState) =>
    state.governance?.isLoadingProposals || initialState.isLoadingProposals,
  isSubmittingNewProposals: (state: RootState) =>
    state.governance?.isSubmittingNewProposal ||
    initialState.isSubmittingNewProposal,
  selectIsVotingFor: (state: RootState) =>
    state.governance?.isVotingFor || initialState.isVotingFor,

  syncedProposalsWithBlockchain: (state: RootState) =>
    state.governance?.syncedProposalsWithBlockchain || false,

  isLoadingReceipt: (state: RootState) =>
    state.governance?.iseGettingReceipt || initialState.iseGettingReceipt,
  receipt: (state: RootState) =>
    state.governance?.receipt || { ...initialState.receipt },
  governanceTokenABI: (state: RootState) =>
    state.governance?.governanceTokenABI || undefined,
  governanceTokenContract: (state: RootState) =>
    state.governance?.governanceTokenContract || undefined,
  governanceABI: (state: RootState) =>
    state.governance?.governanceABI || undefined,
};

export const GovernanceSelectors = {
  syncedProposalsWithBlockChain: createSelector(
    GovernanceDomains.syncedProposalsWithBlockchain,
    (syncedProposalsWithBlockchain) => syncedProposalsWithBlockchain
  ),
  minimumTokenRequiredForNewProposal: createSelector(
    GovernanceDomains.minimumTokenForNewProposal,
    (minimumTokenForNewProposal) => minimumTokenForNewProposal
  ),
  governance: createSelector(
    GovernanceDomains.governance,
    (governanceState) => governanceState
  ),
  isLoadingGovernanceTokenBalance: createSelector(
    GovernanceDomains.governance,
    (governanceState) => governanceState.isGettingGovernanceTokenBalance
  ),
  governanceTokenBalance: createSelector(
    GovernanceDomains.governanceTokenBalance,
    (governanceTokenBalance) => governanceTokenBalance
  ),
  accruingTokenBalance: createSelector(
    GovernanceDomains.governance,
    (governanceState) => governanceState.accruingTokenBalance
  ),
  mainTokenAmountStakedForAccruing: createSelector(
    GovernanceDomains.governance,
    (governanceState) => governanceState.totalMainTokenStakedForAccruingToken
  ),
  totalAccruedToken: createSelector(
    GovernanceDomains.governance,
    (governanceState) => governanceState.totalAccruedToken
  ),
  floatedGovernanceTokenBalance: createSelector(
    GovernanceDomains.governance,
    (governanceState) => {
      if (governanceState.governanceTokenBalance) {
        const floated =
          BNToFloat(governanceState.governanceTokenBalance, 18)?.toFixed(3) ||
          "0.000";
        return floated;
      }
    }
  ),
  isLoadingReceipt: createSelector(
    GovernanceDomains.isLoadingReceipt,
    (isLoadingReceipt) => isLoadingReceipt
  ),
  receipt: createSelector(GovernanceDomains.receipt, (receipt) => receipt),
  selectedProposalFilter: createSelector(
    GovernanceDomains.selectedProposalFilter,
    (filter) => filter
  ),
  proposals: createSelector(
    GovernanceDomains.proposals,
    (proposals) => proposals
  ),
  proposalById: (id: string) =>
    createSelector(GovernanceDomains.proposals, (proposals) =>
      proposals.find((proposal) => proposal.id === id)
    ),
  isVotingFor: createSelector(
    GovernanceDomains.selectIsVotingFor,
    (isVotingFor) => isVotingFor
  ),

  isLoadingProposals: createSelector(
    GovernanceDomains.isLoadingProposals,
    (isLoading) => isLoading
  ),
  isSubmittingNewProposal: createSelector(
    GovernanceDomains.isSubmittingNewProposals,
    (isLoading) => isLoading
  ),
  filteredProposals: createSelector(
    [GovernanceDomains.proposals, GovernanceDomains.selectedProposalFilter],
    (proposals, filter) => {
      let list = [...proposals];
      if (filter !== ProposalFilters.All) {
        //@ts-ignore
        list = list.filter((p) => p.proposal_state === filter);
      }

      const active: Proposal[] = [];
      const rest: Proposal[] = [];
      list.forEach((p) => {
        if (p.proposal_state === ProposalState.Active) {
          active.push(p);
        } else {
          rest.push(p);
        }
      });
      const sortedRest = rest.sort((a, b) => {
        return Number(b.governance_id || 0) - Number(a.governance_id || 0);
      });
      const sortedActive = active.sort((a, b) => {
        console.log(b.governance_id, a.governance_id);
        return Number(b.governance_id || 0) - Number(a.governance_id || 0);
      });
      return [...sortedActive, ...sortedRest];
    }
  ),
  canAddNewProposal: createSelector(
    [
      GovernanceDomains.governance,
      Web3Domains.selectAccountDomain,
      GovernanceDomains.minimumTokenForNewProposal,
    ],
    (governance, account, minimum) => {
      if (governance.governanceTokenBalance) {
        const floatedBalance = BNToFloat(
          governance.governanceTokenBalance,
          18
        )?.toFixed(3);
        if (Number(floatedBalance) > minimum && account) {
          return true;
        }
      }
      return false;
    }
  ),
  governanceTokenContract: createSelector(
    [
      EthersDomains.selectPrivateProviderDomain,
      Web3Domains.selectLibraryDomain,
      GovernanceDomains.governanceTokenABI,
    ],
    (provider, library, governanceTokenABI) => {
      if (provider && library && governanceTokenABI) {
        if (!env.GOVERNANCE_TOKEN_CONTRACT_ADDRESS) {
          throw new Error(
            "Governance Token Contract Address is not defined in environment, please define REACT_APP_GOVERNANCE_TOKEN_ADDRESS"
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
