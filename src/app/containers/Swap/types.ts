import { BigNumber } from "ethers";

/* --- STATE --- */

export interface BestPath {
  adapters: string[];
  amounts: BigNumber[];
  gasEstimate: BigNumber;
  path: string[];
}

export enum TokenSymbols {
  USDTe = "USDT.e",
  FRAX = "FRAX",
  DAI = "DAI.e",
  AVAI= "AVAI",
  TSD = "TSD",
  USDC= "USDC",
  MIM= "MIM",
  TEDDY= "TEDDY",
  FXS= "FXS",
  WAVAX= "WAVAX",
  TUSD= "TUSD",
  USDCe= "USDC.e",
}

export interface Token {
  name: string;
  symbol: string;
  address: string;
  decimals: number;
  ABI: any;
  logo?: string;
}

export enum GasPrices {
  Standard = "STANDARD",
  Fast = "FAST",
  Instant = "INSTANT",
  Custom = "CUSTOM",
}

export interface SwapState {
  swapRouterAddress: string;
  swapRouterABI: any;
  tokens: { [K in TokenSymbols]?: Token };
  isGettingBestPath: boolean;
  bestPath: BestPath | undefined;
  isSwapping: boolean;
  infiniteApproval: boolean;
  selectedGasPrice: GasPrices;
}

export interface FindBestPathPayload {
  amountToGive: BigNumber;
  fromTokenSymbol: TokenSymbols;
  toTokenSymbol: TokenSymbols;
}

export type ContainerState = SwapState;
