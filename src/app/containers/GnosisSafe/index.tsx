/**
 *
 * Swap
 *
 */

import React, { FC, useEffect } from "react";
import { useDispatch } from "react-redux";
import {  GnosisSafeActions, useGnosisSafeSlice } from "./slice";
import { useSafeAppsSDK,SafeProvider } from '@gnosis.pm/safe-apps-react-sdk'

export const GnosisSafe: FC = () => {
  useGnosisSafeSlice();

  return (
    <SafeProvider>
      <Core/>
    </SafeProvider>
  );
};


const Core=()=>{
  const { sdk, safe } = useSafeAppsSDK()
  const dispatch = useDispatch();

  useEffect(() => {
if(safe && sdk){
  dispatch(GnosisSafeActions.setGnosisSafe(safe))
  dispatch(GnosisSafeActions.setGnosisSdk(sdk))
}
    return () => {};
  }, [sdk,safe]);


  return <></>
}