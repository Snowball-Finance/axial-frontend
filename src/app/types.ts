import { ethers } from "ethers";

/* eslint-disable */
export enum AppPages {
  RootPage = '/',
  HomePage = '/home',
  GovernancePage = '/governance',
  StakingPage = "/staking",
  LiquidityPage = "/pools",
  RewardPage = "/rewards",
  RiskPage = "/risk",
}
export type PrivateProvider = ethers.providers.StaticJsonRpcProvider;
export type Contract = ethers.Contract;

export enum NavigationRouteName {
  SWAP = "swap",
  LIQUIDITY = "liquidity",
  REWARDS = "rewards",
  STAKING = "staking",
  GOVERNANCE = "governance",
  RISK = "risk",
}
export type PrivateProvider = ethers.providers.StaticJsonRpcProvider
export type Contract = ethers.Contract