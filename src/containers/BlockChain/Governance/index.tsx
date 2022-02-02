import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { selectLibrary } from "../Web3/selectors";
import {
  selectGovernanceTokenContract,
  selectProposals,
  selectSyncedProposalsWithBlockChain,
} from "./selectors";
import { GovernanceActions, useGovernanceSlice } from "./slice";
import { Staking } from "./Staking";
import { DistributorData } from "./Staking/types";

export const Governance = ({
  tokenABI,
  proposalsQuery,
  governanceABI,
  staking,
}: {
  tokenABI: any;
  governanceABI: any;
  proposalsQuery: string;
  staking?: {
    feeDistributorABI: any;
    otherDistributors?: DistributorData[];
  };
}) => {
  const variables = {
    MINIMUM_TOKEN_FOR_VOTING: process.env.REACT_APP_MINIMUM_TOKEN_FOR_VOTING,
    MINIMUM_VOTING_PERIOD: process.env.REACT_APP_MINIMUM_VOTING_PERIOD,
    MAXIMUM_VOTING_PERIOD: process.env.REACT_APP_MAXIMUM_VOTING_PERIOD,
    MINIMUM_VOTING_PERIOD_UNIT:
      process.env.REACT_APP_MINIMUM_VOTING_PERIOD_UNIT,
    GOVERNANCE_INFO_LINK: process.env.REACT_APP_GOVERNANCE_INFO_LINK,
    GOVERNANCE_TOKEN_NAME: process.env.REACT_APP_GOVERNANCE_TOKEN_NAME,
    GOVERNANCE_TOKEN_CONTRACT_ADDRESS:
      process.env.REACT_APP_GOVERNANCE_TOKEN_CONTRACT_ADDRESS,
    GOVERNANCE_TOKEN_LOGO_ADDRESS:
      process.env.REACT_APP_GOVERNANCE_TOKEN_LOGO_ADDRESS,
    VOTING_CONTRACT_ADDRESS: process.env.REACT_APP_VOTING_CONTRACT_ADDRESS,
  };

  for (const key in variables) {
    if (!variables[key]) {
      throw new Error(`REACT_APP_${key} is not set in .env for the governance`);
    }
  }
  if (!governanceABI) {
    throw new Error("governanceABI is not Provided for Blockchain module");
  }
  useGovernanceSlice();
  const dispatch = useDispatch();
  const governanceToken = useSelector(selectGovernanceTokenContract);
  const library = useSelector(selectLibrary);
  const proposals = useSelector(selectProposals);
  const syncedProposalsWithBlockChain = useSelector(
    selectSyncedProposalsWithBlockChain
  );
  useEffect(() => {
    if (governanceToken) {
      dispatch(GovernanceActions.setGovernanceTokenContract(governanceToken));
    }
  }, [governanceToken]);

  useEffect(() => {
    dispatch(GovernanceActions.setGovernanceABI(governanceABI));
    dispatch(GovernanceActions.setGovernanceTokenABI(tokenABI));
    dispatch(GovernanceActions.getProposals({ query: proposalsQuery }));
    return () => {};
  }, []);

  useEffect(() => {
    if (
      library &&
      proposals &&
      proposals.length &&
      syncedProposalsWithBlockChain === false
    ) {
      dispatch(GovernanceActions.syncProposalsWithBlockchain());
    }
  }, [library, proposals, syncedProposalsWithBlockChain]);

  return (
    <>
      {staking && (
        <Staking
          feeDistributorABI={staking.feeDistributorABI}
          otherDistributors={staking.otherDistributors}
        />
      )}
    </>
  );
};
