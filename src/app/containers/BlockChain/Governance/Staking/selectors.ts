import { createSelector } from "@reduxjs/toolkit";

import { RootState } from "store/types";
import { BlockChainDomains } from "../../selectors";
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
  selectLockedAmountDomain: (state: RootState) =>
    state.staking?.lockedGovernanceTokenAmount ||
    initialState.lockedGovernanceTokenAmount,
  selectEndDateDomain: (state: RootState) =>
    state.staking?.endDateForGovernanceTokenLock ||
    initialState.endDateForGovernanceTokenLock,
  selectIsWithdrawingDomain: (state: RootState) => state.staking?.isWithdrawing,
};

export const StakingSelectors = {
  selectIsWithdrawing: createSelector(
    StakingDomains.selectIsWithdrawingDomain,
    (isWithdrawing) => isWithdrawing
  ),
  selectLockedGovernanceTokenAmount: createSelector(
    StakingDomains.selectLockedAmountDomain,
    (lockedAmount) => lockedAmount
  ),
  selectEndDate: createSelector(
    StakingDomains.selectEndDateDomain,
    (endDate) => endDate
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
    [
      BlockChainDomains.selectContractsDomain,
      GovernanceDomains.selectGovernanceTokenContractDomain,
    ],
    (blockChainContracts, governanceTokenContract) => {
      return blockChainContracts.mainTokenContract && governanceTokenContract;
    }
  ),
};
