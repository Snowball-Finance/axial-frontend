import { createSelector } from "@reduxjs/toolkit";
import { GovernanceDomains } from "app/containers/BlockChain/Governance/selectors";
import { StakingDomains } from "app/containers/BlockChain/Governance/Staking/selectors";
import { BNToFloat } from "common/format";
import { add, divide, multiply, subtract } from "precise-math";

import { RootState } from "store/types";
import { initialState } from "./slice";
import { dateDifferenceFromNowByHours } from "./utils/dateDifference";

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

  selectIsModalOpen: (state: RootState) =>
    state.stakingPage?.isModalOpen || initialState.isModalOpen,
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
      StakingDomains.lockedGovernanceTokenInfo,
      GovernanceDomains.governanceTokenBalance,
    ],
    (amount, epoch, lockedInfo, gtb) => {
      if (isNaN(Number(amount))) return;
      if (!lockedInfo || !epoch) return;
      if (gtb === undefined) return;
      const governanceTokenBalance = BNToFloat(gtb, 18) || 0;
      const nowInSeconds = Math.floor(Date.now() / 1000);
      const currentBlockTime = nowInSeconds;
      const endBlockTime = Number((epoch.getTime() / 1000).toFixed(0));
      const enteredMainTokenAmountToStake = Number(amount || "0");
      const summedAmount = add(
        governanceTokenBalance,
        enteredMainTokenAmountToStake
      );
      const diff = subtract(endBlockTime - currentBlockTime);
      const multiplied = multiply(
        diff,
        summedAmount || enteredMainTokenAmountToStake || 0
      );
      const twoYearsInSeconds = 2 * 365 * 24 * 60 * 60;
      const res = divide(multiplied, twoYearsInSeconds);
      return res.toFixed(4);
    }
  ),
  lockEndDate: createSelector(
    StakingDomains.lockedGovernanceTokenInfo,
    (lockedGovernanceTokenInfo) => {
      if (!lockedGovernanceTokenInfo) return;
      const { endBlockTime: endTimeInSeconds } = lockedGovernanceTokenInfo;
     if(endTimeInSeconds.eq(0)) return;
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
  selectIsModalOpen: createSelector(
    StakingPageDomains.selectIsModalOpen,
    (isModalOpen) => isModalOpen
  ),
};
