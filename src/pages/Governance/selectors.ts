import { createSelector } from "@reduxjs/toolkit"

import { RootState } from "store/types"
import { initialState } from "./slice"

const selectGovernancePageDomain = (state: RootState) =>
  state.governancePage || initialState

export const selectGovernancePage = createSelector(
  [selectGovernancePageDomain],
  (governancePageState) => governancePageState,
)
