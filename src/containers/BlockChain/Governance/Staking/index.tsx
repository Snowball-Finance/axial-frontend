/**
 *
 * Staking
 *
 */

import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { env } from "../../../../environment";
import { StakingActions, useStakingSlice } from "./slice";
import { DistributorData } from "./types";

interface Props {
  feeDistributorABI: any;
  otherDistributors?: DistributorData[];
}
export function Staking({ feeDistributorABI, otherDistributors }: Props) {
  useStakingSlice();
  const dispatch = useDispatch();
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

  return <></>;
}
