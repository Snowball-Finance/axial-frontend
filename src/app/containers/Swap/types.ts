import { BigNumber } from "ethers";

/* --- STATE --- */

export interface BestPath {
  bestPath: {
    adapters: string[];
    amounts: BigNumber[];
    gasEstimate: BigNumber;
    path: string[];
  };
  useInternalRouter: boolean;
}

export enum TokenSymbols {
  USDTe = "USDT.e",
  USDt = "USDt",
  FRAX = "FRAX",
  DAI = "DAI.e",
  TSD = "TSD",
  USDC = "USDC",
  MIM = "MIM",
  TUSD = "TUSD",
  USDCe = "USDC.e",
  YUSD = "YUSD",
  SCALES = "SCALES",
  HERO = "HERO",
  AS4D = "AS4D",
  AC4D = "AC4D",
  AM3D = "AM3D",
  //Fuji token symbols
  STABLE1 = "STABLE1",
  STABLE2 = "STABLE2",
  STABLE3 = "STABLE3",
  STABLE4 = "STABLE4",
  STABLE5 = "STABLE5",
  P3T = "P3T",
  S3T = "S3T",
  PGL = "PGL",
  AXIAL = "AXIAL",
}

export interface Token {
  name: string;
  symbol: string;
  address: string;
  decimals: number;
  ABI: any;
  logo?: string;
  geckoId: string;
  masterchefId?: number;
  isLPToken: boolean;
  isSynthetic: boolean;
  balance?: BigNumber;
  blockSwap?: boolean;
}

export enum GasPrices {
  Standard = "STANDARD",
  Fast = "FAST",
  Instant = "INSTANT",
  Custom = "CUSTOM",
}

export enum Slippages {
  One = "ONE",
  OneTenth = "ONE_TENTH",
  Custom = "CUSTOM",
}

export interface SwapState {
  aggregatorAddress: string;
  aggregatorABI: any;
  tokens: { [K in TokenSymbols]?: Token };
  isGettingBestPath: boolean;
  bestPath: BestPath | undefined;
  isSwapping: boolean;
  selectedGasPrice: GasPrices;
  isTokenApproved: boolean;
  isApproving: boolean;
}

export interface FindBestPathPayload {
  amountToGive: BigNumber;
  fromToken: Token;
  toToken: Token;
}

export type ContainerState = SwapState;
