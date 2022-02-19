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
}

export interface Token {
  name: string;
  symbol: string;
  address: string;
  decimals: number;
  ABI: any;
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
