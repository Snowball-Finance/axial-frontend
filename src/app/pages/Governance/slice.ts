import { PayloadAction } from "@reduxjs/toolkit";
import { ContainerState } from "./types";
import { createSlice } from "store/toolkit";
import { useInjectReducer, useInjectSaga } from "store/redux-injectors";

import { governancePageSaga } from "./saga";
import { GaugeItem } from "app/containers/PoolsAndGauges/types";
import {
  fitGaugeWeightsEqually,
  fitGaugeWeightsProportionally,
} from "./utils/fit";

// The initial state of the GovernancePage container
export const initialState: ContainerState = {
  isVoteAllocationSelectionOpen: false,
  selectedPairs: {},
  pairSearchInput: "",
  selectedPoolProviders: [],
  isVotingForFarms: false,
  isNewProposalFormOpen: true,
};

const governancePageSlice = createSlice({
  name: "governancePage",
  initialState,
  reducers: {
    setIsVoteAllocationSelectionOpen: (
      state,
      action: PayloadAction<boolean>
    ) => {
      state.isVoteAllocationSelectionOpen = action.payload;
    },
    setPairSearchInput: (state, action: PayloadAction<string>) => {
      state.pairSearchInput = action.payload;
    },
    setSelectedPairAllocationInputValue: (
      state,
      action: PayloadAction<GaugeItem>
    ) => {
      state.selectedPairs[action.payload.address] = action.payload;
    },
    toggleSelectedPoolProvider: (state, action: PayloadAction<string>) => {
      const { selectedPoolProviders } = state;
      const { payload } = action;
      if (selectedPoolProviders.includes(payload)) {
        selectedPoolProviders.splice(selectedPoolProviders.indexOf(payload), 1);
      } else {
        selectedPoolProviders.push(payload);
      }
      state.selectedPoolProviders = selectedPoolProviders;
    },
    toggleSelectedPair: (state, action: PayloadAction<GaugeItem>) => {
      const { selectedPairs } = state;
      const { payload } = action;
      const { address } = payload;
      if (selectedPairs[address]) {
        delete selectedPairs[address];
      } else {
        selectedPairs[address] = payload;
      }
      state.selectedPairs = selectedPairs;
    },
    fitSelectedPairsEqually: (state) => {
      const { selectedPairs } = state;
      const tmp = fitGaugeWeightsEqually(selectedPairs);
      state.selectedPairs = tmp;
    },
    fitSelectedPairsProportionally: (state) => {
      const { selectedPairs } = state;
      const tmp = fitGaugeWeightsProportionally(selectedPairs);
      state.selectedPairs = tmp;
    },
    voteForFarms: (state, action: PayloadAction<void>) => {},
    setIsVotingForFarms: (state, action: PayloadAction<boolean>) => {
      state.isVotingForFarms = action.payload;
    },
    setIsNewProposalFormOpen(state, action: PayloadAction<boolean>) {
      state.isNewProposalFormOpen = action.payload;
    },
  },
});

export const {
  actions: GovernancePageActions,
  reducer: GovernancePageReducer,
  name: sliceKey,
} = governancePageSlice;

export const useGovernancePageSlice = () => {
  useInjectReducer({ key: sliceKey, reducer: GovernancePageReducer });
  useInjectSaga({ key: sliceKey, saga: governancePageSaga });
  return { GovernancePageActions };
};
