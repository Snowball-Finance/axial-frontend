/* --- STATE --- */

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
  lpToken: {
    address: string;
    logo: string;
    symbol: string;
    decimal: number;
    masterChefId: number;
  };
}

export interface RewardsState {
  tokenPricesUSD: any;
  lastTransactionTimes: any;
  swapStats: any;
  masterchefApr: any;
  pools: { [K in Pools]?: Pool };
}

export type ContainerState = RewardsState;
