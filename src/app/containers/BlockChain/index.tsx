/**
 *
 * BlockChain
 *
 */

import React, { FC, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Web3 } from "./Web3";
import { BlockChainActions, useBlockChainSlice } from "./slice";
import { Governance } from "./Governance";
import { DistributorData } from "./Governance/Staking/types";
import { Web3Selectors } from "./Web3/selectors";
import { useWeb3Slice } from "./Web3/slice";

interface BlockChainProps {
  mainTokenABI: any;
  governance?: {
    tokenABI: any;
    governanceABI: any;
    staking?: {
      feeDistributorABI: any;
      otherDistributors?: DistributorData[];
    };
  };
}

export const BlockChain: FC<BlockChainProps> = ({
  governance,
  mainTokenABI,
}) => {
  const variables = {
    MAIN_TOKEN_ADDRESS: process.env.REACT_APP_MAIN_TOKEN_ADDRESS,
    MAIN_TOKEN_NAME: process.env.REACT_APP_MAIN_TOKEN_NAME,
  };

  for (let key in variables) {
    if (!variables[key]) {
      throw new Error(`REACT_APP_${key} is not set in .env for the governance`);
    }
  }

  useBlockChainSlice();
  useWeb3Slice();

  const dispatch = useDispatch();
  const account = useSelector(Web3Selectors.selectAccount);
  useEffect(() => {
    dispatch(BlockChainActions.setMainTokenABI(mainTokenABI));
    return () => {};
  }, []);


  useEffect(() => {
    if (governance) {
      dispatch(BlockChainActions.setIncludesGovernance(true));
    }
 

  }, [ account]);

  return (
    <>
      <Web3 />
      {governance && (
        <Governance
          tokenABI={governance.tokenABI}
          governanceABI={governance.governanceABI}
          staking={{
            feeDistributorABI: governance.staking?.feeDistributorABI,
            otherDistributors: governance.staking?.otherDistributors,
          }}
        />
      )}
    </>
  );
};
