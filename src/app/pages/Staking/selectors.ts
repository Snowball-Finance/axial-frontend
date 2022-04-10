import { createSelector } from "@reduxjs/toolkit";

import { RootState } from "store/types";
import { initialState } from "./slice";
import { estimateGovernanceTokenForDate } from "./utils/stakeDate";

export const StakingPageDomains = {
  selectDomain: (state: RootState) => state.stakingPage || initialState,
  daysToUnlockGovernanceToken: (state: RootState) =>
    state.stakingPage?.daysToUnlockGovernanceTokens,
  selectEnteredMainTokenToStakeDomain: (state: RootState) =>
    state.stakingPage?.enteredMainTokenToStake ||
    initialState.enteredMainTokenToStake,
  selectEnteredMainTokenToStakeIntoVeAxialDomain: (state: RootState) =>
    state.stakingPage?.enteredMainTokenToStakeInVeAxial ||
    initialState.enteredMainTokenToStakeInVeAxial,

  selectSelectedWithdrawAndDepositTabDomain: (state: RootState) =>
    state.stakingPage?.selectedDepositAndWithdrawTab ||
    initialState.selectedDepositAndWithdrawTab,
  selectedVeAxialWithdrawAndDepositTabDomain: (state: RootState) =>
    state.stakingPage?.selectedVeAxialDepositAndWithdrawTab ||
    initialState.selectedVeAxialDepositAndWithdrawTab,

  selectSelectedDepositUnlockPeriodDomain: (state: RootState) =>
    state.stakingPage?.selectedDepositUnlockPeriod ||
    initialState.selectedDepositUnlockPeriod,

  selectSelectedEpochDomain: (state: RootState) =>
    state.stakingPage?.selectedEpoch || initialState.selectedEpoch,

  selectSelectedDepositSliderValueDomain: (state: RootState) =>
    state.stakingPage?.selectedDepositSliderValue,
};

export const StakingPageSelectors = {
  selectedDepositUnlockPeriod: createSelector(
    StakingPageDomains.selectSelectedDepositUnlockPeriodDomain,
    (selectedDepositUnlockPeriod) => selectedDepositUnlockPeriod
  ),
  selectSelectedWithdrawAndDepositTab: createSelector(
    StakingPageDomains.selectSelectedWithdrawAndDepositTabDomain,
    (selectedDepositAndWithdrawTab) => selectedDepositAndWithdrawTab
  ),
  selectedVeAxialWithdrawAndDepositTab: createSelector(
    StakingPageDomains.selectedVeAxialWithdrawAndDepositTabDomain,
    (selectedDepositAndWithdrawTab) => selectedDepositAndWithdrawTab
  ),
  selectEnteredMainTokenToStake: createSelector(
    StakingPageDomains.selectEnteredMainTokenToStakeDomain,
    (enteredMainTokenToStake) => enteredMainTokenToStake
  ),
  selectEnteredMainTokenToStakeIntoVeAxial: createSelector(
    StakingPageDomains.selectEnteredMainTokenToStakeIntoVeAxialDomain,
    (enteredMainTokenToStake) => enteredMainTokenToStake
  ),
  selectStakingPage: createSelector(
    StakingPageDomains.selectDomain,
    (stakingPageState) => stakingPageState
  ),
  selectSelectedDepositSliderValue: createSelector(
    StakingPageDomains.selectSelectedDepositSliderValueDomain,
    (selectedDepositSliderValue) => selectedDepositSliderValue
  ),
  selectSelectedEpoch: createSelector(
    StakingPageDomains.selectSelectedEpochDomain,
    (selectedEpoch) => selectedEpoch
  ),
  selectYouWillGet: createSelector(
    [
      StakingPageDomains.selectEnteredMainTokenToStakeDomain,
      StakingPageDomains.selectSelectedEpochDomain,
    ],
    (amount, epoch) => {
      if (isNaN(Number(amount))) return;
      const calculatedYouWillGet = estimateGovernanceTokenForDate(
        amount,
        epoch
      );
      return calculatedYouWillGet;
    }
  ),
  daysToUnlockGovernanceTokens: createSelector(
    StakingPageDomains.daysToUnlockGovernanceToken,
    (daysToUnlockGovernanceTokens) => daysToUnlockGovernanceTokens
  ),
};
