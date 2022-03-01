import { Token } from "app/containers/Swap/types";

/* --- STATE --- */
export interface SwapPageState {
  selectedFromToken: Token|undefined;
  selectedToToken: Token|undefined;
  fromAmount: string;
  toAmount: string;
  
}

export type ContainerState = SwapPageState;