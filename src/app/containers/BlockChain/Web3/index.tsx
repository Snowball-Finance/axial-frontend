/**
 *
 * Web3
 *
 */

import React, { useCallback, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useWeb3Slice, Web3Actions } from "./slice";
import {
  createWeb3ReactRoot,
  useWeb3React,
  Web3ReactProvider,
} from "@web3-react/core";
import { BaseProvider } from "@ethersproject/providers";

import { Web3Provider } from "@ethersproject/providers";
import { NetworkContextName } from "../constants";
import { Web3ReactContextInterface } from "@web3-react/core/dist/types";
import Web3ReactManager from "./Web3ReactManager";
import { ethers } from "ethers";
import { GnosisSafeSelectors } from "app/containers/GnosisSafe/selectors";
import { SafeAppProvider } from "@gnosis.pm/safe-apps-provider";
import { useGnosisSafeSlice } from "app/containers/GnosisSafe/slice";
const Web3ProviderNetwork = createWeb3ReactRoot(NetworkContextName);

export function useActiveWeb3React(): Web3ReactContextInterface<Web3Provider> & {} {
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


let networkLibrary: BaseProvider | undefined;

export const Web3 = () => {
  useGnosisSafeSlice()
const sdk=useSelector(GnosisSafeSelectors.sdk)
const safe=useSelector(GnosisSafeSelectors.safe)
const getNetworkLibrary=useCallback(
  (): BaseProvider=> {
    // @ts-ignore
    const safeProvider=new SafeAppProvider(safe, sdk)
    const provider = new ethers.providers.Web3Provider(safeProvider) //new ethers.providers.StaticJsonRpcProvider(rpcUrl);;
    const library = (networkLibrary = networkLibrary ?? provider);
    return library;
  }
  ,[])
const getLibrary=useCallback(
  () => {
    // @ts-ignore
    const safeProvider=new SafeAppProvider(safe, sdk)
    const provider = new ethers.providers.Web3Provider(safeProvider)
    const library = provider
    library.pollingInterval = 8000;
    return library;
  },
  [],
)


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
