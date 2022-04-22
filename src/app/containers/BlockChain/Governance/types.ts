import { BigNumber, Contract } from "ethers";
import { Governance } from "abi/ethers-contracts/Governance";
import {
  ExecutionContext,
  GovernancePageState,
} from "app/pages/Governance/types";

/* --- STATE --- */

export enum ProposalFilters {
  All = "all",
  Active = "Active",
  ReadyForExecution = "Ready For Execution",
  Defeated = "Defeated",
}

export enum ProposalState {
  Active,
  Defeated,
  PendingExecution,
  ReadyForExecution,
  Executed,
  Expired,
}

export interface SubmitNewProposalPayload {
  executionContexts: ExecutionContext[];
  newProposalFields: GovernancePageState["newProposalFields"];
}

export type Proposal = Governance.ProposalStruct & {
  state: ProposalState;
  index: number;
};
export type Receipt = Governance.ReceiptStruct;
export interface GovernanceState {
  selectedProposalFilter: ProposalFilters;
  isLoadingProposals: boolean;
  proposals: Proposal[];
  syncedProposalsWithBlockchain: boolean;
  selectedProposal: Proposal | undefined;
  isVotingFor: boolean;
  isVotingAgainst: boolean;
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
  totalMainTokenStakedForAccruingToken: BigNumber | undefined;
}
export type ContainerState = GovernanceState;
