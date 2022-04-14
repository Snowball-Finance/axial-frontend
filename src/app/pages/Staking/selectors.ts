import { createSelector } from "@reduxjs/toolkit";
import { StakingDomains } from "app/containers/BlockChain/Governance/Staking/selectors";
import { divide } from "precise-math";

import { RootState } from "store/types";
import { initialState } from "./slice";
import { dateDifferenceFromNowByHours } from "./utils/dateDifference";
import { estimateGovernanceTokenForDate } from "./utils/stakeDate";

export const StakingPageDomains = {
  selectDomain: (state: RootState) => state.stakingPage || initialState,
  selectEnteredMainTokenToStakeDomain: (state: RootState) =>
    state.stakingPage?.enteredMainTokenToStake ||
    initialState.enteredMainTokenToStake,
  selectEnteredMainTokenToStakeIntoVeAxialDomain: (state: RootState) =>
    state.stakingPage?.enteredMainTokenToStakeInVeAxial ||
    initialState.enteredMainTokenToStakeInVeAxial,
  remainingDaysToUnlock: (state: RootState) => {
    const stakingState = state.staking;
    const lockedInfo = stakingState?.lockedGovernanceTokenInfo;
    if (!lockedInfo) return 0;
    const seconds = lockedInfo.endBlockTime.toNumber();
    if (seconds === 0) {
      return 0;
    }
    const lockedHoursFromNow = dateDifferenceFromNowByHours({
      dateInSeconds: seconds,
    });
    const daysFromNow = Number(divide(lockedHoursFromNow, 24).toFixed(0));
    return daysFromNow;
  },
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
  lockEndDate: createSelector(
    StakingDomains.lockedGovernanceTokenInfo,
    (lockedGovernanceTokenInfo) => {
      if (!lockedGovernanceTokenInfo) return;
      const { endBlockTime: endTimeInSeconds } = lockedGovernanceTokenInfo;
      const endDateInLocalString = new Date(
        endTimeInSeconds.toNumber() * 1000
      ).toLocaleString();
      return endDateInLocalString.split(",")[0];
    }
  ),
  remainingDaysToShow: createSelector(
    StakingPageDomains.remainingDaysToUnlock,
    (lockedDays) => lockedDays
  ),
};
