import { BigNumber, Contract } from "ethers";
import { Governance } from "abi/ethers-contracts/Governance";
import {
  ExecutionContext,
  GovernancePageState,
} from "app/pages/Governance/types";

/* --- STATE --- */
//change this with respect to ProposalFilters
export enum ProposalState {
  Active = "Active",
  Defeated = "Defeated",
  PendingExecution = "Pending Execution",
  ReadyForExecution = "Ready For Execution",
  Executed = "Executed",
  Expired = "Expired",
}
//change this with respect to ProposalState
export enum ProposalFilters {
  All = "all",
  Active = "Active",
  Defeated = "Defeated",
  PendingExecution = "Pending Execution",
  ReadyForExecution = "Ready For Execution",
  Executed = "Executed",
  Expired = "Expired",
}

export interface SubmitNewProposalPayload {
  executionContexts: ExecutionContext[];
  newProposalFields: GovernancePageState["newProposalFields"];
}

export interface ProposalExecContext {
  created?: string; //"2022-04-23T00:12:14.531Z"
  data: string; // "0xa9059cbb000000000000000000000000c99ee029ebaeaf473ef69aef6633489d9ae533850000000000000000000000000000000000000000000000000000000000000001"
  id?: string; // "e822e703-fc87-45f5-923e-4b8c7324b9d3"
  label: string; //  "send some money to  0xC99Ee029ebaeaf473eF69Aef6633489d9aE53385"
  modified?: string; // "2022-04-23T00:12:14.531Z"
  proposal_id?: string; //  "04018024-63b1-4db8-b6c1-d8ece02b503e"
  target: string; //  "0x0708F10F657b16ABE18954361E96a641b217648B"
  value: string; //  "0"
}

export interface Proposal {
  created?: string; //"2022-04-23T00:12:14.531Z"
  description: string; //"{\"title\":\"title of proposal\",\"description\":\"dfgsdfgsdfgsdf\",\"discussion\":\"discord link\",\"document\":\"proposal doc\"}"
  discussion: null;
  document: null;
  duration: string; // "72"
  end_date: string; //"2022-04-25T19:04:07.000Z"
  execution_contexts: ProposalExecContext[];
  executor: string; // "0x0000000000000000000000000000000000000000"
  governance_id: string; // "2"
  id: string; //"04018024-63b1-4db8-b6c1-d8ece02b503e"
  modified?: string; //"2022-04-25T18:42:16.363Z"
  proposer: string; // "0x2489b8c7E72763E993437efAEE8792B2BA2Be69d"
  quorum_votes: string; //"300000"
  start_date: string; //"2022-04-22T19:04:07.000Z"
  title: string; //"title of proposal"
  votes: string[];
  proposal_state?: ProposalState;
  blockChainData: Governance.ProposalStruct;
}

export type ProposalStruct = Governance.ProposalStruct & {
  state: ProposalState;
  index: number;
};
export type Receipt = Governance.ReceiptStruct;
export interface GovernanceState {
  selectedProposalFilter: ProposalFilters;
  isLoadingProposals: boolean;
  proposals: Proposal[] | undefined;
  syncedProposalsWithBlockchain: boolean;
  selectedProposal: Proposal | undefined;
  isVotingFor: number;
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
  minimumTokenAmountForNewProposal: number;
}
export type ContainerState = GovernanceState;
