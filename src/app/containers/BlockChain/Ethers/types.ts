import { ethers } from "ethers";

/* --- STATE --- */
export interface EthersState {
  isNodeHealthy: boolean;
  isCheckingNodeHealth: boolean;
  privateProvider: ethers.providers.StaticJsonRpcProvider | undefined;
}

export type ContainerState = EthersState;
