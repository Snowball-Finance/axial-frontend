import { AppDispatch } from "../store";
import retry from "async-retry";
import { updateMasterchefApr } from "../store/application";
import { getVaultRewardAprNow, MasterchefApr } from "./getPoolsAPR";

export default async function fetchAprStats(dispatch: AppDispatch): Promise<void> {
  const dispatchUpdate = (aprStats: MasterchefApr) => {
    dispatch(updateMasterchefApr(aprStats));
  };
  await retry(() => getVaultRewardAprNow().then(dispatchUpdate), {
    retries: 3
  });
}
