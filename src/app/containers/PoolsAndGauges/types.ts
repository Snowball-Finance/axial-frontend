import { BigNumber, Contract } from "ethers";
import { Token } from "../Swap/types";

export interface GaugeItem {
  address: string; //"0x015b16E27Ae7D4B409B44147f5AC08Ac8746e654"
  balance: BigNumber;
  depositTokenName: string; //"T3P"
  fullApy: 0;
  gaugeAddress: string; //"0x015b16E27Ae7D4B409B44147f5AC08Ac8746e654"
  harvestable: { [key: string]: BigNumber };
  poolName: string; //"T3P"
  poolTokens: PoolInfoToken[];
  staked: BigNumber;
  token: string; //"0xE730AFB0C84416e33f17a6C781e46E59C6780CC4"
  totalSupply: BigNumber;
  totalWeight: number;
  allocPoint: number;
  enteredAllocation: number;
  additionalData: {
    userInfo: {
      amount: BigNumber;
    };
    pendingTokens: {
      pendingAxial: BigNumber;
    };
  };
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

export interface PoolInfoToken {
  address: string; //"0xE68E161AA7A32403308cA0B29F15FEC1960c6ca9"
  circ_supply: string; // "0"
  created: string; //"2022-05-04T02:09:13.542Z"
  decimals: string; // "18"
  id: string; // "fabcbb54-2073-4012-98a9-39434de176d9"
  max_supply: string; // "0"
  modified: string; // "2022-05-04T02:09:13.542Z"
  name: string; //"TestToken"
  symbol: string; // "TEST"
  total_supply: string; // "0"
  harvestable?: BigNumber;
}

export interface PoolInfo {
  selected?: boolean;
  created: string; //"2022-05-04T02:09:13.551Z"
  deprecated: boolean; // false
  gauge_address: string; // "0x6bb1e54489C26da81b5E3a15826d4c96faAa5Cbe"
  id: string; //"3b82dc9c-0292-416f-be03-7d24e0613797"
  last_apr: string; //"7.647814020615907e-10"
  last_gauge_alloc: string; //"99.99901657728076"
  last_rewards_apr: string[][]; //[["0x0708F10F657b16ABE18954361E96a641b217648B","7.644675453909817e-10"]],
  last_tvl: string; // "156.7533102585309"
  last_vol: string; // "0"
  median_boost: string; // "0"
  metapool: boolean; // false
  modified: string; // "2022-05-04T07:34:55.077Z"
  swapaddress: string; //""
  symbol: string; // "TEST"
  key: string; // "TEST"
  tokenaddress: string; //"0xE68E161AA7A32403308cA0B29F15FEC1960c6ca9"
  tokens: PoolInfoToken[];
  gauge?: GaugeItem;
  last_daily_axial_alloc: string; //"0"
  last_gauge_axial_balance: string; // "0"
  last_gauge_weight: string; //"0"
  last_perc_gauge_alloc: string; //"0"
  last_swap_apr: string; //"0"
  last_token_price: string; //"501.61767527308837"
  rewardTokens: PoolRewardToken[];
}

export interface PoolRewardToken {
  address: string; //"0x0708F10F657b16ABE18954361E96a641b217648B"
  avg_apr: string; // "0"
  boosted_apr: string; //"0"
  decimals: string; //"18"
  symbol: string; // "AXIAL"
}

export interface HarvestableToken {
  token: Token;
  amountToHarvest: number;
  amountInUsd: number;
  apr: string;
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
  pools: { [key: string]: PoolInfo };
  gotUserPools: boolean;
  lastInfo: PoolInfo[] | undefined;
  poolProviders: { [key: string]: PoolProvider };
  userPoolsData: { [key: string]: GaugeItem["additionalData"] };
}

export type ContainerState = PoolsAndGaugesState;
