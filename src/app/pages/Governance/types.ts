import { GaugeItem, PoolProvider } from "app/containers/PoolsAndGauges/types";

export interface SelectablePoolProvider extends PoolProvider {
  selected: boolean;
  gauges: GaugeItem[];
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
  isNewProposalFormOpen: boolean;
}

export type ContainerState = GovernancePageState;
