/**
 *
 * Rewards
 *
 */

import React, { FC, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Web3Selectors } from "../BlockChain/Web3/selectors";
import { RewardsSelectors } from "./selectors";

import { RewardsActions, useRewardsSlice } from "./slice";

import { ContainerState } from "./types";

interface Props {
  pools: ContainerState["pools"];
}

export const Rewards: FC<Props> = ({ pools }) => {
  useRewardsSlice();
  const networkLibrary = useSelector(Web3Selectors.selectNetworkLibrary);
  const masterchefApr = useSelector(RewardsSelectors.masterchefApr);
  const masterchefBalances = useSelector(RewardsSelectors.masterChefBalances);
  const dispatch = useDispatch();

  useEffect(() => {
    if (networkLibrary) {
      dispatch(RewardsActions.getRewardPoolsData(pools));
    }
    return () => {};
  }, [masterchefApr, masterchefBalances, networkLibrary]);

  useEffect(() => {
    dispatch(RewardsActions.getSwapStats());
    return () => {};
  }, []);

  return <></>;
};
