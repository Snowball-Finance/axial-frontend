import { GlobalDomains } from "app/appSelectors";
import { RewardsActions } from "app/containers/Rewards/slice";
import { Pool } from "app/containers/Rewards/types";
import { floatToBN } from "common/format";
import { put, select, takeLatest } from "redux-saga/effects";
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
  yield put(
    RewardsActions.approveAndDeposit({
      poolName: pool.key,
      tokenAmounts: tmp,
    })
  );
}

export function* liquidityPageSaga() {
  yield takeLatest(LiquidityPageActions.deposit.type, deposit);
}
