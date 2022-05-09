import { InjectedConnector } from "@web3-react/injected-connector";
import { NetworkConnector } from "@web3-react/network-connector";
import { WalletLinkConnector } from "@web3-react/walletlink-connector";

const NODE_ADDRESS = process.env.REACT_APP_NODE_ADDRESS;
const CHAIN_NAME = process.env.REACT_APP_CHAIN_NAME;
export const rpcUrl = `${NODE_ADDRESS}/ext/bc/C/rpc`;
const AVALANCHE_MAINNET_PARAMS = {
  chainId: process.env.REACT_APP_CHAIN_ID_HEX,
  chainName: CHAIN_NAME,
  nativeCurrency: {
    name: "Avalanche",
    symbol: "AVAX",
    decimals: 18,
  },
  rpcUrls: [`${NODE_ADDRESS}/ext/bc/C/rpc`],
  blockExplorerUrls: [`${process.env.REACT_APP_EXPLORER_URL}/`],
};

const walletLink = new WalletLinkConnector({
  url: AVALANCHE_MAINNET_PARAMS.rpcUrls[0],
  appName: process.env.REACT_APP_APPNAME || "",
  appLogoUrl:
    "https://raw.githubusercontent.com/Snowball-Finance/app-v2/master/public/assets/images/logo.png",
});

const networkConnectorUrls = {
  [Number(process.env.REACT_APP_CHAIN_ID || "0")]: rpcUrl,
};
export const network = new NetworkConnector({
  urls: networkConnectorUrls,
});

const injected = new InjectedConnector({
  supportedChainIds: [Number(AVALANCHE_MAINNET_PARAMS.chainId)],
});
const trustWallet = new InjectedConnector({
  supportedChainIds: [Number(AVALANCHE_MAINNET_PARAMS.chainId)],
});

export { injected, trustWallet, walletLink, AVALANCHE_MAINNET_PARAMS };
