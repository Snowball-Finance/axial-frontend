import { StakingActions } from "app/containers/BlockChain/Governance/Staking/slice";
import { BlockChainDomains } from "app/containers/BlockChain/selectors";
import { BNToString } from "common/format";
import { BigNumber } from "ethers";
import { add, subtract } from "precise-math";
import { toast } from "react-toastify";
import { put, select, takeLatest } from "redux-saga/effects";
import { StakingPageDomains } from "./selectors";

import { StakingPageActions } from "./slice";

export function* stakeAllTheMainTokenBalance() {
  const mainTokenBalance = yield select(
    BlockChainDomains.selectMainTokenBalanceDomain
  );
  if (mainTokenBalance) {
    const stringMainTokenBalance =
      BNToString(mainTokenBalance ?? BigNumber.from(0), 18) || "0";
    yield put(
      StakingPageActions.setEnteredMainTokenToStake(stringMainTokenBalance)
    );
  }
}

export function* stakeAllTheMainTokensIntoAccruing() {
  const mainTokenBalance: BigNumber = yield select(
    BlockChainDomains.selectMainTokenBalanceDomain
  );
  if (mainTokenBalance) {
    const stringMainTokenBalance =
      BNToString(mainTokenBalance ?? BigNumber.from(0), 18) || "0";

    yield put(
      StakingPageActions.setEnteredMainTokenToStakeIntoVeAxial(
        stringMainTokenBalance
      )
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
  const twoYearsInSeconds = 2 * 365 * 24 * 60 * 60;
  if (add(Number(finalDurationToAdd), Number(duration)) > twoYearsInSeconds) {
    let num = subtract(Number(finalDurationToAdd), 2 * 60 * 60 * 24);
    if (num < 0) {
      num = 0;
    }
    finalDurationToAdd = num.toString();
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

export function* stakingPageSaga() {
  yield takeLatest(
    StakingPageActions.stakeAllTheMainTokenBalance.type,
    stakeAllTheMainTokenBalance
  );
  yield takeLatest(
    StakingPageActions.stakeAllTheMainTokensIntoAccruing.type,
    stakeAllTheMainTokensIntoAccruing
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
