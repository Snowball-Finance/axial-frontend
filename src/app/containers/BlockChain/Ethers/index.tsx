/**
 *
 * Ethers
 *
 */

import React, { useEffect } from "react";
import { useDispatch } from "react-redux";

import { EthersActions, useEthersSlice } from "./slice";

export function Ethers() {
  useEthersSlice();

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(EthersActions.getAndSetProvider());
  }, []);

  return <></>;
}
