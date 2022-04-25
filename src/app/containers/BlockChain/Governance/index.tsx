import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Web3Selectors } from "../Web3/selectors";
import { GovernanceSelectors } from "./selectors";
import { GovernanceActions, useGovernanceSlice } from "./slice";
import { Staking } from "./Staking/Loadable";
import { DistributorData } from "./Staking/types";

export const Governance = ({
  tokenABI,
  governanceABI,
  staking,
}: {
  tokenABI: any;
  governanceABI: any;
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
    IPFS_API_URL: process.env.REACT_APP_IPFS_API_URL,
  };

  for (let key in variables) {
    if (!variables[key]) {
      throw new Error(`REACT_APP_${key} is not set in .env for the governance`);
    }
  }
  if (!governanceABI) {
    throw new Error("governanceABI is not Provided for Blockchain module");
  }
  useGovernanceSlice();
  const dispatch = useDispatch();
  const governanceTokenContract = useSelector(
    GovernanceSelectors.governanceTokenContract
  );
  const library = useSelector(Web3Selectors.selectLibrary);
  const proposals = useSelector(GovernanceSelectors.proposals);
  const syncedProposalsWithBlockChain = useSelector(
    GovernanceSelectors.syncedProposalsWithBlockChain
  );
  useEffect(() => {
    if (governanceTokenContract !== undefined) {
      dispatch(
        GovernanceActions.setGovernanceTokenContract(governanceTokenContract)
      );
    }
  }, [governanceTokenContract]);

  useEffect(() => {
    dispatch(GovernanceActions.setGovernanceABI(governanceABI));
    dispatch(GovernanceActions.setGovernanceTokenABI(tokenABI));
    dispatch(GovernanceActions.getProposals({}));
    dispatch(GovernanceActions.getProposals({}));
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
