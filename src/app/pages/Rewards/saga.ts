import { GlobalDomains } from "app/appSelectors";
import { RewardsActions } from "app/containers/Rewards/slice";
import { ApproveAndDepositPayload, Pool } from "app/containers/Rewards/types";
import { floatToBN } from "common/format";
import { put, select, takeLatest } from "redux-saga/effects";
import { RewardsPageDomains } from "./selectors";
import { RewardsPageActions } from "./slice";

export function* deposit() {
  const selectedPool: Pool = yield select(RewardsPageDomains.pool);
  const value = yield select(RewardsPageDomains.depositValue) || "0";
  const token = selectedPool.lpToken;
  const dataToSend: ApproveAndDepositPayload = {
    poolName: selectedPool.key,
    masterchefDeposit: true,
    tokenAmounts: {
      [token.symbol]: floatToBN(Number(value), token.decimals),
    },
  };
  if (selectedPool.underlyingPoolTokens) {
    selectedPool.underlyingPoolTokens.forEach((element) => {
      dataToSend.tokenAmounts[element.symbol] = floatToBN(0, element.decimals);
    });
  }
  yield put(RewardsActions.approveAndDeposit(dataToSend));
}

export function* rewardsPageSaga() {
  yield takeLatest(RewardsPageActions.deposit.type, deposit);
}
