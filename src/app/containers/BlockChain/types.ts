import { Contract } from "app/types";
import { BigNumber } from "ethers";

/* --- STATE --- */
export interface BlockChainState {
  isGettingSnobBalance: boolean;
  isGettingSnowConeBalance: boolean;
  snowballBalance: BigNumber | undefined
  snowConeBalance: BigNumber | undefined
  totalSnowConeSupply: BigNumber
  totalSnowConeValue: string,
  prices: {
    SNOB: number,
    SNOB24HChange: number,
  }
  contracts: {
    snob: Contract | undefined,
    snowCone: Contract | undefined,
    gaugeProxy: Contract | undefined
  }
}

export type ContainerState = BlockChainState;