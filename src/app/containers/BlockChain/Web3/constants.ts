import { gnosisSafe, injected, walletLink } from "../utils/wallet/connectors";

export const CONNECTORS = {
  MetaMask: injected,
  "Coinbase Wallet": walletLink,
  "Coin 98": injected,
  "Gnosis Safe": gnosisSafe,
};

export const MOBILE_CONNECTORS = {
  MetaMask: injected,
  "Coinbase Wallet": walletLink,
  "Coin 98": injected,
  "Gnosis Safe": gnosisSafe,
};
