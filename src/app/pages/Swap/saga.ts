import { call, put, select, takeLatest } from "redux-saga/effects";
import { BigNumber } from "ethers";

import { GlobalDomains } from "app/appSelectors";
import { BNToString } from "common/format";
import { SwapPageActions } from "./slice";
import { TokenChangePayload, TokensData } from "./types";
import { SwapPageDomains } from "./selectors";
import {
  calculatePrice,
  formatBNToString,
} from "app/containers/utils/contractUtils";
import { Zero } from "app/containers/Rewards/constants";
import { SwapActions } from "app/containers/Swap/slice";
import { SwapDomains } from "app/containers/Swap/selectors";
import {
  calculatePriceImpact,
  isHighPriceImpact,
} from "app/containers/Swap/utils/priceImpact";

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

export function* buildReviewSwap() {
  const fromToken = yield select(SwapPageDomains.fromToken);
  const toToken = yield select(SwapPageDomains.toToken);
  const bestPath = yield select(SwapDomains.bestPath);
  const tokenPricesUSD = yield select(GlobalDomains.tokenPricesUSD);

  const toValueUSD = toToken?.symbol
    ? calculatePrice(
        bestPath?.amounts[bestPath?.amounts.length - 1],
        tokenPricesUSD?.[toToken.symbol],
        toToken.decimals
      )
    : Zero;

  const fromValueUSD = fromToken?.symbol
    ? calculatePrice(
        bestPath?.amounts[0],
        tokenPricesUSD?.[fromToken.symbol],
        fromToken.decimals
      )
    : Zero;

  const tokenInfo: TokensData[] = [
    {
      symbol: fromToken?.symbol,
      icon: fromToken?.logo,
      value: formatBNToString(
        bestPath?.amounts[0] || Zero,
        fromToken?.decimals || 18
      ),
      valueUSD: formatBNToString(fromValueUSD, 18),
    },
    {
      symbol: toToken?.symbol,
      icon: toToken?.logo,
      value: formatBNToString(
        bestPath?.amounts[bestPath?.amounts.length - 1] || Zero,
        toToken?.decimals || 18
      ),
      valueUSD: formatBNToString(toValueUSD, 18),
    },
  ];

  const priceImpact = calculatePriceImpact(fromValueUSD, toValueUSD);
  const isHighPriceImpactTxn = isHighPriceImpact(priceImpact);

  yield put(SwapActions.tokenApprovalStatus());
  yield put(
    SwapPageActions.setReviewSwapConfirmationData({
      tokens: tokenInfo,
      isHighPriceImpactTxn,
    })
  );
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
  let value = payload;
  if (value === "") {
    value = "0";
  }
  if (value === ".") {
    value = "0.";
  }

  if (isNaN(Number(value))) {
    return;
  }
  yield call(validation);
  yield put(SwapPageActions.setFromAmount(value));
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
  yield put(SwapPageActions.setReviewSwapConfirmationData(undefined));
}

export function* swapPageSaga() {
  yield takeLatest(SwapPageActions.tokenChange.type, tokenChange);
  yield takeLatest(SwapPageActions.reverseTokenChange.type, reverseTokenChange);
  yield takeLatest(SwapPageActions.amountChange.type, amountChange);
  yield takeLatest(SwapPageActions.maxAmountSelection.type, maxAmountSelection);
  yield takeLatest(SwapPageActions.confirmSwap.type, confirmSwap);
  yield takeLatest(SwapPageActions.buildReviewSwap.type, buildReviewSwap);
}
