import { Contract } from "app/types";
import { BigNumber } from "ethers";

/* --- STATE --- */
export interface BlockChainState {
  mainTokenBalance: BigNumber | undefined;
  isGettingMainTokenBalance: boolean;
  mainTokenABI: any;
  includesGovernance: boolean;
  numberOfFailedRetriesForGettingMainTokenBalance: number;
  prices: {
    mainToken: number;
    mainToken24hChange: number;
  };

}

export type ContainerState = BlockChainState;
