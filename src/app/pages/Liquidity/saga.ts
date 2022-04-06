import { BigNumber, Contract } from "ethers";
import { call, put, select, takeLatest } from "redux-saga/effects";

import { GlobalDomains } from "app/appSelectors";
import { RewardsActions } from "app/containers/Rewards/slice";
import {
  ApproveAndDepositPayload,
  ApproveAndWithdrawPayload,
  Pool,
  PoolData,
  UserShareData,
  WithdrawType,
} from "app/containers/Rewards/types";
import { BNToFloat, floatToBN } from "common/format";
import { LiquidityPageDomains, LiquidityPageSelectors } from "./selectors";
import { LiquidityPageActions } from "./slice";
import {
  LpTokenUnguarded,
  SwapFlashLoanNoWithdrawFee,
} from "abi/ethers-contracts";
import {
  getContract,
  getProviderOrSigner,
} from "app/containers/utils/contractUtils";
import { Web3Domains } from "app/containers/BlockChain/Web3/selectors";
import { Token, TokenSymbols } from "app/containers/Swap/types";
import {
  FromTransactionData,
  LiquidityPageState,
  SelectTokenToWithdrawPayload,
  TypeOfTokensToWithdraw,
  WithdrawTokenAmountChangePayload,
} from "./types";
import { GenericGasResponse } from "app/providers/gasPrice";
import {
  Deadlines,
  formatDeadlineToNumber,
} from "app/containers/Rewards/utils/deadline";
import { zeroString } from "./constants";
import { add, divide, multiply } from "precise-math";
import { formatUnits, parseUnits } from "ethers/lib/utils";
import { RewardsDomains } from "app/containers/Rewards/selectors";
import { calculatePriceImpact } from "app/containers/Swap/utils/priceImpact";
import {
  checkAndApproveTokensInList,
  checkIfTokensAreVerified,
  TokenToVerify,
} from "utils/tokenVerifier";
import LPTOKEN_UNGUARDED_ABI from "abi/lpTokenUnguarded.json";
import { addSlippage } from "utils/slippage";
import { withdrawType } from "./utils/withdrawType";

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
    LiquidityPageSelectors.withdrawTokenAmounts
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
  yield put(RewardsActions.deposit(dataToSend));
  yield put(LiquidityPageActions.setDepositTransactionData(undefined));
}

export function* withdraw() {
  const tokens = yield select(GlobalDomains.tokens);
  const selectedPool: Pool = yield select(LiquidityPageDomains.pool);
  const amountsObj = yield select(LiquidityPageDomains.withdrawTokenAmounts);
  let withdrawTokens = { ...amountsObj };
  const selectedToken = yield select(
    LiquidityPageDomains.selectedTokenToWithdraw
  );
  const lpTokenAmountToSpend = yield call(calculateLpTokenToSpend);

  if (selectedPool && tokens) {
    const tokenAmounts = {};
    for (let k in withdrawTokens) {
      const v = withdrawTokens[k];
      if (Number(v) > 0) {
        const num = Number(v);
        const toSend = floatToBN(num, tokens[k].decimals);
        tokenAmounts[k] = toSend;
      }
    }

    let type = withdrawType({
      selectedToken,
      tokenAmounts,
    });
    const dataToSend: ApproveAndWithdrawPayload = {
      poolKey: selectedPool.key,
      type,
      lpTokenAmountToSpend,
      tokenAmounts,
    };
    yield put(RewardsActions.approveAndWithdraw(dataToSend));
  }

  // console.log(payload);
  // yield delay(0);
}

export function* setAmountForTokenToWithdraw(action: {
  type: string;
  payload: WithdrawTokenAmountChangePayload;
}) {
  // state.selectedTokenToWithdraw = action.payload.symbol;
  const amountsObj = yield select(LiquidityPageDomains.withdrawTokenAmounts);
  let amounts = { ...amountsObj };
  const { symbol, value } = action.payload;
  if (!isNaN(parseFloat(value))) {
    amounts[symbol] = value;
  } else {
    amounts[symbol] = zeroString;
  }

  const numberOfTokens = Object.keys(amounts).length;
  let tokensWithNonZeroAmount = {};
  for (let token in amounts) {
    if (amounts[token] > 0) {
      tokensWithNonZeroAmount[token] = amounts[token];
    }
  }
  const numberOfTokensWithNonZeroAmount = Object.keys(
    tokensWithNonZeroAmount
  ).length;

  if (numberOfTokensWithNonZeroAmount === 0) {
    yield put(
      LiquidityPageActions.setSelectedTokenToWithdraw({
        symbol: TypeOfTokensToWithdraw.Combo,
      })
    );
  } else if (numberOfTokensWithNonZeroAmount === 1) {
    yield put(
      LiquidityPageActions.setSelectedTokenToWithdraw({
        symbol: Object.keys(tokensWithNonZeroAmount)[0] as TokenSymbols,
      })
    );
  } else if (numberOfTokensWithNonZeroAmount !== numberOfTokens) {
    yield put(
      LiquidityPageActions.setSelectedTokenToWithdraw({
        symbol: TypeOfTokensToWithdraw.Mixed,
      })
    );
  }
  //all the inputs are filled
  else {
    const selectedToken = yield select(
      LiquidityPageDomains.selectedTokenToWithdraw
    );
    if (selectedToken === TypeOfTokensToWithdraw.Combo) {
      yield put(
        LiquidityPageActions.setSelectedTokenToWithdraw({
          symbol: TypeOfTokensToWithdraw.Mixed,
        })
      );
    }
  }

  yield put(LiquidityPageActions.setTokenAmountsToWithdraw(amounts));
  yield call(calculateWithdrawBonus);
}

export function* setWithdrawPercentage(action: {
  type: string;
  payload: LiquidityPageState["withdrawPercentage"];
}) {
  const percentage = action.payload;
  const amountsObj = yield select(LiquidityPageDomains.withdrawTokenAmounts);
  const tokens = yield select(GlobalDomains.tokens);
  let amounts = { ...amountsObj };
  const selectedTokenToWithdraw = yield select(
    LiquidityPageDomains.selectedTokenToWithdraw
  );
  const tokensWithNonZeroAmount = {};
  for (let token in amounts) {
    if (amounts[token] > 0) {
      tokensWithNonZeroAmount[token] = amounts[token];
    }
  }

  const toLoop =
    selectedTokenToWithdraw === TypeOfTokensToWithdraw.Combo
      ? amounts
      : selectedTokenToWithdraw === TypeOfTokensToWithdraw.Mixed
      ? tokensWithNonZeroAmount
      : {
          [selectedTokenToWithdraw]: amounts[selectedTokenToWithdraw],
        };

  for (let symbol in toLoop) {
    const token: Token = tokens[symbol];
    const tokenBalance =
      BNToFloat(token.balance || BigNumber.from(0), token.decimals) || 0;
    const fraction = divide(multiply(tokenBalance, percentage), 100);
    amounts[symbol] = fraction.toString();
  }
  if (selectedTokenToWithdraw === "combo") {
    amounts = yield call(calculateAmountsIfItsCombo);
  }

  yield put(LiquidityPageActions.setTokenAmountsToWithdraw(amounts));
  yield call(calculateWithdrawBonus);
}

function* calculateAmountsIfItsCombo() {
  const amountsObj = yield select(LiquidityPageDomains.withdrawTokenAmounts);
  const amounts = { ...amountsObj };
  const tokens = yield select(GlobalDomains.tokens);
  const percentage = yield select(LiquidityPageDomains.withdrawPercentage);

  const tokenPrices = yield select(GlobalDomains.tokenPricesUSD);
  let sumInUsd = 0;
  for (let token in amounts) {
    const price = tokenPrices[token] || 0;
    const tokenBalance =
      BNToFloat(
        tokens[token].balance || BigNumber.from(0),
        tokens[token].decimals
      ) || 0;
    sumInUsd = add(sumInUsd, multiply(price, tokenBalance));
  }
  const eachTokenShareInUsd = divide(sumInUsd, Object.keys(amounts).length);
  const fractionOfEachTokenShare = divide(
    multiply(eachTokenShareInUsd, percentage),
    100
  );
  for (let token in amounts) {
    const price = tokenPrices[token] || 0;
    amounts[token] = multiply(fractionOfEachTokenShare, price).toString();
  }
  return amounts;
}

export function* setSelectedTokenToWithdraw(action: {
  type: string;
  payload: SelectTokenToWithdrawPayload;
}) {
  const { symbol, shouldEffectInputs } = action.payload;
  if (!shouldEffectInputs) return;

  const tokens = yield select(GlobalDomains.tokens);
  const percentage = yield select(LiquidityPageDomains.withdrawPercentage);
  const amountsObj = yield select(LiquidityPageDomains.withdrawTokenAmounts);
  let amounts = { ...amountsObj };
  const tokensWithNonZeroAmount = {};
  for (let token in amounts) {
    if (amounts[token] > 0) {
      tokensWithNonZeroAmount[token] = amounts[token];
    }
  }
  if (percentage) {
    if (symbol === TypeOfTokensToWithdraw.Combo) {
      amounts = yield call(calculateAmountsIfItsCombo);
    } else if (symbol === TypeOfTokensToWithdraw.Mixed) {
      for (let token in tokensWithNonZeroAmount) {
        const tokenBalance =
          BNToFloat(
            tokens[token].balance || BigNumber.from(0),
            tokens[token].decimals
          ) || 0;
        const fraction = divide(multiply(tokenBalance, percentage), 100);
        amounts[token] = fraction.toString();
      }
    } else {
      const tokenBalance =
        BNToFloat(
          tokens[symbol].balance || BigNumber.from(0),
          tokens[symbol].decimals
        ) || 0;
      const fraction = divide(multiply(tokenBalance, percentage), 100);
      for (let token in amounts) {
        amounts[token] = zeroString;
      }
      amounts[symbol] = fraction.toString();
    }
  } else {
    if (symbol === TypeOfTokensToWithdraw.Combo) {
      for (let token in amounts) {
        amounts[token] = zeroString;
      }
    } else {
      for (let token in amounts) {
        if (token !== symbol) {
          amounts[token] = zeroString;
        }
      }
      amounts[symbol] = zeroString;
    }
  }
  yield put(LiquidityPageActions.setTokenAmountsToWithdraw(amounts));
  yield call(calculateWithdrawBonus);
}

function* calculateWithdrawBonus() {
  const tokens = yield select(GlobalDomains.tokens);
  const amounts = yield select(LiquidityPageDomains.withdrawTokenAmounts);
  const library = yield select(Web3Domains.selectNetworkLibraryDomain);
  const account = yield select(Web3Domains.selectAccountDomain);
  let pool: Pool = yield select(LiquidityPageDomains.pool);
  const pools = yield select(RewardsDomains.pools);
  pool = pools[pool.key];
  if (!pool?.poolData) return;
  const swapContract = getContract(
    pool.address,
    pool.swapABI,
    library,
    account ?? undefined
  );
  const tokenInputSum = parseUnits(
    pool.poolTokens
      .reduce((sum, { symbol }) => sum + (+amounts[symbol] || 0), 0)
      .toString(),
    18
  );
  let withdrawLPTokenAmount;
  const poolData: PoolData = pool.poolData;
  if (poolData.totalLocked.gt(0) && tokenInputSum.gt(0)) {
    withdrawLPTokenAmount = yield call(
      swapContract.calculateTokenAmount,
      pool.poolTokens.map(({ symbol }) =>
        floatToBN(amounts[symbol], tokens[symbol].decimals)
      ),
      false
    );
  } else {
    // when pool is empty, estimate the lptokens by just summing the input instead of calling contract
    withdrawLPTokenAmount = tokenInputSum;
  }

  const bonus = calculatePriceImpact(
    withdrawLPTokenAmount,
    tokenInputSum,
    poolData.virtualPrice,
    true
  );
  yield put(LiquidityPageActions.setWithdrawBonus(bonus));
}

function* tokensToApproveForDeposit() {
  let pool: Pool = yield select(LiquidityPageDomains.pool);
  const tokens = yield select(GlobalDomains.tokens);
  const amounts = yield select(LiquidityPageDomains.depositTokenAmounts);
  const toApprove: TokenToVerify[] = Object.keys(amounts).map((symbol) => {
    const token: Token = tokens[symbol];
    return {
      amount:
        floatToBN(Number(amounts[symbol]), token.decimals) || BigNumber.from(0),
      swapAddress: pool.swapAddress || pool.address,
      token,
    };
  });
  return toApprove;
}

export function* approveTokensForDeposit() {
  const tokensToApprove: TokenToVerify[] = yield call(
    tokensToApproveForDeposit
  );
  const areApproved = yield call(checkAndApproveTokensInList, {
    tokensToVerify: tokensToApprove,
  });
  yield put(LiquidityPageActions.setTokensAreApproved(areApproved));
}
export function* checkIsAllTokensAreApprovedForDeposit() {
  yield put(LiquidityPageActions.setIsCheckingForApproval(true));
  const tokensToApprove: TokenToVerify[] = yield call(
    tokensToApproveForDeposit
  );
  const areAllApproved = yield call(checkIfTokensAreVerified, {
    tokensToVerify: tokensToApprove,
  });
  yield put(LiquidityPageActions.setTokensAreApproved(areAllApproved));
  yield put(LiquidityPageActions.setIsCheckingForApproval(false));
}

function* calculateLpTokenToSpend() {
  const tokens = yield select(GlobalDomains.tokens);
  const pools = yield select(RewardsDomains.pools);
  const selectedPool = yield select(LiquidityPageDomains.pool);
  const pool: Pool = pools[selectedPool.key];
  const percentage = yield select(LiquidityPageDomains.withdrawPercentage);
  const tokenAmounts = yield select(LiquidityPageDomains.withdrawTokenAmounts);
  const library = yield select(Web3Domains.selectLibraryDomain);
  const account = yield select(Web3Domains.selectAccountDomain);
  const selectedToken = yield select(
    LiquidityPageDomains.selectedTokenToWithdraw
  );
  const userShareData = pool.userShareData as UserShareData;
  const swapContract = getContract(
    pool.swapAddress || pool.address,
    pool.swapABI,
    library,
    account ?? undefined
  );
  const type = withdrawType({
    selectedToken,
    tokenAmounts,
  });
  let lpTokenToSpend = BigNumber.from(0);
  if (type === WithdrawType.IMBALANCE) {
    lpTokenToSpend = yield call(
      swapContract.calculateTokenAmount,
      pool.poolTokens.map(({ symbol }) => {
        const BNAmount = floatToBN(
          Number(tokenAmounts[symbol]),
          tokens[symbol].decimals
        );
        return BNAmount;
      }),
      false
    );
  } else if (type === WithdrawType.ALL) {
    lpTokenToSpend = userShareData.lpTokenBalance
      .mul(parseUnits(percentage.toString(), 5)) // difference between numerator and denominator because we're going from 100 to 1.00
      .div(10 ** 7);
  }
  console.log(lpTokenToSpend);

  return lpTokenToSpend;
}

function* checkForWithdrawApproval(requestForApprove?: boolean) {
  yield put(LiquidityPageActions.setTokensAreApproved(false));
  yield put(LiquidityPageActions.setIsCheckingForApproval(true));
  const pools = yield select(RewardsDomains.pools);
  const selectedPool = yield select(LiquidityPageDomains.pool);
  const library = yield select(Web3Domains.selectLibraryDomain);
  const pool = pools[selectedPool.key];
  const account = yield select(Web3Domains.selectAccountDomain);
  const tokenAmounts = yield select(LiquidityPageDomains.withdrawTokenAmounts);
  const selectedToken = yield select(
    LiquidityPageDomains.selectedTokenToWithdraw
  );
  const selectedSlippage = yield select(GlobalDomains.selectedSlippage);
  const customSlippage = yield select(GlobalDomains.customSlippage);

  const lpTokenAmountToSpend = yield call(calculateLpTokenToSpend);

  const lpTokenContract = getContract(
    pool.lpToken.address,
    LPTOKEN_UNGUARDED_ABI,
    library,
    account ?? undefined
  ) as LpTokenUnguarded;

  const type = withdrawType({
    selectedToken,
    tokenAmounts,
  });

  try {
    const allowanceAmount =
      type === WithdrawType.IMBALANCE
        ? addSlippage(lpTokenAmountToSpend, selectedSlippage, customSlippage)
        : lpTokenAmountToSpend;
    const areVerified = yield call(
      requestForApprove === true
        ? checkAndApproveTokensInList
        : checkIfTokensAreVerified,
      {
        tokensToVerify: [
          {
            amount: allowanceAmount,
            swapAddress: pool.swapAddress || pool.address,
            token: pool.lpToken,
            tokenContract: lpTokenContract,
          },
        ],
      }
    );
    console.debug(
      `lpTokenAmountToSpend: ${formatUnits(lpTokenAmountToSpend, 18)}`
    );
    yield put(LiquidityPageActions.setTokensAreApproved(areVerified));
    yield put(LiquidityPageActions.setIsCheckingForApproval(false));
  } catch (e) {
    yield put(LiquidityPageActions.setTokensAreApproved(false));
    yield put(LiquidityPageActions.setIsCheckingForApproval(false));
  }
}

function* requestWithdrawApproval() {
  yield call(checkForWithdrawApproval, true);
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
  yield takeLatest(
    LiquidityPageActions.setAmountForTokenToWithdraw.type,
    setAmountForTokenToWithdraw
  );
  yield takeLatest(
    LiquidityPageActions.setWithdrawPercentage.type,
    setWithdrawPercentage
  );
  yield takeLatest(
    LiquidityPageActions.setSelectedTokenToWithdraw.type,
    setSelectedTokenToWithdraw
  );
  yield takeLatest(
    LiquidityPageActions.approveTokensForDeposit.type,
    approveTokensForDeposit
  );
  yield takeLatest(
    LiquidityPageActions.checkIsAllTokensAreApprovedForDeposit.type,
    checkIsAllTokensAreApprovedForDeposit
  );
  yield takeLatest(
    LiquidityPageActions.checkForWithdrawApproval.type,
    checkForWithdrawApproval
  );
  yield takeLatest(
    LiquidityPageActions.requestWithdrawApproval.type,
    requestWithdrawApproval
  );
}
