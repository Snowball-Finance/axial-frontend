/**
 *
 * Staking
 *
 */
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Web3Selectors } from "../../Web3/selectors";
import { GovernanceSelectors } from "../selectors";
import { useGovernanceSlice } from "../slice";
import { StakingActions, useStakingSlice } from "./slice";
import { DistributorData } from "./types";

interface Props {
  feeDistributorABI: any;
  otherDistributors?: DistributorData[];
}
export function Staking({ feeDistributorABI, otherDistributors }: Props) {
  useStakingSlice();
  useGovernanceSlice();
  const dispatch = useDispatch();
  const account = useSelector(Web3Selectors.selectAccount);
  const governanceTokenContract = useSelector(
    GovernanceSelectors.governanceTokenContract
  );

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
