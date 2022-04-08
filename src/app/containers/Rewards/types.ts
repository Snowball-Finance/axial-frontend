/* --- STATE --- */

import { BigNumber } from "ethers";
import { Token, TokenSymbols } from "../Swap/types";

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

export interface ExtraTokens {
  address: string;
  tokenPerSec: string;
}

export interface PoolInfos {
  lpToken: string;
  allocPoint: BigNumber;
  lastRewardTimestamp: BigNumber;
  accAxialPerShare: BigNumber;
  rewarder: string;
}
export interface AxialLPData {
  AXIALPrice: number;
  LPTVL: number;
  tokenPoolPrice: number;
}

export interface MasterchefApr {
  [swapAddress: string]: {
    apr: number;
    lptvl: number;
    totalStaked: string;
    tokenPoolPrice: number;
    extraTokens: ExtraTokens[];
  };
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
  poolTokens: Token[];
  underlyingPoolTokens?: Token[];
  underlyingPool?: string;
  lpToken: Token;
  key: Pools;
  poolData?: PoolData;
  userShareData?: UserShareData;
}
export interface DepositPayload {
  poolKey: Pools;
  masterchefDeposit?: boolean;
  shouldDepositWrapped: boolean;
  tokenAmounts: { [K in TokenSymbols]?: BigNumber };
}

export enum WithdrawType {
  ALL = "ALL",
  IMBALANCE = "IMBALANCE",
}
export type TokenAmounts = { [K in TokenSymbols]?: BigNumber };
export interface WithdrawPayload {
  poolKey: Pools;
  masterchefwithdraw?: boolean;
  type: WithdrawType | TokenSymbols;
  lpTokenAmountToSpend: BigNumber;
  tokenAmounts: TokenAmounts;
  //a yield call-able function
  onSuccess?: any;
}

export interface TokenShareType {
  percent: string;
  symbol: string;
  value: BigNumber;
}

export interface PoolData {
  adminFee: BigNumber;
  aParameter: BigNumber;
  apr: number | null;
  rapr: number | null;
  extraapr: number | null;
  name: string;
  reserve: BigNumber | null;
  swapFee: BigNumber;
  tokens: TokenShareType[];
  totalLocked: BigNumber;
  utilization: BigNumber | null;
  virtualPrice: BigNumber;
  volume: number | null;
  isPaused: boolean;
  lpTokenPriceUSD: BigNumber;
  lpToken: string;
}

export interface UserShareData {
  name: string;
  share: BigNumber;
  underlyingTokensAmount: BigNumber;
  usdBalance: BigNumber;
  tokens: {
    symbol: string;
    percent: string;
    value: BigNumber;
  }[];
  lpTokenBalance: BigNumber;
  masterchefBalance: MasterchefResponse | null;
}
export interface SwapStatsReponse {
  symbol: string;
  tokenaddress: string;
  swapaddress: string;
  last_apr: number;
  last_vol: number;
}
export interface RewardsState {
  lastTransactionTimes: any;
  swapStats: any;
  masterchefApr: MasterchefApr | undefined;
  isGettingMasterChefBalances: boolean;
  isGettingMasterchefApr: boolean;
  isGettingPoolsData: boolean;
  isGettingSwapStats: boolean;
  masterChefBalances: { [key: string]: MasterchefResponse } | undefined;
  pools: { [K in Pools]?: Pool };
  isDepositing: boolean;
  isWithdrawing: boolean;
}

export type ContainerState = RewardsState;
