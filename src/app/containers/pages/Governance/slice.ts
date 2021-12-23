import { PayloadAction } from '@reduxjs/toolkit';
import { ContainerState } from './types';
import { createSlice } from "store/toolkit";
import { useInjectReducer, useInjectSaga } from "store/redux-injectors";

import { governanceSaga } from './saga';

// The initial state of the Governance container
export const initialState: ContainerState = {};

const governanceSlice = createSlice({
  name: 'governance',
  initialState,
  reducers: {
    someAction(state, action: PayloadAction<any>) {},
  },
});

export const { actions:GovernanceActions, reducer:GovernanceReducer, name: sliceKey } = governanceSlice;

export const useGovernanceSlice=()=>{
useInjectReducer({ key: sliceKey, reducer: GovernanceReducer });
useInjectSaga({ key: sliceKey, saga: governanceSaga });
return { GovernanceActions }
}