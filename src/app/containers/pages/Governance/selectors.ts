import { createSelector } from '@reduxjs/toolkit';

import { RootState } from 'store/types';
import { initialState } from './slice';

const selectDomain = (state: RootState) => state.governance || initialState;

export const selectGovernance = createSelector(
  [selectDomain],
  governanceState => governanceState,
);
