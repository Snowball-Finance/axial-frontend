import { PayloadAction } from "@reduxjs/toolkit";
import {
  ContainerState,
  DepositAndWithdrawTab,
  DepositUnlockPeriod,
} from "./types";
import { createSlice } from "store/toolkit";
import { useInjectReducer, useInjectSaga } from "store/redux-injectors";

import { stakingPageSaga } from "./saga";
import {
  addDaysToTodayAndGetOnlyDate,
  numberOfDaysUntilDate,
} from "./utils/addDays";
import {
  convertDaysFromNowToPercentage,
  convertPercentToDaysFromNow,
} from "./utils/dateToPercent";

// The initial state of the StakingPage container
export const initialState: ContainerState = {
  enteredMainTokenToStake: "",
  enteredMainTokenToStakeInVeAxial: "",
  selectedEpoch: addDaysToTodayAndGetOnlyDate(1),
  selectedDepositSliderValue: 0,
  selectedDepositAndWithdrawTab: DepositAndWithdrawTab.Deposit,
  selectedVeAxialDepositAndWithdrawTab: DepositAndWithdrawTab.Deposit,
  selectedDepositUnlockPeriod: DepositUnlockPeriod.end,
  isModalOpen: false,
};

const stakingPageSlice = createSlice({
  name: "stakingPage",
  initialState,
  reducers: {
    setEnteredMainTokenToStake(state, action: PayloadAction<string>) {
      state.enteredMainTokenToStake = action.payload;
    },
    setEnteredMainTokenToStakeIntoVeAxial(
      state,
      action: PayloadAction<string>
    ) {
      state.enteredMainTokenToStakeInVeAxial = action.payload;
    },

    setSelectedDepositAndWithdrawTab(
      state,
      action: PayloadAction<DepositAndWithdrawTab>
    ) {
      state.selectedDepositAndWithdrawTab = action.payload;
    },
    setSelectedVeAxialDepositAndWithdrawTab(
      state,
      action: PayloadAction<DepositAndWithdrawTab>
    ) {
      state.selectedVeAxialDepositAndWithdrawTab = action.payload;
    },
    stakeAllTheBalances() {},
    stakeAllTheAxialBalancesIntoVeAxial() {},
    stakeGovernanceToken() {},
    stakeAccruingToken() {},
    setSelectedDepositUnlockPeriod(
      state,
      action: PayloadAction<DepositUnlockPeriod>
    ) {
      state.selectedDepositUnlockPeriod = action.payload;
    },
    setSelectedDateInStakingGovernance(state, action: PayloadAction<Date>) {
      const numberOfDaysFromNow = numberOfDaysUntilDate(action.payload);
      const newPercent = convertDaysFromNowToPercentage(numberOfDaysFromNow);
      state.selectedEpoch = action.payload;
      state.selectedDepositSliderValue = newPercent;
    },
    setSelectedSliderValue(state, action: PayloadAction<number>) {
      const daysFromNowFromPercentage = convertPercentToDaysFromNow(
        action.payload
      );
      state.selectedDepositSliderValue = action.payload;
      state.selectedEpoch = addDaysToTodayAndGetOnlyDate(
        daysFromNowFromPercentage
      );
    },
    setIsModalOpen(state, action: PayloadAction<boolean>) {
      state.isModalOpen = action.payload;
    },
  },
});

export const {
  actions: StakingPageActions,
  reducer: StakingPageReducer,
  name: sliceKey,
} = stakingPageSlice;

export const useStakingPageSlice = () => {
  useInjectReducer({ key: sliceKey, reducer: StakingPageReducer });
  useInjectSaga({ key: sliceKey, saga: stakingPageSaga });
  return { StakingPageActions };
};
