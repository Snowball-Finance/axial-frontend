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

export function* stakeGovernanceToken() {
  const enteredBalance = yield select(
    StakingPageDomains.selectEnteredMainTokenToStakeDomain
  );
  const date = yield select(StakingPageDomains.selectSelectedEpochDomain);
  const endDate = new Date(date);
  let startDate = new Date();
  let duration = ((endDate.getTime() - startDate.getTime()) / 1000)
    .toFixed(0)
    .toString();
  yield put(
    StakingActions.stakeGovernanceToken({
      amount: enteredBalance,
      duration,
    })
  );
}

export function* stakeAccruingToken() {
  const enteredBalance = yield select(
    StakingPageDomains.selectEnteredMainTokenToStakeIntoVeAxialDomain
  );

  yield put(
    StakingActions.stakeAccruingToken({
      amountToStake: enteredBalance,
    })
  );
}

export function* stakeAllTheAxialBalancesIntoVeAxial() {
  const mainTokenBalance = yield select(
    BlockChainDomains.selectMainTokenBalanceDomain
  );
  if (mainTokenBalance) {
    const stringMainTokenBalance = parseFloat(
      BNToString(mainTokenBalance ?? BigNumber.from(0), 18) || "0"
    ).toFixed(3);
    yield put(
      StakingPageActions.setEnteredMainTokenToStakeIntoVeAxial(
        stringMainTokenBalance
      )
    );
  }
}

export function* stakingPageSaga() {
  yield takeLatest(
    StakingPageActions.stakeAllTheBalances.type,
    stakeAllTheBalances
  );
  yield takeLatest(
    StakingPageActions.stakeAllTheAxialBalancesIntoVeAxial.type,
    stakeAllTheAxialBalancesIntoVeAxial
  );
  yield takeLatest(
    StakingPageActions.stakeGovernanceToken.type,
    stakeGovernanceToken
  );
  yield takeLatest(
    StakingPageActions.stakeAccruingToken.type,
    stakeAccruingToken
  );
}
