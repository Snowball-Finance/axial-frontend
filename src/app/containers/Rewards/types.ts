/* --- STATE --- */

import { BigNumber } from "ethers";
import { Token, TokenSymbols } from "../Swap/types";

interface PoolInfo {
  amount: BigNumber;
}

export interface PendingTokens {
  pendingAxial: BigNumber;
}

export interface poolBalance {
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
export interface BalanceResponse {
  [key: string]: //key is token address
  poolBalance;
}

export interface AprData {
  [swapAddress: string]: {
    apr: number;
    lptvl: number;
    totalStaked: string;
    tokenPoolPrice: number;
  };
}

export enum Pools {
  // AXIAL_AS4D = "AXIAL_AS4D",
  // AXIAL_AC4D = "AXIAL_AC4D",
  // AXIAL_AM3D = "AXIAL_AM3D",
  // AXIAL_AA3D = "AXIAL_AA3D",
  // AXIAL_JLP = "AXIAL_JLP",
  // USDC_AM3D = "USDC_AM3D",
  SCALES = "SCALES",
  HERO = "HERO",
  AS4D = "AS4D",
  AC4D = "AC4D",
  AM3D = "AM3D",
  //Fuji pools
  P3T = "P3T",
  PGL = "PGL",
  S3T = "S3T",
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
  gauge_address: string;
}
export interface DepositPayload {
  poolKey: Pools;
  rewardsDeposit?: boolean;
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
  rewardsWithdraw?: boolean;
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
  poolBalance: poolBalance | null;
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
  aprData: AprData | undefined;
  isGettingPoolsBalances: boolean;
  isGettingAprData: boolean;
  isGettingPoolsData: boolean;
  isGettingSwapStats: boolean;
  poolsBalances: { [key: string]: poolBalance } | undefined;
  pools: { [K in Pools]?: Pool };
  isDepositing: boolean;
  isWithdrawing: boolean;
}

export const TRANSACTION_TYPES = {
  DEPOSIT: "DEPOSIT",
  WITHDRAW: "WITHDRAW",
  SWAP: "SWAP",
  MIGRATE: "MIGRATE",
};

export type ContainerState = RewardsState;
