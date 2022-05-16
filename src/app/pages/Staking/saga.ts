import { StakingActions } from "app/containers/BlockChain/Governance/Staking/slice";
import { BlockChainDomains } from "app/containers/BlockChain/selectors";
import { BNToString } from "common/format";
import { BigNumber } from "ethers";
import { subtract } from "precise-math";
import { toast } from "react-toastify";
import { put, select, takeLatest } from "redux-saga/effects";
import { StakingPageDomains } from "./selectors";

import { StakingPageActions } from "./slice";

export function* stakeAllTheBalances() {
  const mainTokenBalance = yield select(
    BlockChainDomains.selectMainTokenBalanceDomain
  );
  if (mainTokenBalance) {
    const stringMainTokenBalance =
      parseFloat(BNToString(mainTokenBalance ?? BigNumber.from(0), 18) || "0") +
      "";
    yield put(
      StakingPageActions.setEnteredMainTokenToStake(stringMainTokenBalance)
    );
  }
}

export function* stakeGovernanceToken() {
  yield put(StakingPageActions.setIsModalOpen(true));
  const enteredBalance = yield select(
    StakingPageDomains.selectEnteredMainTokenToStakeDomain
  );
  if (!enteredBalance || isNaN(Number(enteredBalance))) {
    toast.warn("please enter a valid amount");
    return;
  }
  const previousNumberOfLockedDays: number = yield select(
    StakingPageDomains.remainingDaysToUnlock
  );
  const date = yield select(StakingPageDomains.selectSelectedEpochDomain);
  const endDate = new Date(date);
  let startDate = new Date();
  let duration = ((endDate.getTime() - startDate.getTime()) / 1000).toFixed(0);
  let finalDurationToAdd = duration;
  if (previousNumberOfLockedDays) {
    finalDurationToAdd = subtract(
      Number(duration),
      previousNumberOfLockedDays * 24 * 60 * 60
    ).toString();
  }
  if (Number(finalDurationToAdd) < 0) {
    finalDurationToAdd = "0";
  }
  yield put(
    StakingActions.stakeGovernanceToken({
      amount: enteredBalance,
      duration: finalDurationToAdd,
    })
  );
}

export function* stakeAccruingToken() {
  yield put(StakingPageActions.setIsModalOpen(true));
  const enteredBalance = yield select(
    StakingPageDomains.selectEnteredMainTokenToStakeIntoVeAxialDomain
  );
  if (!enteredBalance || isNaN(Number(enteredBalance))) {
    return;
  }
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
