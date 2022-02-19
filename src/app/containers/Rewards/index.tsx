/**
 *
 * Rewards
 *
 */

import React, { FC, useEffect } from "react";
import { useDispatch } from "react-redux";

import { RewardsActions, useRewardsSlice } from "./slice";

import { ContainerState } from "./types";

interface Props {
  pools: ContainerState["pools"];
}

export const Rewards: FC<Props> = ({ pools }) => {
  useRewardsSlice();
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(RewardsActions.setRewardPools(pools));
    return () => {};
  }, []);

  return <></>;
};
