import { PayloadAction } from "@reduxjs/toolkit";
import { ContainerState, CreateLockData, DistributorData } from "./types";
import { createSlice } from "store/toolkit";
import { useInjectReducer, useInjectSaga } from "store/redux-injectors";

import { stakingSaga } from "./saga";
import { BigNumber } from "ethers";

// The initial state of the Staking container
export const initialState: ContainerState = {
  isStaking: false,
  feeDistributorABI: undefined,
  isClaiming: false,
  isGettingFeeDistributionInfo: false,
  isWithdrawing: false,
  endDate: BigNumber.from(0),
  isGettingGovernanceTokenInfo: false,
  lockedAmount: BigNumber.from(0),
  claimable: {
    userClaimable: BigNumber.from(0),
  },
};

const stakingSlice = createSlice({
  name: "staking",
  initialState,
  reducers: {
    setFeeDistributorData(
      state,
      action: PayloadAction<{
        feeDistributorABI: any;
        otherDistributors?: DistributorData[];
      }>
    ) {
      state.feeDistributorABI = action.payload;
      if (action.payload.otherDistributors) {
        state.otherDistributors = action.payload.otherDistributors;
      }
    },
    createLock(state, action: PayloadAction<CreateLockData>) {},
    setIsStaking(state, action: PayloadAction<boolean>) {
      state.isStaking = action.payload;
    },
    claim() {},
    withdraw() {},
    setIsWithdrawing(state, action: PayloadAction<boolean>) {
      state.isWithdrawing = action.payload;
    },
    setIsClaiming(state, action: PayloadAction<boolean>) {
      state.isClaiming = action.payload;
    },
    getFeeDistributionInfo() {},
    setIsGettingFeeDistributionInfo(state, action: PayloadAction<boolean>) {
      state.isGettingFeeDistributionInfo = action.payload;
    },
    setUserClaimable(state, action: PayloadAction<BigNumber>) {
      state.claimable.userClaimable = action.payload;
    },
    setOtherClaimables(state, action: PayloadAction<any>) {
      state.claimable.otherClaimables = action.payload;
    },
    getLockedGovernanceTokenInfo(state, action: PayloadAction<void>) {},
    setGovernanceTokenInfo(state, action: PayloadAction<any>) {
      state.lockedAmount = action.payload.amount;
      state.endDate = action.payload.end;
    },
    setIsGettingGovernanceTokenInfo(state, action: PayloadAction<boolean>) {
      state.isGettingGovernanceTokenInfo = action.payload;
    },
  },
});

export const {
  actions: StakingActions,
  reducer: StakingReducer,
  name: sliceKey,
} = stakingSlice;

export const useStakingSlice = () => {
  useInjectReducer({ key: sliceKey, reducer: StakingReducer });
  useInjectSaga({ key: sliceKey, saga: stakingSaga });
  return { StakingActions };
};
