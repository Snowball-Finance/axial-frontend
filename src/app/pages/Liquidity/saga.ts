import { GlobalDomains } from "app/appSelectors";
import { ApproveAndDepositPayload, ApproveAndWithdrawPayload, Pool } from "app/containers/Rewards/types";
import { floatToBN } from "common/format";
import { delay, select, takeLatest } from "redux-saga/effects";
import { LiquidityPageDomains } from "./selectors";
import { LiquidityPageActions } from "./slice";

export function* deposit() {
  const depositTokenAmounts = yield select(
    LiquidityPageDomains.depositTokenAmounts
  );
  const tokens = yield select(GlobalDomains.tokens);
  const pool: Pool = yield select(LiquidityPageDomains.pool);
  const tmp = {};
  for (let k in depositTokenAmounts) {
    const v = depositTokenAmounts[k];
    const num = Number(v);
    const toSend = floatToBN(num, tokens[k].decimals);
    tmp[k] = toSend;
  }
const dataToSend:ApproveAndDepositPayload={
  poolName: pool.key,
  tokenAmounts: tmp,
}
console.log(dataToSend)
  // yield put(
  //   RewardsActions.approveAndDeposit(dataToSend)
  // );
}

export function* withdraw(action: {
  type: string;
  payload: ApproveAndWithdrawPayload;
}) {
  const { payload } = action;
  console.log(payload)
  // yield put(RewardsActions.approveAndWithdraw(payload));
  yield delay(0)
}

export function* liquidityPageSaga() {
  yield takeLatest(LiquidityPageActions.deposit.type, deposit);
  yield takeLatest(LiquidityPageActions.withdraw.type, withdraw);
}
