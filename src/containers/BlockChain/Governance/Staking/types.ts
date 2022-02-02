import { BigNumber } from "ethers";

/* --- STATE --- */
export interface StakingState {
  isStaking: boolean;
  isClaiming: boolean;
  feeDistributorABI: any;
  isGettingFeeDistributionInfo: boolean;
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

export interface CreateLockData {
  balance: string;
  date: string;
  duration: string;
}

export type ContainerState = StakingState;
