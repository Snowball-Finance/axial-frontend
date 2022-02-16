import { injected, walletLink } from "../utils/wallet/connectors";

export const CONNECTORS = {
  MetaMask: injected,
  "Coinbase Wallet": walletLink,
  "Coin 98": injected,
};

export const MOBILE_CONNECTORS = {
  MetaMask: injected,
  "Coinbase Wallet": walletLink,
  "Coin 98": injected,
};
