/**
*
* Web3
*
*/

import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useWeb3Slice, Web3Actions } from './slice';
import { useWeb3React } from "@web3-react/core";

export const Web3 = () => {
  useWeb3Slice()

  const dispatch = useDispatch()

  const { active, activate, deactivate, account, connector, library } = useWeb3React()

  useEffect(
    () => {
      dispatch(Web3Actions.setWeb3Methods({ active, activate, deactivate, account, connector, library }))
    },
    [
      active,
      activate,
      deactivate,
      account,
      connector,
      library,
      dispatch
    ]
  )

  return (
    <>
    </>
  );
};
