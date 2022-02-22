import { AppPages } from "app/types";

export enum RewardPathQueries {
  poolIndex = "poolIndex",
}

export const RewardSubPages = {
  deposit: `${AppPages.RewardPage}/:${RewardPathQueries.poolIndex}/deposit`,
  withdraw: `${AppPages.RewardPage}/:${RewardPathQueries.poolIndex}/withdraw`,
};
