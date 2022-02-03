import { put, takeLatest } from "redux-saga/effects"
import { ethers } from "ethers"
import { EthersActions } from "./slice"
import { AVALANCHE_MAINNET_PARAMS } from "../utils/wallet/connectors"

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export function* getAndSetProvider() {
  try {
    yield put(EthersActions.setIsCheckingNodeHealth(true))
    const provider = new ethers.providers.StaticJsonRpcProvider(
      AVALANCHE_MAINNET_PARAMS.rpcUrls[0],
    )
    yield put(EthersActions.setPrivateProvider(provider))
  } catch (error) {
    console.log("e.c.t.p.n") //error connecting to private node
    const provider = new ethers.providers.StaticJsonRpcProvider(
      AVALANCHE_MAINNET_PARAMS.rpcUrls[0],
    )
    yield put(EthersActions.setPrivateProvider(provider))
  } finally {
    yield put(EthersActions.setIsCheckingNodeHealth(false))
  }
}

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export function* ethersSaga() {
  yield takeLatest(EthersActions.getAndSetProvider.type, getAndSetProvider)
}
