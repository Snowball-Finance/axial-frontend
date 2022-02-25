import { AppPages } from "app/types";

export enum LiquidityPathQueries {
  poolIndex = "poolIndex",
}

export const LiquiditySubPages = {
  deposit: `${AppPages.LiquidityPage}/:${LiquidityPathQueries.poolIndex}/deposit`,
  withdraw: `${AppPages.LiquidityPage}/:${LiquidityPathQueries.poolIndex}/withdraw`,
};
