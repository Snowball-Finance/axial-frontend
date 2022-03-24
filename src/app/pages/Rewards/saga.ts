import { toast } from "react-toastify";
import { call, put, takeLatest } from "redux-saga/effects";

import { getPoolInfoByAddressAPI } from "./providers/getPoolInfoByAddress";
import { RewardsPageActions } from "./slice";

export function* poolInfoByAddress(action: { type: string; payload: string }) {
  const { payload } = action;

  yield put(RewardsPageActions.setCompoundWithSnowballLoading(true));

  try {
    const { data } = yield call(getPoolInfoByAddressAPI, payload);
    const compoundWithSnowballAPY =
      data?.PoolsInfoByAddress.gaugeInfo.snobYearlyAPR +
      data?.PoolsInfoByAddress.yearlyAPY +
      data?.PoolsInfoByAddress.yearlySwapFees;

    yield put(
      RewardsPageActions.setCompoundWithSnowballAPY(compoundWithSnowballAPY)
    );
  } catch (error) {
    console.log("error", error);
    toast.error("error while getting pool info");
  } finally {
    yield put(RewardsPageActions.setCompoundWithSnowballLoading(false));
  }
}

export function* rewardsPageSaga() {
  yield takeLatest(
    RewardsPageActions.poolInfoByAddress.type,
    poolInfoByAddress
  );
}
