import { PayloadAction } from "@reduxjs/toolkit";
import { ContainerState, Proposal, ProposalFilters, Receipt } from "./types";
import { createSlice } from "store/toolkit";
import { useInjectReducer, useInjectSaga } from "store/redux-injectors";
import { governanceSaga } from "./saga";
import { BigNumber } from "ethers";

// The initial state of the Governance container
export const initialState: ContainerState = {
  selectedProposalFilter: ProposalFilters.All,
  isLoadingProposals: false,
  syncedProposalsWithBlockchain: false,
  proposals: [],
  isVotingAgainst: false,
  isVotingFor: false,
  isNewProposalFormOpen: false,
  isSubmittingNewProposal: false,
  selectedProposal: undefined,
  iseGettingReceipt: false,
  governanceTokenABI: undefined,
  governanceABI: undefined,
  governanceTokenContract: undefined,
  governanceTokenBalance: undefined,
  isGettingGovernanceTokenBalance: false,
  totalGovernanceTokenSupply: BigNumber.from(0),
  newProposalFields: {
    title: "",
    description: "",
    discussion: "",
    document: "",
    votingPeriod: "3",
    error: {
      title: "",
      description: "",
      votingPeriod: "",
    },
  },
};

const governanceSlice = createSlice({
  name: "governance",
  initialState,
  reducers: {
    getGovernanceTokenBalance(state, action: PayloadAction<void>) {},
    setGovernanceABI(state, action: PayloadAction<any>) {
      state.governanceABI = action.payload;
    },
    setGovernanceTokenBalance(state, action: PayloadAction<BigNumber>) {
      state.governanceTokenBalance = action.payload;
    },
    getTotalGovernanceTokenSupply(state, action: PayloadAction<void>) {},
    setIsGettingGovernanceTokenBalance(state, action: PayloadAction<boolean>) {
      state.isGettingGovernanceTokenBalance = action.payload;
    },
    setTotalGovernanceTokenSupply(state, action: PayloadAction<BigNumber>) {
      state.totalGovernanceTokenSupply = action.payload;
    },
    setGovernanceTokenABI(state, action: PayloadAction<any>) {
      state.governanceTokenABI = action.payload;
    },
    setGovernanceTokenContract(state, action: PayloadAction<any>) {
      state.governanceTokenContract = action.payload;
    },
    getProposals(
      state,
      action: PayloadAction<{ silent?: boolean; query: string }>
    ) {},
    getVotingReceipt(state, action: PayloadAction<{ proposal: Proposal }>) {
      state.receipt = undefined;
    },
    setVotingReceipt(state, action: PayloadAction<Receipt | undefined>) {
      state.receipt = action.payload;
    },
    setIsGettingReceipt(state, action: PayloadAction<boolean>) {
      state.iseGettingReceipt = action.payload;
    },
    setIsLoadingProposals(state, action: PayloadAction<boolean>) {
      state.isLoadingProposals = action.payload;
    },
    setProposals(state, action: PayloadAction<Proposal[]>) {
      state.proposals = action.payload;
    },
    setIsVotingFor(state, action: PayloadAction<boolean>) {
      state.isVotingFor = action.payload;
    },
    setIsVotingAgainst(state, action: PayloadAction<boolean>) {
      state.isVotingAgainst = action.payload;
    },
    setIsNewProposalFormOpen(state, action: PayloadAction<boolean>) {
      state.isNewProposalFormOpen = action.payload;
    },
    setProposalFilter(state, action: PayloadAction<ProposalFilters>) {
      state.selectedProposalFilter = action.payload;
    },
    setSelectedProposal(state, action: PayloadAction<Proposal>) {
      state.selectedProposal = action.payload;
    },
    setNewProposalFields(
      state,
      action: PayloadAction<{
        key: keyof ContainerState["newProposalFields"];
        value;
      }>
    ) {
      state.newProposalFields[action.payload.key] = action.payload.value;
    },
    setNewProposalError(
      state,
      action: PayloadAction<{
        key: keyof ContainerState["newProposalFields"]["error"];
        value: string;
      }>
    ) {
      state.newProposalFields.error[action.payload.key] = action.payload.value;
    },
    vote(
      state,
      action: PayloadAction<{ proposal: Proposal; voteFor: boolean }>
    ) {},
    setIsSubmittingNewProposal(state, action: PayloadAction<boolean>) {
      state.isSubmittingNewProposal = action.payload;
    },
    submitNewProposal(state, action: PayloadAction<void>) {},
    setSyncedProposalsWithBlockchain(state, action: PayloadAction<boolean>) {
      state.syncedProposalsWithBlockchain = action.payload;
    },
    syncProposalsWithBlockchain(state, action: PayloadAction<void>) {},
  },
});

export const {
  actions: GovernanceActions,
  reducer: GovernanceReducer,
  name: sliceKey,
} = governanceSlice;

export const useGovernanceSlice = () => {
  useInjectReducer({ key: sliceKey, reducer: GovernanceReducer });
  useInjectSaga({ key: sliceKey, saga: governanceSaga });
  return { GovernanceActions };
};
