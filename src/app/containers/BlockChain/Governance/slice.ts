import { PayloadAction } from "@reduxjs/toolkit";
import {
  ContainerState,
  Proposal,
  ProposalFilters,
  Receipt,
  SubmitNewProposalPayload,
} from "./types";
import { createSlice } from "store/toolkit";
import { useInjectReducer, useInjectSaga } from "store/redux-injectors";
import { governanceSaga } from "./saga";
import { BigNumber } from "ethers";
import { skipLoading } from "app/types";

// The initial state of the Governance container
export const initialState: ContainerState = {
  selectedProposalFilter: ProposalFilters.All,
  isLoadingProposals: false,
  syncedProposalsWithBlockchain: false,
  proposals: undefined,
  isVotingAgainst: false,
  isVotingFor: -1,
  isSubmittingNewProposal: false,
  selectedProposal: undefined,
  iseGettingReceipt: false,
  governanceTokenABI: undefined,
  governanceABI: undefined,
  governanceTokenContract: undefined,
  governanceTokenBalance: undefined,
  accruingTokenBalance: undefined,
  isGettingGovernanceTokenBalance: false,
  totalGovernanceTokenSupply: BigNumber.from(0),
  totalAccruedToken: BigNumber.from(0),
  totalMainTokenStakedForAccruingToken: BigNumber.from(0),
  minimumTokenAmountForNewProposal: 0,
};

const governanceSlice = createSlice({
  name: "governance",
  initialState,
  reducers: {
    getEssentialDataForGovernance() {},
    setMinimumTokenForNewProposal(state, action: PayloadAction<number>) {
      state.minimumTokenAmountForNewProposal = action.payload;
    },
    getGovernanceTokenBalance(
      state,
      action: PayloadAction<skipLoading | undefined>
    ) {},
    getAccruingTokenBalance(
      state,
      action: PayloadAction<skipLoading | undefined>
    ) {},
    setGovernanceABI(state, action: PayloadAction<any>) {
      state.governanceABI = action.payload;
    },
    setGovernanceTokenBalance(state, action: PayloadAction<BigNumber>) {
      state.governanceTokenBalance = action.payload;
    },
    setAccruingTokenBalance(state, action: PayloadAction<BigNumber>) {
      state.accruingTokenBalance = action.payload;
    },
    setMainTokenAmountStakedForAccruing(
      state,
      action: PayloadAction<BigNumber>
    ) {
      state.totalMainTokenStakedForAccruingToken = action.payload;
    },
    setTotalAccrued(state, action: PayloadAction<BigNumber>) {
      state.totalAccruedToken = action.payload;
    },
    // getTotalGovernanceTokenSupply(state, action: PayloadAction<void>) {},
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
    getProposals(state, action: PayloadAction<{ silent?: boolean }>) {},
    getVotingReceipt(state, action: PayloadAction<{ proposal: Proposal }>) {
      state.receipt = undefined;
    },
    setVotingReceipt(state, action: PayloadAction<Receipt | undefined>) {
      state.receipt = action.payload;
    },
    setIsGettingReceipt(state, action: PayloadAction<boolean>) {
      state.iseGettingReceipt = action.payload;
    },
    setIsGettingProposals(state, action: PayloadAction<boolean>) {
      state.isLoadingProposals = action.payload;
    },
    setProposals(state, action: PayloadAction<Proposal[]>) {
      state.proposals = action.payload;
    },
    setIsVotingFor(state, action: PayloadAction<number>) {
      state.isVotingFor = action.payload;
    },
    setIsVotingAgainst(state, action: PayloadAction<boolean>) {
      state.isVotingAgainst = action.payload;
    },

    setProposalFilter(state, action: PayloadAction<ProposalFilters>) {
      state.selectedProposalFilter = action.payload;
    },
    setSelectedProposal(state, action: PayloadAction<Proposal>) {
      state.selectedProposal = action.payload;
    },
    vote(
      state,
      action: PayloadAction<{ proposal: Proposal; voteFor: number }>
    ) {},
    setIsSubmittingNewProposal(state, action: PayloadAction<boolean>) {
      state.isSubmittingNewProposal = action.payload;
    },
    submitNewProposal(
      state,
      action: PayloadAction<SubmitNewProposalPayload>
    ) {},
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
