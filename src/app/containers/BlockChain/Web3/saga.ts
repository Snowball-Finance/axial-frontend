import { toast } from "react-toastify";
import { call, put, select, takeLatest } from "redux-saga/effects";
import { CONNECTORS } from "./constants";
import { Web3Domains } from "./selectors";
import { Web3Actions } from "./slice";
import { ConnectorPayload, Web3State } from "./types";

export function* connectToWallet(action: {
  type: string;
  payload: ConnectorPayload;
}) {
  const { walletName } = action.payload;
  const connector = CONNECTORS[walletName];
  if (walletName === "Coin 98") {
    //@ts-ignore ignored because of window type error on not having coin98 field
    if (!window.ethereum.isCoin98 && !window.coin98) {
      toast.warning("please add coin 98 extension first");
      return;
    }
  }
  const web3State: Web3State = yield select(Web3Domains.selectWeb3Domain);
  if (web3State.activate) {
    yield put(Web3Actions.setIsConnectingToWallet(true));
    try {
      yield call(web3State.activate, connector);
    } catch (err) {
      console.error(err);
    } finally {
      yield put(Web3Actions.setIsConnectingToWallet(false));
    }
  } else {
    console.error("web3 not activated");
  }
}

export function* disconnectFromWallet() {
  const web3State: Web3State = yield select(Web3Domains.selectWeb3Domain);
  if (web3State.deactivate) {
    yield call(web3State.deactivate);
  }
}

export function* web3Saga() {
  yield takeLatest(Web3Actions.connectToWallet.type, connectToWallet);
  yield takeLatest(Web3Actions.disconnectFromWallet.type, disconnectFromWallet);
}
