import { ethers } from "ethers";

/* eslint-disable */
export enum AppPages {
  RootPage = "/",
  HomePage = "/home",
  Playground = "/playground",
  GovernancePage = "/governance",
  StakingPage = "/staking",
  LiquidityPage = "/liquidity",
  RewardPage = "/rewards",
  RiskPage = "/risk",
}

export enum NavigationRouteName {
  SWAP = "swap",
  LIQUIDITY = "liquidity",
  REWARDS = "rewards",
  STAKING = "staking",
  GOVERNANCE = "governance",
  RISK = "risk",
}
export type PrivateProvider = ethers.providers.StaticJsonRpcProvider;
export type Contract = ethers.Contract;
