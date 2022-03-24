import { Pools } from "app/containers/Rewards/types";
import { PoolInfoByAddressMap, PoolsRouteIndex } from "app/pages/Rewards/types";

export const getPoolIndexFromKey = (poolKey: string) => {
  switch (poolKey) {
    case Pools.AXIAL_AA3D:
      return PoolsRouteIndex.AXIAL_AA3D_ROUTE;
    case Pools.AXIAL_AC4D:
      return PoolsRouteIndex.AXIAL_AC4D_ROUTE;
    case Pools.AXIAL_AM3D:
      return PoolsRouteIndex.AXIAL_AM3D_ROUTE;
    case Pools.AXIAL_AS4D:
      return PoolsRouteIndex.AXIAL_AS4D_ROUTE;
    case Pools.AXIAL_JLP:
      return PoolsRouteIndex.AXIAL_JLP_ROUTE;
    case Pools.USDC_AM3D:
      return PoolsRouteIndex.USDC_AM3D_ROUTE;
    default:
      return null;
  }
};

export const getKeyFromPoolIndex = (poolIndex: string) => {
  switch (poolIndex) {
    case PoolsRouteIndex.AXIAL_AA3D_ROUTE:
      return Pools.AXIAL_AA3D;
    case PoolsRouteIndex.AXIAL_AC4D_ROUTE:
      return Pools.AXIAL_AC4D;
    case PoolsRouteIndex.AXIAL_AM3D_ROUTE:
      return Pools.AXIAL_AM3D;
    case PoolsRouteIndex.AXIAL_AS4D_ROUTE:
      return Pools.AXIAL_AS4D;
    case PoolsRouteIndex.AXIAL_JLP_ROUTE:
      return Pools.AXIAL_JLP;
    case PoolsRouteIndex.USDC_AM3D_ROUTE:
      return Pools.USDC_AM3D;
    default:
      return null;
  }
};

export const POOLS_INFO_MAP: PoolInfoByAddressMap = {
  [Pools.AXIAL_AS4D]: {
    pair: "AS4D",
    snowglobeAddress: "0xB164cA68a881cb7cabaE22fcd2AC02008561d40F",
  },
  [Pools.AXIAL_AC4D]: {
    pair: "AC4D",
    snowglobeAddress: "0xce589add607A2e541EEa8eEFB3544e3B0Ba2dFf9",
  },
  [Pools.AXIAL_AM3D]: {
    pair: "AM3D",
    snowglobeAddress: "0x35c21956ca9876f98059C12F81E31425bB30b53D",
  },
  [Pools.AXIAL_AA3D]: {
    pair: "AA3D",
    snowglobeAddress: "0xb4281C75bab70734CDe886A9f6624385e88429CC",
  },
  [Pools.AXIAL_JLP]: {
    pair: "AVAX-AXIAL",
    snowglobeAddress: "0xa9ebe7B640F65077c16803Ff1275D790796038a0",
  },
};
