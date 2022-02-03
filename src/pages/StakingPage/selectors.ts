import { createSelector } from "@reduxjs/toolkit"

import { RootState } from "store/types"
import { initialState } from "./slice"

const selectDomain = (state: RootState) => state.stakingPage || initialState
export const selectEnteredMainTokenToStakeDomain = (state: RootState) =>
  state.stakingPage?.enteredMainTokenToStake ||
  initialState.enteredMainTokenToStake

export const selectEnteredMainTokenToStake = createSelector(
  [selectEnteredMainTokenToStakeDomain],
  (enteredMainTokenToStake) => enteredMainTokenToStake,
)

export const selectStakingPage = createSelector(
  [selectDomain],
  (stakingPageState) => stakingPageState,
)
