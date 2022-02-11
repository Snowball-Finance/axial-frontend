/**
 *
 * Staking
 *
 */

import { env } from "environment";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Web3Selectors } from "../../Web3/selectors";
import { GovernanceSelectors } from "../selectors";
import { StakingActions, useStakingSlice } from "./slice";
import { DistributorData } from "./types";

interface Props {
  feeDistributorABI: any;
  otherDistributors?: DistributorData[];
}
export function Staking({ feeDistributorABI, otherDistributors }: Props) {
  useStakingSlice();
  const dispatch = useDispatch();
  const account = useSelector(Web3Selectors.selectAccount);
  const governanceTokenContract = useSelector(
    GovernanceSelectors.selectGovernanceTokenContract
  );

  if (!env.FEE_DISTRIBUTOR_CONTRACT_ADDRESS) {
    throw new Error(
      "REACT_APP_FEE_DISTRIBUTOR_CONTRACT_ADDRESS is not set in .env for the staking"
    );
  }

  useEffect(() => {
    dispatch(
      StakingActions.setFeeDistributorData({
        feeDistributorABI,
        otherDistributors,
      })
    );
    return () => {};
  }, []);

  useEffect(() => {
    if (account && governanceTokenContract !== undefined) {
      dispatch(StakingActions.getLockedGovernanceTokenInfo());
    }
    return () => {};
  }, [account, governanceTokenContract]);

  return <></>;
}
