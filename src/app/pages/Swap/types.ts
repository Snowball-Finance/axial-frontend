import { Token } from "app/containers/Swap/types";

/* --- STATE --- */
export interface SwapPageState {
  fromTokenError: string;
  fromToken: Token | undefined;
  toToken: Token | undefined;
  fromAmount: string;
  searchValue: string;
}

export interface TokenChangePayload {
  isFromToken: boolean;
  tokenSymbol: string;
}

export interface TokenOption {
  value: string;
  icon: string;
  decimals: number;
  balance: string;
  balanceUSD: string;
}

export type ContainerState = SwapPageState;
