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
  FRAX = "FRAX",
  DAI = "DAI.e",
  AVAI = "AVAI",
  TSD = "TSD",
  USDC = "USDC",
  MIM = "MIM",
  TEDDY = "TEDDY",
  FXS = "FXS",
  WAVAX = "WAVAX",
  TUSD = "TUSD",
  USDCe = "USDC.e",
  JLP = "JLP",
  as4dUSD = "as4dUSD",
  usdcAM3DUSD = "usdcAM3DUSD",
  ac4dUSD = "ac4dUSD",
  aa3dUSD = "aa3dUSD",
  am3dUSD = "am3dUSD",
  ORCA = "ORCA",
  //Fuji token symbols
  STABLE1 = "STABLE1",
  STABLE2 = "STABLE2",
  STABLE3 = "STABLE3",
  P3T = "P3T",
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
  swapRouterAddress: string;
  swapRouterABI: any;
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
