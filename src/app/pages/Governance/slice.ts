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
  selectedGauges: {},
  pairSearchInput: "",
  selectedPoolProviders: [],
  isVotingForFarms: false,
  submittedExecutionContexts: [],
  currentExecutionContext: {
    description: "",
    contractAddress: "",
    avaxValue: "",
    data: "",
  },
  newProposalFields: {
    title: "",
    description: "",
    discussion: "",
    document: "",
    votingPeriod: process.env.REACT_APP_MINIMUM_VOTING_PERIOD || "3",
    error: {
      title: "",
      description: "",
      votingPeriod: "",
    },
  },
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
      state.selectedGauges[action.payload.address] = action.payload;
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
    toggleSelectedGauge: (state, action: PayloadAction<GaugeItem>) => {
      const { selectedGauges } = state;
      const { payload } = action;
      const { address } = payload;
      if (selectedGauges[address]) {
        delete selectedGauges[address];
      } else {
        selectedGauges[address] = payload;
      }
      state.selectedGauges = selectedGauges;
    },
    fitSelectedPairsEqually: (state) => {
      const { selectedGauges } = state;
      const tmp = fitGaugeWeightsEqually(selectedGauges);
      state.selectedGauges = tmp;
    },
    fitSelectedPairsProportionally: (state) => {
      const { selectedGauges } = state;
      const tmp = fitGaugeWeightsProportionally(selectedGauges);
      state.selectedGauges = tmp;
    },
    voteForFarms: (state, action: PayloadAction<void>) => {},
    setIsVotingForFarms: (state, action: PayloadAction<boolean>) => {
      state.isVotingForFarms = action.payload;
    },
    resetNewProposalFields(state, action: PayloadAction<void>) {
      state.currentExecutionContext = {
        ...initialState.currentExecutionContext,
      };
      state.submittedExecutionContexts = [];
      state.newProposalFields = {
        ...initialState.newProposalFields,
        error: {
          ...initialState.newProposalFields.error,
        },
      };
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
    setCurrentExecutionContextField(
      state,
      action: PayloadAction<{
        key: keyof ContainerState["currentExecutionContext"];
        value;
      }>
    ) {
      state.currentExecutionContext[action.payload.key] = action.payload.value;
    },
    addToSubmittedExecutionContexts(
      state,
      action: PayloadAction<ContainerState["currentExecutionContext"]>
    ) {
      state.submittedExecutionContexts.push(action.payload);
      state.currentExecutionContext = {
        ...initialState.currentExecutionContext,
      };
    },
    setExecutionContextArray(
      state,
      action: PayloadAction<ContainerState["submittedExecutionContexts"]>
    ) {
      state.submittedExecutionContexts = action.payload;
    },
    removeFromSubmittedExecutionContexts(
      state,
      action: PayloadAction<{ index: number }>
    ) {
      const { submittedExecutionContexts } = state;
      const tmpSubmittedExecutionContexts = [...submittedExecutionContexts];
      const { payload } = action;
      const { index } = payload;
      tmpSubmittedExecutionContexts.splice(index, 1);
      state.submittedExecutionContexts = tmpSubmittedExecutionContexts;
    },
    setSubmittedExecutionContextForEditing(
      state,
      action: PayloadAction<{ index: number }>
    ) {
      const { submittedExecutionContexts } = state;
      const tmpSubmittedExecutionContexts = [...submittedExecutionContexts];
      const { payload } = action;
      const { index } = payload;
      state.currentExecutionContext = tmpSubmittedExecutionContexts[index];
      tmpSubmittedExecutionContexts.splice(index, 1);
      state.submittedExecutionContexts = tmpSubmittedExecutionContexts;
    },
    submitNewProposal: (state, action: PayloadAction<void>) => {},
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
