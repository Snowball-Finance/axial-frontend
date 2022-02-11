import { BigNumber, Contract } from "ethers";

export interface GaugeItem {
  address: string;
  balance: BigNumber;
  depositTokenName: string;
  fullApy: number;
  gaugeAddress: string;
  harvestable: BigNumber;
  poolName: string;
  source: string;
  staked: BigNumber;
  token: string;
  totalSupply: BigNumber;
  totalWeight: number;
  selected: boolean;
  allocPoint: number;
  enteredAllocation: number;
  allocationPerDay: number;
}

export interface GaugeInfo {
  address: string;
  fullDailyAPY: number;
  fullWeeklyAPY: number;
  fullYearlyAPY: number;
  snobAllocation: number;
  snobDailyAPR: number;
  snobWeeklyAPR: number;
  snobYearlyAPR: number;
  tvlStaked: number;
}

export interface PoolToken {
  address: string;
  decimals: number;
  name: string;
  pangolinPrice: number;
  supply: number;
  symbol: string;
}

export interface PoolInfoItem {
  isDetailsOpen: boolean;
  address: string;
  dailyAPR: number;
  dailyAPY: number;
  deprecated: boolean;
  userLPBalance?: BigNumber;
  gauge: GaugeItem;
  gaugeInfo: GaugeInfo;
  kind: string;
  lpAddress: string;
  name: string;
  pricePoolToken: number;
  source: string;
  symbol: string;
  tvlStaked: number;
  weeklyAPY: number;
  yearlyAPY: number;
  token0: PoolToken;
  token1?: PoolToken;
  token2?: PoolToken;
  token3?: PoolToken;
  token4?: PoolToken;
}

export interface LastInfo {
  blockHeight: number;
  blocksPast24hrs: number;
  createdAt: string;
  poolsInfo: PoolInfoItem[];
}

export interface PoolProvider {
  name: string;
  //any is used because I still am not sure what will the type be
  //FIXME
  icon: any;
}

/* --- STATE --- */
export interface PoolsAndGaugesState {
  isLoadingLastInfo: boolean;
  isLoadingUserPoolsAndGauges: boolean;
  isGettingGauges: boolean;
  gaugeProxyABI: any;
  gaugeContract: Contract | undefined;
  gauges: GaugeItem[];
  pools: { [key: string]: PoolInfoItem };
  gotUserPools: boolean;
  lastInfo: LastInfo | undefined;
  poolProviders: { [key: string]: PoolProvider };
}

export type ContainerState = PoolsAndGaugesState;
