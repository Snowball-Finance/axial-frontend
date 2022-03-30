import { AbstractConnector } from "@web3-react/abstract-connector";
import { CONNECTORS } from "./constants";

export interface Web3Interface {
  active: boolean;
  activate?: (
    connector: AbstractConnector,
    onError?: ((error: Error) => void) | undefined,
    throwErrors?: boolean | undefined
  ) => Promise<void>;
  deactivate?: () => void;
  account: string | null | undefined;
  connector: AbstractConnector | undefined;
  library: any;
  networkLibrary: any;
  chainId: number | undefined;
  error: Error | undefined;
}

export type ConnectorPayload = { walletName: keyof typeof CONNECTORS };

/* --- STATE --- */
export interface Web3State extends Web3Interface {
  isConnectingToWallet: boolean;
}

export type ContainerState = Web3State;
