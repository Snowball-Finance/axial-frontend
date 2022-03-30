import { call, put, select, takeLatest } from "redux-saga/effects";
import { BigNumber } from "ethers";

import { GlobalDomains } from "app/appSelectors";
import { BNToString } from "common/format";
import { SwapPageActions } from "./slice";
import { TokenChangePayload } from "./types";
import { SwapPageDomains } from "./selectors";
import { formatBNToString } from "app/containers/utils/contractUtils";
import { Zero } from "app/containers/Rewards/constants";
import { SwapActions } from "app/containers/Swap/slice";

function* validation() {
  const fromToken = yield select(SwapPageDomains.fromToken);
  const fromAmount = yield select(SwapPageDomains.fromAmount);
  const maxAmount =
    BNToString(fromToken?.balance ?? BigNumber.from(0), fromToken?.decimals) ||
    "0";

  if (+fromAmount > +maxAmount) {
    yield put(SwapPageActions.setFromTokenError("Insufficient balance"));
  } else {
    yield put(SwapPageActions.setFromTokenError(""));
  }
}

export function* tokenChange(action: {
  type: string;
  payload: TokenChangePayload;
}) {
  const {
    payload: { isFromToken, tokenSymbol },
  } = action;
  const tokens = yield select(GlobalDomains.tokens);
  if (isFromToken) {
    yield put(SwapPageActions.setFromToken(tokens[tokenSymbol]));
  } else {
    yield put(SwapPageActions.setToToken(tokens[tokenSymbol]));
  }
}

export function* reverseTokenChange() {
  const fromToken = yield select(SwapPageDomains.fromToken);
  const toToken = yield select(SwapPageDomains.toToken);

  yield put(SwapPageActions.setFromToken(toToken));
  yield put(SwapPageActions.setToToken(fromToken));
  yield put(SwapPageActions.setFromAmount(""));
}

export function* amountChange(action: { type: string; payload: string }) {
  const { payload } = action;

  yield call(validation);
  yield put(SwapPageActions.setFromAmount(payload));
}

export function* maxAmountSelection() {
  const fromToken = yield select(SwapPageDomains.fromToken);
  const tokens = yield select(GlobalDomains.tokens);
  const maxAmount = formatBNToString(
    tokens[fromToken?.symbol].balance || Zero,
    fromToken?.decimals
  );

  yield put(SwapPageActions.setFromAmount(maxAmount));
}

export function* confirmSwap() {
  yield put(SwapPageActions.setFromAmount(""));
  yield put(SwapPageActions.setFromToken(undefined));
  yield put(SwapPageActions.setToToken(undefined));
  yield put(SwapActions.setBestPath(undefined));
  yield put(SwapPageActions.setSwapModalOpen(false));
}

export function* swapPageSaga() {
  yield takeLatest(SwapPageActions.tokenChange.type, tokenChange);
  yield takeLatest(SwapPageActions.reverseTokenChange.type, reverseTokenChange);
  yield takeLatest(SwapPageActions.amountChange.type, amountChange);
  yield takeLatest(SwapPageActions.maxAmountSelection.type, maxAmountSelection);
  yield takeLatest(SwapPageActions.confirmSwap.type, confirmSwap);
}
