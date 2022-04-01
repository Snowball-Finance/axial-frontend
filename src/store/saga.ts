import { GlobalDomains } from "app/appSelectors";
import { Web3Domains } from "app/containers/BlockChain/Web3/selectors";
import { Token } from "app/containers/Swap/types";
import {
  getMultiContractData,
  getUserBalance,
} from "app/containers/utils/multicall";
import { gasPriceAPI } from "app/providers/gasPrice";
import { getTokenPricesAPI } from "app/providers/tokenPrice";
import { toast } from "react-toastify";
import { call, put, select, takeLatest } from "redux-saga/effects";
import { GlobalActions, GlobalState } from "./slice";

const otherTokens = {
  AVAX: "avalanche-2",
  "USDT.e": "tether",
  "DAI.e": "dai",
  "USDC.e": "usd-coin",
  TUSD: "true-usd",
  FRAX: "frax",
  TEDDY: "teddy",
  AXIAL: "axial-token",
  AVAI: "orca-avai",
  ORCA: "orcadao",
};

interface CoinGeckoResponse {
  [tokenSymbol: string]: {
    usd: number;
  };
}

export function* getTokenPricesUSD() {
  const tokens = yield select(GlobalDomains.tokens);
  const tokenIds = { ...otherTokens };
  for (const key in tokens) {
    if (Object.prototype.hasOwnProperty.call(tokens, key)) {
      const element: Token = tokens[key];
      if (!element.isLPToken) {
        tokenIds[key] = element.geckoId;
      }
    }
  }
  try {
    yield put(GlobalActions.setIsGettingTokenPrices(true));
    const prices = {};
    const response: CoinGeckoResponse = yield call(
      getTokenPricesAPI,
      Object.values(tokenIds)
    );
    for (const responseGeckoId in response) {
      if (Object.prototype.hasOwnProperty.call(response, responseGeckoId)) {
        const price = response[responseGeckoId].usd;
        for (const key in tokenIds) {
          if (Object.prototype.hasOwnProperty.call(tokenIds, key)) {
            const element = tokenIds[key];
            if (element === responseGeckoId) {
              prices[key] = price;
              break;
            }
          }
        }
      }
    }
    yield put(GlobalActions.setTokenPricesUSD(prices));
  } catch (e) {
    console.log(e);
    toast.error("Error getting token prices");
  } finally {
    yield put(GlobalActions.setIsGettingTokenPrices(false));
  }
}

export function* getGasPrice() {
  try {
    const res = yield call(gasPriceAPI);
    yield put(GlobalActions.setGasPrice(res));
  } catch (e) {
    console.log(e);
    toast.error("Error getting gas price");
  }
}

export function* getTokenBalances() {
  const library = yield select(Web3Domains.selectLibraryDomain);
  const account = yield select(Web3Domains.selectAccountDomain);
  const tokens: GlobalState["tokens"] = yield select(GlobalDomains.tokens);

  const tokensArray = Object.values(tokens || {});
  const balanceCalls = tokensArray.map((token) => {
    return getUserBalance(account, token.address);
  });
  try {
    const balances = yield call(getMultiContractData, library, balanceCalls);
    const balancesToImplement = tokensArray.reduce(
      (acc, t) => ({
        ...acc,
        [t.symbol]: balances[t.address].balanceOf,
      }),
      {}
    );
    const newSet = {};
    //set new balances
    for (const key in tokens) {
      if (Object.prototype.hasOwnProperty.call(tokens, key)) {
        const element: Token = { ...tokens[key] };
        element.balance = balancesToImplement[key];
        newSet[key] = element;
      }
    }
    yield put(GlobalActions.setTokens(newSet));
  } catch (e) {
    console.log(e);
  }
}

export function* globalSaga() {
  yield takeLatest(GlobalActions.getTokenPricesUSD.type, getTokenPricesUSD);
  yield takeLatest(GlobalActions.getGasPrice.type, getGasPrice);
  yield takeLatest(GlobalActions.getTokenBalances.type, getTokenBalances);
}
