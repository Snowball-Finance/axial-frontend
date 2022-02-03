import { all, call, put, select, takeLatest } from "redux-saga/effects"
import { selectAccountDomain } from "./Web3/selectors"
import { BlockChainActions } from "./slice"
import { balanceProvider } from "./providers/balanceAPI"
import { toast } from "react-toastify"
import { BlockChainState } from "./types"
import { selectContractsDomain } from "./selectors"
import { env } from "../../environment"

export function* getMainTokenBalance() {
  yield put(BlockChainActions.setIsGettingMainTokenBalance(true))
  const account = yield select(selectAccountDomain)
  const { mainTokenContract } = yield select(selectContractsDomain)
  const contract = mainTokenContract
  try {
    const response = yield call(balanceProvider, { contract, account })
    yield put(BlockChainActions.setMainTokenBalance(response))
  } catch (error) {
    toast.error(`Error getting ${env.MAIN_TOKEN_NAME} balance`)
  } finally {
    yield put(BlockChainActions.setIsGettingMainTokenBalance(false))
  }
}

export function* getPrices() {
  const mainTokenKeyForCoinGecko = env.MAIN_TOKEN_KEY_FOR_COIN_GECKO
  try {
    if (mainTokenKeyForCoinGecko) {
      //@ts-ignore
      const { data } = yield call(geckoPrice, {
        ids: [
          mainTokenKeyForCoinGecko,
          "pangolin",
          "wrapped-avax",
          "binance-usd",
          "frax",
        ],
        vs_currencies: ["usd"],
        include_24hr_change: [true],
      })
      const prices: BlockChainState["prices"] = {
        mainToken: data[mainTokenKeyForCoinGecko]?.usd || 0,
        mainToken24hChange: data[mainTokenKeyForCoinGecko]?.usd_24h_change || 0,
      }
      yield put(BlockChainActions.setPrices(prices))
    } else {
      console.log(
        "REACT_APP_MAIN_TOKEN_KEY_FOR_COIN_GECKO is not defined in env, hence 24hChange and price will not be fetched",
      )
    }
  } catch (error) {
    toast.error("Error getting Latest Prices")
  }
}

//get balances whenever contract is set
export function* setContracts(action: {
  type: string
  payload: { mainTokenContract: any }
}) {
  yield all([
    action.payload.mainTokenContract &&
      put(BlockChainActions.getMainTokenBalance()),
    put(BlockChainActions.getPrices()),
  ])
}

export function* blockChainSaga() {
  yield takeLatest(
    BlockChainActions.getMainTokenBalance.type,
    getMainTokenBalance,
  )
  yield takeLatest(BlockChainActions.setContracts.type, setContracts)
  yield takeLatest(BlockChainActions.getPrices.type, getPrices)
}
