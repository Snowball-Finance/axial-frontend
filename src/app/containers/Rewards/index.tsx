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
  if (!process.env.REACT_APP_AXIAL_MASTERCHEF_CONTRACT_ADDRESS) {
    throw Error(
      "REACT_APP_AXIAL_MASTERCHEF_CONTRACT_ADDRESS should be set in .env"
    );
  }
  useRewardsSlice();

  const library = useSelector(Web3Selectors.selectLibrary);
  const networkLibrary = useSelector(Web3Selectors.selectNetworkLibrary);
  const account = useSelector(Web3Selectors.selectAccount);
  const masterchefApr = useSelector(RewardsSelectors.masterchefApr);
  const masterchefBalances = useSelector(RewardsSelectors.masterChefBalances);
  const dispatch = useDispatch();
  useEffect(() => {
    if (library && account) {
      dispatch(RewardsActions.getMasterChefBalances());
    }
    return () => {};
  }, [library, account]);

  useEffect(() => {
    if (networkLibrary) {
      dispatch(RewardsActions.getRewardPoolsData(pools));
    }
    return () => {};
  }, [masterchefApr, masterchefBalances, networkLibrary]);

  useEffect(() => {
    dispatch(RewardsActions.getMasterchefAPR());
    dispatch(RewardsActions.getSwapStats());

    return () => {};
  }, []);

  return <></>;
};
