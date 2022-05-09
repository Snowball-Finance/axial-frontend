import { BigNumber } from "ethers";

/* --- STATE --- */
export interface StakingState {
  isStaking: boolean;
  isClaiming: boolean;
  feeDistributorABI: any;
  isGettingFeeDistributionInfo: boolean;
  isWithdrawing: boolean;
  isWithdrawingAccruingToken: boolean;
  isGettingGovernanceTokenInfo: boolean;
  claimableGovernanceToken: BigNumber | undefined;
  lockedGovernanceTokenInfo: LockedInfo | undefined;
  claimable: {
    userClaimable: BigNumber;
    otherClaimables?: {
      [key: string]: BigNumber;
    };
  };
  otherDistributors?: DistributorData[];
  keepThaUnclaimedWhenExtendingLockPeriod: boolean;
  sAxialDataFromAPI: SAxialData | undefined;
}

export interface SAxialData {
  totalStaked: string;
  walletStaked: string;
  averageStaked: number;
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
