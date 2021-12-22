import { AbstractConnector } from '@web3-react/abstract-connector';

export interface Web3Interface {
  active: boolean;
  activate?: (connector: AbstractConnector, onError?: ((error: Error) => void) | undefined, throwErrors?: boolean | undefined) => Promise<void>;
  deactivate?: () => void;
  account: string | null | undefined;
  connector: AbstractConnector | undefined;
  library: any;
}

/* --- STATE --- */
export interface Web3State extends Web3Interface {
  isConnectingToWallet: boolean;
}

export type ContainerState = Web3State;