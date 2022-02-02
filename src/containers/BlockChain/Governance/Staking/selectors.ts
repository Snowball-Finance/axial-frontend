import { createSelector } from "@reduxjs/toolkit";
import { RootState } from "../../../../store/types";

import { selectContractsDomain } from "../../selectors";
import { selectGovernanceTokenContractDomain } from "../selectors";
import { initialState } from "./slice";

const selectDomain = (state: RootState) => state.staking || initialState;
const selectIsStakingDomain = (state: RootState) => state.staking?.isStaking;
export const selectFeeDistributorABIDomain = (state: RootState) =>
  state.staking?.feeDistributorABI;
export const selectOtherDistributorsDomain = (state: RootState) =>
  state.staking?.otherDistributors;
export const selectUserClaimableDomain = (state: RootState) =>
  state.staking?.claimable?.userClaimable;
export const selectOtherClaimablesDomain = (state: RootState) =>
  state.staking?.claimable?.otherClaimables;

export const selectStaking = createSelector(
  [selectDomain],
  (stakingState) => stakingState
);

export const selectIsStaking = createSelector(
  [selectIsStakingDomain],
  (isStaking) => isStaking
);

export const selectOtherDistributors = createSelector(
  [selectOtherDistributorsDomain],
  (otherDistributors) => otherDistributors
);

export const selectUserClaimable = createSelector(
  [selectUserClaimableDomain],
  (userClaimable) => userClaimable
);

export const selectOtherClaimables = createSelector(
  [selectOtherClaimablesDomain],
  (otherClaimables) => otherClaimables
);

export const selectReadyForStaking = createSelector(
  [selectContractsDomain, selectGovernanceTokenContractDomain],
  (blockChainContracts, governanceTokenContract) => {
    return blockChainContracts.mainTokenContract && governanceTokenContract;
  }
);
