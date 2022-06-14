/**
 *
 * Swap
 *
 */

import React, { FC, useEffect } from "react";
import { useDispatch } from "react-redux";
import { GnosisSafeActions, useGnosisSafeSlice } from "./slice";
import { useSafeAppsSDK, SafeProvider } from '@gnosis.pm/safe-apps-react-sdk'

export const GnosisSafe: FC = () => {
  useGnosisSafeSlice();

  return (
    <SafeProvider>
      <Core />
    </SafeProvider>
  );
};


const Core = () => {
  const { sdk, safe,connected } = useSafeAppsSDK()
  const dispatch = useDispatch();
  useEffect(() => {
    if (safe && sdk) {
      dispatch(GnosisSafeActions.setGnosisData({ sdk, safe,connected }))
    }
    return () => { };
  }, [sdk, safe,connected]);


  return <></>
}