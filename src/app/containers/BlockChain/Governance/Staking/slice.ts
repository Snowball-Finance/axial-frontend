import { PayloadAction } from "@reduxjs/toolkit";
import {
  ContainerState,
  StakeGovernanceTokenModel,
  DistributorData,
  StakeAccruingTokenModel,
  LockedInfo,
} from "./types";
import { createSlice } from "store/toolkit";
import { useInjectReducer, useInjectSaga } from "store/redux-injectors";

import { stakingSaga } from "./saga";
import { BigNumber } from "ethers";
import { skipLoading } from "app/types";

// The initial state of the Staking container
export const initialState: ContainerState = {
  isStaking: false,
  feeDistributorABI: undefined,
  isClaiming: false,
  isGettingFeeDistributionInfo: false,
  isWithdrawing: false,
  isWithdrawingAccruingToken: false,
  isGettingGovernanceTokenInfo: false,
  claimableGovernanceToken: BigNumber.from(0),
  lockedGovernanceTokenInfo: undefined,
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
    stakeGovernanceToken(
      state,
      action: PayloadAction<StakeGovernanceTokenModel>
    ) {},
    stakeAccruingToken(
      state,
      action: PayloadAction<StakeAccruingTokenModel>
    ) {},
    setIsStakingGovernanceToken(state, action: PayloadAction<boolean>) {
      state.isStaking = action.payload;
    },
    claim() {},
    withdrawGovernanceToken() {},
    withdrawAccruingToken() {},
    setIsWithdrawingGovernanceToken(state, action: PayloadAction<boolean>) {
      state.isWithdrawing = action.payload;
    },
    setIsWithdrawingAccruingToken(state, action: PayloadAction<boolean>) {
      state.isWithdrawingAccruingToken = action.payload;
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
    getLockedGovernanceTokenInfo(
      state,
      action: PayloadAction<skipLoading | undefined>
    ) {},
    setGovernanceTokenInfo(state, action: PayloadAction<LockedInfo>) {
      state.lockedGovernanceTokenInfo = action.payload;
    },
    setIsGettingGovernanceTokenInfo(state, action: PayloadAction<boolean>) {
      state.isGettingGovernanceTokenInfo = action.payload;
    },

    getClaimableGovernanceToken() {},
    setClaimableGovernanceToken(state, action: PayloadAction<BigNumber>) {
      state.claimableGovernanceToken = action.payload;
    },
    activatePeriodicallyRefetchTheData() {},
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
