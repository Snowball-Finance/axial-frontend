import { toast } from "react-toastify";
import { call, put, select, takeLatest } from "redux-saga/effects";

import { Web3Domains } from "app/containers/BlockChain/Web3/selectors";
import {
  DepositPayload,
  WithdrawPayload,
  Pool,
} from "app/containers/Rewards/types";
import { floatToBN } from "common/format";
import { BigNumber, Contract } from "ethers";
import { RewardsPageDomains } from "./selectors";
import { RewardsPageActions } from "./slice";
import { getPoolInfoByAddressAPI } from "./providers/getPoolInfoByAddress";
import { RewardsActions } from "app/containers/Rewards/slice";
import { parseUnits } from "ethers/lib/utils";
import { TokenSymbols } from "app/containers/Swap/types";
import { checkAndApproveTokensInList } from "utils/tokenVerifier";
import { getRewardPoolData } from "app/containers/Rewards/saga";
import GAUGE_ABI from "abi/gauge.json";
import { Gauge } from "abi/ethers-contracts";
import { RewardsDomains } from "app/containers/Rewards/selectors";

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

export function* deposit() {
  const selectedPool: Pool = yield select(RewardsPageDomains.pool);
  const value = yield select(RewardsPageDomains.depositValue) || "0";
  const token = selectedPool.lpToken;
  const amountToSpend = floatToBN(Number(value), token.decimals);
  const dataToSend: DepositPayload = {
    poolKey: selectedPool.key,
    rewardsDeposit: true,
    shouldDepositWrapped: false,
    tokenAmounts: {
      [token.symbol]: amountToSpend,
    },
  };
  yield put(RewardsPageActions.setIsModalOpen(true));
  const areAllApproved = yield call(checkAndApproveTokensInList, {
    tokensToVerify: [
      {
        amount: amountToSpend || BigNumber.from(0),
        spenderAddress: selectedPool.gauge_address,
        token,
      },
    ],
  });
  if (areAllApproved) {
    yield put(RewardsActions.deposit(dataToSend));
  } else {
    toast.error("you need to approve the token first");
  }
}

export function* withdraw() {
  const pool: Pool = yield select(RewardsPageDomains.pool);
  const amount = yield select(RewardsPageDomains.withdrawAmount);
  const tokenAmounts = {
    [pool.lpToken.symbol]:
      floatToBN(amount, pool.lpToken.decimals) || BigNumber.from("0"),
  };
  const userShareData = pool.userShareData;
  const withdrawPercentage: number = yield select(
    RewardsPageDomains.withdrawPercentage
  );
  let effectiveUserLPTokenBalance =
    floatToBN(amount, pool.lpToken.decimals) || BigNumber.from("0");
  if (userShareData && withdrawPercentage) {
    effectiveUserLPTokenBalance =
      userShareData.poolBalance?.userInfo.amount
        .mul(parseUnits(withdrawPercentage.toString(), 5)) // difference between numerator and denominator because we're going from 100 to 1.00
        .div(10 ** 7) ?? BigNumber.from("0");
  }

  const dataToSend: WithdrawPayload = {
    tokenAmounts,
    poolKey: pool.key,
    lpTokenAmountToSpend: effectiveUserLPTokenBalance,
    type: pool.lpToken.symbol as TokenSymbols,
    rewardsWithdraw: true,
  };
  yield put(RewardsPageActions.setIsModalOpen(true));
  yield put(RewardsActions.withdraw(dataToSend));
}

export function* claim(action: { type: string; payload: Pool }) {
  const pool = action.payload;
  const poolBalances=yield select(RewardsDomains.poolsBalances)
  const library = yield select(Web3Domains.selectLibraryDomain);
  const balance=poolBalances[pool.lpToken.symbol]?.pendingTokens?.pendingAxial
yield put(RewardsPageActions.setSymbolForClaimingPendingAxial(pool.lpToken.symbol));
  const gaugeContract = new Contract(
    pool.gauge_address,
    GAUGE_ABI,
    library?.getSigner()
  ) as Gauge;
  try {
    yield call(gaugeContract.withdraw, balance);
    yield put(RewardsPageActions.setSymbolForClaimingPendingAxial(''));
  } catch (e) {
    console.log(e);
    toast.error("error while claiming");
    yield put(RewardsPageActions.setSymbolForClaimingPendingAxial(''));

  }



}

export function* getRewardsPoolData() {
  const pool: Pool = yield select(RewardsPageDomains.pool);
  if (pool) {
    const poolData = yield call(getRewardPoolData, {
      pool,
      isRewardsPool: true,
    });
    yield put(
      RewardsPageActions.setRewardsPageUserShareData(poolData.userShareData)
    );
  }
}

export function* rewardsPageSaga() {
  yield takeLatest(
    RewardsPageActions.poolInfoByAddress.type,
    poolInfoByAddress
  );
  yield takeLatest(RewardsPageActions.deposit.type, deposit);
  yield takeLatest(
    RewardsPageActions.getRewardPoolData.type,
    getRewardsPoolData
  );
  yield takeLatest(RewardsPageActions.withdraw.type, withdraw);
  yield takeLatest(RewardsPageActions.claim.type, claim);
}
