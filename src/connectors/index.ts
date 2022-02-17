import { BaseProvider, getDefaultProvider } from "@ethersproject/providers";

import { InjectedConnector } from "@web3-react/injected-connector";
import { NetworkConnector } from "@web3-react/network-connector";
import { WalletConnectConnector } from "@web3-react/walletconnect-connector";
import { WalletLinkConnector } from "@web3-react/walletlink-connector";

const NETWORK_URL = process.env.REACT_APP_NETWORK_URL;

const AVALANCHE_MAINNET_PARAMS = {
  chainId: "0xa86a",
  chainName: "Avalanche Mainnet C-Chain",
  nativeCurrency: {
    name: "Avalanche",
    symbol: "AVAX",
    decimals: 18
  },
  rpcUrls: ["https://api.avax.network/ext/bc/C/rpc"],
  blockExplorerUrls: ["https://snowtrace.io/"]
};

export const NETWORK_CHAIN_ID: number = parseInt(process.env.REACT_APP_CHAIN_ID ?? "43114");

if (typeof NETWORK_URL === "undefined") {
  throw new Error(`REACT_APP_NETWORK_URL must be a defined environment variable`);
}

export const network = new NetworkConnector({
  urls: { [NETWORK_CHAIN_ID]: NETWORK_URL }
});

let networkLibrary: BaseProvider | undefined;
export function getNetworkLibrary(): BaseProvider {
  const provider = getDefaultProvider(NETWORK_URL);
  return (networkLibrary = networkLibrary ?? provider);
}

export const injected = new InjectedConnector({
  // mainnet, ropsten, rinkeby, goerli, kovan, local buidler
  // see: https://github.com/ethereum/EIPs/blob/master/EIPS/eip-155.md
  supportedChainIds: [43114]
});

export const walletconnect = new WalletConnectConnector({
  rpc: { [NETWORK_CHAIN_ID]: NETWORK_URL },
  bridge: "https://bridge.walletconnect.org",
  qrcode: true
  // pollingInterval: POLLING_INTERVAL / 12000
});

export const walletlink = new WalletLinkConnector({
  url: NETWORK_URL,
  appName: "vault"
});

export const addAvalancheNetwork = (): void => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  injected
    .getProvider()
    .then((provider: any): void => {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-call
      provider
        // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
        .request({
          method: "wallet_addEthereumChain",
          params: [AVALANCHE_MAINNET_PARAMS]
        })
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        .catch((error: any) => {
          console.log(error);
        });
    })
    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
    .catch((error) => {
      console.log(error);
    });
};
