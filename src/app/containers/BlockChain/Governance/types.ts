import { BigNumber, Contract } from "ethers";

/* --- STATE --- */
export enum ProposalStates {
  active = "Active",
  new = "New",
  defeated = "Defeated",
  readyForExecution = "Ready For Execution",
  executed = "Executed",
  vetoed = "Vetoed",
  passed = "Passed",
}
export enum ProposalFilters {
  All = "all",
  Active = "Active",
  ReadyForExecution = "Ready For Execution",
  Defeated = "Defeated",
}

interface ProposalMetadata {
  description: string;
  discussion: string;
  document: string;
}
export interface Proposal {
  againstVotes: number;
  details: any;
  duration: number;
  endDate: string;
  forVotes: number;
  index: number;
  metadata: ProposalMetadata;
  offset: number;
  origin: string;
  proposer: string;
  startDate: string;
  state: ProposalStates;
  title: string;
}
export interface Receipt {
  hasVoted: boolean;
  support: boolean;
  votes: number | undefined;
}
export interface GovernanceState {
  selectedProposalFilter: ProposalFilters;
  isLoadingProposals: boolean;
  proposals: Proposal[];
  syncedProposalsWithBlockchain: boolean;
  selectedProposal: Proposal | undefined;
  isVotingFor: boolean;
  isVotingAgainst: boolean;
  isNewProposalFormOpen: boolean;
  isSubmittingNewProposal: boolean;
  iseGettingReceipt: boolean;
  receipt?: Receipt;
  // used any, because it's a json file
  governanceTokenABI: any;
  governanceABI: any;
  governanceTokenContract: Contract | undefined;
  totalGovernanceTokenSupply: BigNumber;
  isGettingGovernanceTokenBalance: boolean;
  governanceTokenBalance: BigNumber | undefined;
  accruingTokenBalance: BigNumber | undefined;
  totalAccruedToken: BigNumber | undefined;
  newProposalFields: {
    title: string;
    description: string;
    discussion: string;
    document: string;
    votingPeriod: string;
    error: {
      title: string;
      description: string;
      votingPeriod: string;
    };
  };
}
export type ContainerState = GovernanceState;
