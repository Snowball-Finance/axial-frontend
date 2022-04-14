import { toast } from "react-toastify";
import { call, put, select, takeLatest } from "redux-saga/effects";

import { Web3Domains } from "app/containers/BlockChain/Web3/selectors";
import { AXIAL_MASTERCHEF_CONTRACT_ADDRESS } from "app/containers/Rewards/constants";
import masterchef from "abi/masterchef.json";
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
  const amountToSpend = floatToBN(Number(value), token.decimals)
  const dataToSend: DepositPayload = {
    poolKey: selectedPool.key,
    masterchefDeposit: true,
    shouldDepositWrapped: false,
    tokenAmounts: {
      [token.symbol]: amountToSpend,
    },
  };
  yield put(RewardsActions.setIsDepositing(true));
  const areAllApproved = yield call(checkAndApproveTokensInList, {
    tokensToVerify: [
      {
        amount: amountToSpend || BigNumber.from(0),
        swapAddress: AXIAL_MASTERCHEF_CONTRACT_ADDRESS,
        token,
      }
    ]
  });
  yield put(RewardsActions.setIsDepositing(false));
  if (areAllApproved) {
    yield put(RewardsActions.deposit(dataToSend));
  }
  else {
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
      userShareData.masterchefBalance?.userInfo.amount
        .mul(parseUnits(withdrawPercentage.toString(), 5)) // difference between numerator and denominator because we're going from 100 to 1.00
        .div(10 ** 7) ?? BigNumber.from("0");
  }

  const dataToSend: WithdrawPayload = {
    tokenAmounts,
    poolKey: pool.key,
    lpTokenAmountToSpend: effectiveUserLPTokenBalance,
    type: pool.lpToken.symbol as TokenSymbols,
    masterchefwithdraw: true,
  };
  yield put(RewardsActions.withdraw(dataToSend));
}

export function* claim(action: { type: string; payload: Pool }) {
  const pool = action.payload;
  const library = yield select(Web3Domains.selectLibraryDomain);
  const materchefContract = new Contract(
    AXIAL_MASTERCHEF_CONTRACT_ADDRESS,
    masterchef,
    library?.getSigner()
  );
  try {
    yield call(materchefContract.withdraw, pool.lpToken.masterchefId, 0);
  } catch (e) {
    console.log(e);
  }
}

export function* rewardsPageSaga() {
  yield takeLatest(
    RewardsPageActions.poolInfoByAddress.type,
    poolInfoByAddress
  );
  yield takeLatest(RewardsPageActions.deposit.type, deposit);
  yield takeLatest(RewardsPageActions.withdraw.type, withdraw);
  yield takeLatest(RewardsPageActions.claim.type, claim);
}
