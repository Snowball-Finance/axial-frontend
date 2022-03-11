/**
 *
 * Web3
 *
 */

import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useWeb3Slice, Web3Actions } from "./slice";
import { createWeb3ReactRoot, useWeb3React, Web3ReactProvider } from "@web3-react/core";
import { BaseProvider, getDefaultProvider } from "@ethersproject/providers"

import { Web3Provider } from "@ethersproject/providers";
import { NetworkContextName } from "../constants";
import { rpcUrl } from "../utils/wallet/connectors";
const Web3ProviderNetwork = createWeb3ReactRoot(NetworkContextName)

const Core = () => {
  useWeb3Slice();
  const dispatch = useDispatch();
  const {
    active,
    activate,
    deactivate,
    account,
    connector,
    library,
    chainId,
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

let networkLibrary: BaseProvider | undefined
export function getNetworkLibrary(): BaseProvider {
  const provider = getDefaultProvider(rpcUrl)
  return (networkLibrary = networkLibrary ?? provider)
}

export const Web3 = () => {
  return (
    <Web3ReactProvider {...{ getLibrary }}>
      <Web3ProviderNetwork getLibrary={getNetworkLibrary}>
      <Core />
      </Web3ProviderNetwork>
    </Web3ReactProvider>
  );
};
