import { GaugeItem, PoolProvider } from "app/containers/PoolsAndGauges/types";

export interface SelectablePoolProvider extends PoolProvider {
  selected: boolean;
  gauges: GaugeItem[];
}

export interface ExecutionContext {
  description: string;
  contractAddress: string;
  avaxValue: string;
  data: string;
}

/* --- STATE --- */
export interface GovernancePageState {
  isVoteAllocationSelectionOpen: boolean;
  selectedPairs: {
    [key: string]: GaugeItem;
  };
  pairSearchInput: string;
  selectedPoolProviders: string[];
  isVotingForFarms: boolean;
  submittedExecutionContexts: ExecutionContext[];
  currentExecutionContext: ExecutionContext;
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
  isModalOpen: boolean;
}

export type ContainerState = GovernancePageState;
