import { PayloadAction } from "@reduxjs/toolkit";
import { ContainerState } from "./types";
import { createSlice } from "store/toolkit";
import { useInjectReducer, useInjectSaga } from "store/redux-injectors";

import { governancePageSaga } from "./saga";

// The initial state of the GovernancePage container
export const initialState: ContainerState = {

};

const governancePageSlice = createSlice({
  name: "governancePage",
  initialState,
  reducers: {
    
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
