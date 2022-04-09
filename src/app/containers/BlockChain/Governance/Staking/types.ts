import { BigNumber } from "ethers";

/* --- STATE --- */
export interface StakingState {
  isStaking: boolean;
  isClaiming: boolean;
  feeDistributorABI: any;
  isGettingFeeDistributionInfo: boolean;
  lockedAmount: BigNumber;
  endDate: BigNumber;
  isWithdrawing: boolean;
  isGettingGovernanceTokenInfo: boolean;
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

export interface StakeGovernanceTokenModel {
  balance: string;
  date: string;
  duration: string;
}
export interface StakeAccruingTokenModel {
  amountToStake: string;
}
export type ContainerState = StakingState;
