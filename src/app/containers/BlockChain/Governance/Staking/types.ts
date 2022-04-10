import { BigNumber } from "ethers";

/* --- STATE --- */
export interface StakingState {
  isStaking: boolean;
  isClaiming: boolean;
  feeDistributorABI: any;
  isGettingFeeDistributionInfo: boolean;
  lockedGovernanceTokenAmount: BigNumber;
  endDateForGovernanceTokenLock: BigNumber;
  isWithdrawing: boolean;
  isWithdrawingAccruingToken: boolean;
  isGettingGovernanceTokenInfo: boolean;
  claimableGovernanceToken: BigNumber | undefined;
  claimable: {
    userClaimable: BigNumber;
    otherClaimables?: {
      [key: string]: BigNumber;
    };
  };
  otherDistributors?: DistributorData[];
}

export interface DistributorData {
  address: string;
  name: string;
  symbol: string;
  decimals: number;
}

export interface LockedInfo {
  endBlockTime: BigNumber;
  initialized: boolean;
  startBlockTime: BigNumber;
  startingAmountLocked: BigNumber;
}

export interface StakeGovernanceTokenModel {
  amount: string;
  duration: string;
}
export interface StakeAccruingTokenModel {
  amountToStake: string;
}
export type ContainerState = StakingState;
