import { AppDispatch } from "../store"
import retry from "async-retry"
import { updateMasterchefApr } from "../store/application"
import { getVaultRewardAprNow } from "./geta4dapy"

interface MastechefApr {
    [swapAddress: string]: number
  }

export default async function fetchAprStats(
  dispatch: AppDispatch,
): Promise<void> {
  const dispatchUpdate = (aprStats: MastechefApr) => {
    dispatch(updateMasterchefApr(aprStats))
  }
  await retry(() => getVaultRewardAprNow().then(dispatchUpdate), {
    retries: 3,
  })
}
