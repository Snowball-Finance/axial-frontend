/**
 *
 * Web3
 *
 */

import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useWeb3Slice, Web3Actions } from "./slice";
import {
  createWeb3ReactRoot,
  useWeb3React,
  Web3ReactProvider,
} from "@web3-react/core";
import { BaseProvider, getDefaultProvider } from "@ethersproject/providers";

import { Web3Provider } from "@ethersproject/providers";
import { NetworkContextName } from "../constants";
import { rpcUrl } from "../utils/wallet/connectors";
import { ChainId } from "app/constants";
import { Web3ReactContextInterface } from "@web3-react/core/dist/types";
import Web3ReactManager from "./Web3ReactManager";
const Web3ProviderNetwork = createWeb3ReactRoot(NetworkContextName);

export function useActiveWeb3React(): Web3ReactContextInterface<Web3Provider> & {
  chainId?: ChainId;
} {
  const context = useWeb3React<Web3Provider>();
  const contextNetwork = useWeb3React<Web3Provider>(NetworkContextName);
  return context.active ? context : contextNetwork;
}

const Core = () => {
  useWeb3Slice();
  const dispatch = useDispatch();
  const { library: networkLibrary } = useActiveWeb3React();
  // console.log(library)
  const {
    active,
    activate,
    deactivate,
    account,
    connector,
    chainId,
    library,
    error,
  } = useWeb3React();

  useEffect(() => {
    dispatch(
      Web3Actions.setWeb3({
        active,
        activate,
        deactivate,
        account,
        connector,
        library,
        chainId,
        networkLibrary,
        error,
      })
    );
  }, [
    active,
    activate,
    deactivate,
    account,
    connector,
    library,
    chainId,
    error,
    dispatch,
  ]);

  return <></>;
};

const getLibrary = (provider: any) => {
  const library = new Web3Provider(provider);
  library.pollingInterval = 8000;
  return library;
};

let networkLibrary: BaseProvider | undefined;
export function getNetworkLibrary(): BaseProvider {
  const provider = getDefaultProvider(rpcUrl);
  const library = (networkLibrary = networkLibrary ?? provider);
  return library;
}

export const Web3 = () => {
  return (
    <Web3ReactProvider {...{ getLibrary }}>
      <Web3ProviderNetwork getLibrary={getNetworkLibrary}>
        <Web3ReactManager>
          <Core />
        </Web3ReactManager>
      </Web3ProviderNetwork>
    </Web3ReactProvider>
  );
};
