import { createSelector } from "@reduxjs/toolkit";

import { RootState } from "store/types";
import { GovernanceDomains } from "../selectors";
import { initialState } from "./slice";

export const StakingDomains = {
  selectDomain: (state: RootState) => state.staking || initialState,
  selectIsStakingDomain: (state: RootState) => state.staking?.isStaking,
  selectFeeDistributorABIDomain: (state: RootState) =>
    state.staking?.feeDistributorABI,
  selectOtherDistributorsDomain: (state: RootState) =>
    state.staking?.otherDistributors,
  claimableGovernanceToken: (state: RootState) =>
    state.staking?.claimableGovernanceToken ||
    initialState.claimableGovernanceToken,
  selectUserClaimableDomain: (state: RootState) =>
    state.staking?.claimable?.userClaimable,
  selectOtherClaimablesDomain: (state: RootState) =>
    state.staking?.claimable?.otherClaimables,
  lockedGovernanceTokenInfo: (state: RootState) =>
    state.staking?.lockedGovernanceTokenInfo,
  selectIsWithdrawingDomain: (state: RootState) => state.staking?.isWithdrawing,
  isWithdrawingAccruingToken: (state: RootState) =>
    state.staking?.isWithdrawingAccruingToken,
  keepThaUnclaimedWhenExtendingLockPeriod: (state: RootState) => {
    return state.staking?.keepThaUnclaimedWhenExtendingLockPeriod === undefined
      ? false
      : state.staking?.keepThaUnclaimedWhenExtendingLockPeriod;
  },
  sAxialDataFromAPI: (state: RootState) =>
    state.staking?.sAxialDataFromAPI || initialState.sAxialDataFromAPI,
};

export const StakingSelectors = {
  selectIsWithdrawing: createSelector(
    StakingDomains.selectIsWithdrawingDomain,
    (isWithdrawing) => isWithdrawing
  ),
  isWithdrawingAccruingToken: createSelector(
    StakingDomains.isWithdrawingAccruingToken,
    (isWithdrawing) => isWithdrawing
  ),
  lockedGovernanceTokenInfo: createSelector(
    StakingDomains.lockedGovernanceTokenInfo,
    (lockedGovernanceTokenInfo) => lockedGovernanceTokenInfo
  ),
  selectStaking: createSelector(
    StakingDomains.selectDomain,
    (stakingState) => stakingState
  ),
  selectIsStaking: createSelector(
    StakingDomains.selectIsStakingDomain,
    (isStaking) => isStaking
  ),
  selectOtherDistributors: createSelector(
    StakingDomains.selectOtherDistributorsDomain,
    (otherDistributors) => otherDistributors
  ),
  selectUserClaimable: createSelector(
    StakingDomains.selectUserClaimableDomain,
    (userClaimable) => userClaimable
  ),
  claimableGovernanceToken: createSelector(
    StakingDomains.claimableGovernanceToken,
    (claimableGovernanceToken) => claimableGovernanceToken
  ),
  selectOtherClaimables: createSelector(
    StakingDomains.selectOtherClaimablesDomain,
    (otherClaimables) => otherClaimables
  ),
  selectReadyForStaking: createSelector(
    GovernanceDomains.governanceTokenContract,
    (governanceTokenContract) => {
      return governanceTokenContract;
    }
  ),
  selectKeepThaUnclaimedWhenExtendingLockPeriod: createSelector(
    StakingDomains.keepThaUnclaimedWhenExtendingLockPeriod,
    (keepThaUnclaimedWhenExtendingLockPeriod) =>
      keepThaUnclaimedWhenExtendingLockPeriod
  ),
  selectSAxialDataFromAPI: createSelector(
    StakingDomains.sAxialDataFromAPI,
    (sAxialDataFromAPI) => sAxialDataFromAPI
  ),
};
