import { Pools } from "app/containers/Rewards/types";
import { PoolsRouteIndex } from "app/pages/Rewards/types";

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