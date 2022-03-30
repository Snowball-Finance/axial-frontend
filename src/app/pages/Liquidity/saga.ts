import { Contract } from "ethers";
import { call, put, select, takeLatest } from "redux-saga/effects";

import { GlobalDomains } from "app/appSelectors";
import { RewardsActions } from "app/containers/Rewards/slice";
import {
  ApproveAndDepositPayload,
  ApproveAndWithdrawPayload,
  Pool,
} from "app/containers/Rewards/types";
import { floatToBN } from "common/format";
import { LiquidityPageDomains, LiquidityPageSelectors } from "./selectors";
import { LiquidityPageActions } from "./slice";
import { SwapFlashLoanNoWithdrawFee } from "abi/ethers-contracts";
import { getProviderOrSigner } from "app/containers/utils/contractUtils";
import { Web3Domains } from "app/containers/BlockChain/Web3/selectors";
import { Token } from "app/containers/Swap/types";
import { FromTransactionData } from "./types";
import { GenericGasResponse } from "app/providers/gasPrice";
import {
  Deadlines,
  formatDeadlineToNumber,
} from "app/containers/Rewards/utils/deadline";

export function* buildTransactionData() {
  const depositTokenAmounts = yield select(
    LiquidityPageDomains.depositTokenAmounts
  );
  const depositRaw = yield select(LiquidityPageDomains.depositRaw);
  const tokens = yield select(GlobalDomains.tokens);
  const pool: Pool = yield select(LiquidityPageDomains.pool);
  const fromStateData: FromTransactionData = {
    tokens: [],
    total: 0,
  };
  const tokenAmounts = {};
  for (let tokenKey in depositTokenAmounts) {
    const v = depositTokenAmounts[tokenKey];
    const num = Number(v);
    const toSend = floatToBN(num, tokens[tokenKey].decimals);
    tokenAmounts[tokenKey] = toSend;
    if (num > 0) {
      fromStateData.tokens = [
        ...fromStateData?.tokens,
        {
          symbol: tokenKey,
          value: parseFloat(depositTokenAmounts[tokenKey]),
        },
      ];
      fromStateData.total =
        fromStateData.total + parseFloat(depositTokenAmounts[tokenKey]);
    }
  }

  try {
    const library = yield select(Web3Domains.selectLibraryDomain);
    const account = yield select(Web3Domains.selectAccountDomain);
    const targetContract = new Contract(
      pool.swapAddress || pool.address,
      pool.swapABI,
      getProviderOrSigner(library, account)
    );

    const shouldDepositWrapped =
      pool.swapAddress === undefined ? false : !depositRaw;

    const poolTokens = shouldDepositWrapped
      ? (pool.underlyingPoolTokens as Token[])
      : pool.poolTokens;

    const minToMint = yield call(
      (targetContract as SwapFlashLoanNoWithdrawFee).calculateTokenAmount,
      poolTokens.map(({ symbol }) => tokenAmounts[symbol]),
      true
    );

    const shareOfPool = pool.poolData?.totalLocked.gt(0);

    yield put(
      LiquidityPageActions.setDepositTransactionData({
        from: fromStateData,
        to: {
          symbol: pool?.lpToken.symbol,
          value: minToMint,
        },
        share: shareOfPool,
      })
    );
  } catch (error) {
    console.log("error", error);
  }
}

export function* buildWithdrawReviewData() {
  const withdrawTokens = yield select(
    LiquidityPageSelectors.withdrawTokenToShow()
  );
  const transactionDeadline = Deadlines.Twenty;

  let tokensData: any = [];
  let total = 0;

  for (let tokenKey in withdrawTokens) {
    if (Number(withdrawTokens[tokenKey]) > 0) {
      tokensData = [
        ...tokensData,
        {
          symbol: tokenKey,
          value: parseFloat(withdrawTokens[tokenKey]),
        },
      ];
      total = total + parseFloat(withdrawTokens[tokenKey]);
    }
  }

  try {
    const gasPrices: GenericGasResponse = yield select(GlobalDomains.gasPrice);
    const { gasFast } = gasPrices;
    const deadline = formatDeadlineToNumber(transactionDeadline);

    yield put(
      LiquidityPageActions.setWithdrawReviewData({
        tokens: tokensData,
        total,
        deadline,
        gasPrice: gasFast.toString(),
      })
    );
  } catch (error) {
    console.log("error", error);
  }
}

export function* deposit() {
  const depositTokenAmounts = yield select(
    LiquidityPageDomains.depositTokenAmounts
  );
  const depositRaw = yield select(LiquidityPageDomains.depositRaw);
  const tokens = yield select(GlobalDomains.tokens);
  const pool: Pool = yield select(LiquidityPageDomains.pool);
  const tmp = {};
  for (let k in depositTokenAmounts) {
    const v = depositTokenAmounts[k];
    const num = Number(v);
    const toSend = floatToBN(num, tokens[k].decimals);
    tmp[k] = toSend;
  }
  const dataToSend: ApproveAndDepositPayload = {
    poolKey: pool.key,
    tokenAmounts: tmp,
    shouldDepositWrapped: pool.swapAddress === undefined ? false : !depositRaw,
  };
  yield put(RewardsActions.approveAndDeposit(dataToSend));
  yield put(LiquidityPageActions.setDepositTransactionData(undefined));
}

export function* withdraw(action: {
  type: string;
  payload: ApproveAndWithdrawPayload;
}) {
  const { payload } = action;
  // console.log(payload);
  yield put(RewardsActions.approveAndWithdraw(payload));
  // yield delay(0);
}

export function* liquidityPageSaga() {
  yield takeLatest(
    LiquidityPageActions.buildTransactionData.type,
    buildTransactionData
  );
  yield takeLatest(
    LiquidityPageActions.buildWithdrawReviewData.type,
    buildWithdrawReviewData
  );
  yield takeLatest(LiquidityPageActions.deposit.type, deposit);
  yield takeLatest(LiquidityPageActions.withdraw.type, withdraw);
}
