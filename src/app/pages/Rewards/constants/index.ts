import { Pools } from "app/containers/Rewards/types";
import { PoolInfoByAddressMap } from "app/pages/Rewards/types";

export const POOLS_INFO_MAP: PoolInfoByAddressMap = {
  [Pools.AS4D]: {
    pair: "AS4D",
    snowglobeAddress: "0xB164cA68a881cb7cabaE22fcd2AC02008561d40F",
  },
  [Pools.AC4D]: {
    pair: "AC4D",
    snowglobeAddress: "0xce589add607A2e541EEa8eEFB3544e3B0Ba2dFf9",
  },
  [Pools.AM3D]: {
    pair: "AM3D",
    snowglobeAddress: "0x35c21956ca9876f98059C12F81E31425bB30b53D",
  },
};
