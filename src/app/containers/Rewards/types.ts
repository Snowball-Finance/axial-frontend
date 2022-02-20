/* --- STATE --- */

import { BigNumber, Contract } from "ethers";
import { Token } from "../Swap/types";


interface PoolInfo {
  amount: BigNumber;
  rewardDebt: BigNumber;
}

export interface PendingTokens {
  pendingAxial: BigNumber;
  bonusTokenAddress: string;
  bonusTokenSymbol: string;
  pendingBonusToken: BigNumber;
}


export interface MasterchefResponse {
  userInfo: PoolInfo;
  pendingTokens: PendingTokens;
}


export enum Pools {
  AXIAL_AS4D = "AXIAL_AS4D",
  AXIAL_AC4D = "AXIAL_AC4D",
  AXIAL_AM3D = "AXIAL_AM3D",
  AXIAL_AA3D = "AXIAL_AA3D",
  AXIAL_JLP = "AXIAL_JLP",
  USDC_AM3D = "USDC_AM3D",
}

export enum PoolTypes {
  BTC,
  ETH,
  USD,
  LP,
  OTHER,
}

export interface Pool {
  name: string;
  address: string;
  swapABI: any;
  swapAddress?: string;
  poolType: PoolTypes;
  poolTokens:Token[]
  underlyingPoolTokens?:Token[]
  underlyingPool?:string
  lpToken: Token;
}

export interface RewardsState {
  tokenPricesUSD: any;
  lastTransactionTimes: any;
  swapStats: any;
  masterchefApr: any;
  isGettingMasterChefBalances: boolean;
  masterChefBalances: { [key: string]: MasterchefResponse }|undefined;
  pools: { [K in Pools]?: Pool };
}

export type ContainerState = RewardsState;
