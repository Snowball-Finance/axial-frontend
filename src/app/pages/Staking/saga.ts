import { StakingActions } from "app/containers/BlockChain/Governance/Staking/slice";
import { BlockChainDomains } from "app/containers/BlockChain/selectors";
import { BNToString } from "common/format";
import { BigNumber } from "ethers";
import { put, select, takeLatest } from "redux-saga/effects";
import { StakingPageDomains } from "./selectors";

import { StakingPageActions } from "./slice";

export function* stakeAllTheBalances() {
  const mainTokenBalance = yield select(
    BlockChainDomains.selectMainTokenBalanceDomain
  );
  if (mainTokenBalance) {
    const stringMainTokenBalance = parseFloat(
      BNToString(mainTokenBalance ?? BigNumber.from(0), 18) || "0"
    ).toFixed(3);
    yield put(
      StakingPageActions.setEnteredMainTokenToStake(stringMainTokenBalance)
    );
  }
}

export function* stake() {
  const enteredBalance = yield select(
    StakingPageDomains.selectEnteredMainTokenToStakeDomain
  );
  const date = yield select(StakingPageDomains.selectSelectedEpochDomain);
  let duration = yield select(
    StakingPageDomains.selectSelectedDepositSliderValueDomain
  );
  duration = (Number(duration) / 25 + 1).toFixed(0);
  yield put(
    StakingActions.stakeGovernanceToken({
      balance: enteredBalance,
      duration,
      date,
    })
  );
}

export function* stakingPageSaga() {
  yield takeLatest(
    StakingPageActions.stakeAllTheBalances.type,
    stakeAllTheBalances
  );
  yield takeLatest(StakingPageActions.stake.type, stake);
}
