import { BigNumber, Contract } from "ethers";

/* --- STATE --- */
export interface BlockChainState {
  mainTokenBalance: BigNumber | undefined;
  isGettingSnobBalance: boolean;
  mainTokenABI: any;
  includesGovernance: boolean;
  prices: {
    mainToken: number;
    mainToken24hChange: number;
  };
  contracts: {
    mainTokenContract: Contract | undefined;
  };
}

export type ContainerState = BlockChainState;
