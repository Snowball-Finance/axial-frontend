import { createSelector } from '@reduxjs/toolkit';

import { RootState } from 'store/types';
import { initialState } from './slice';

const selectDomain = (state: RootState) => state.rewards || initialState;

export const selectRewards = createSelector(
  [selectDomain],
  rewardsState => rewardsState,
);
