import { Token } from "app/containers/Swap/types";
import { BigNumber } from "ethers";

/* --- STATE --- */
export interface SwapPageState {
  fromTokenError: string;
  fromToken: Token | undefined;
  toToken: Token | undefined;
  fromAmount: string;
  searchValue: string;
  isSwapModalOpen: boolean;
}

export interface TokenChangePayload {
  isFromToken: boolean;
  tokenSymbol: string;
}

export interface TokenOption {
  value: string;
  icon: string;
  decimals: number;
  balance: BigNumber;
  balanceUSD: BigNumber;
}

export type ContainerState = SwapPageState;
