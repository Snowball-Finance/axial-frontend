/**
*
* BlockChain
*
*/

import React, { useEffect } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { Ethers } from "./Ethers";
import { Web3 } from "./Web3";
import { selectCalculatedContracts } from "./selectors";
import { BlockChainActions, useBlockChainSlice } from "./slice";

export function BlockChain() {
  useBlockChainSlice()

  const dispatch = useDispatch()

  const { snob, snowCone, gaugeProxy } = useSelector(selectCalculatedContracts)

  useEffect(() => {
    if (snob && snowCone && gaugeProxy) {
      dispatch(BlockChainActions.setContracts({ snob, snowCone, gaugeProxy }))
    }
  }, [snob])

  return (
    <>
      <Web3 />
      <Ethers />
    </>
  )
};
