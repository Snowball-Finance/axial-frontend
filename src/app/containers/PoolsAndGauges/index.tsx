/**
 *
 * PoolsAndGauges
 *
 */
import React, { FC, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  selectGaugeContract,
  selectGotUserPools,
  selectIsReadyToGetUserData,
} from "./selectors";
import { PoolsAndGaugesActions, usePoolsAndGaugesSlice } from "./slice";
import "ag-grid-community/dist/styles/ag-grid.css";
import "ag-grid-community/dist/styles/ag-theme-balham.min.css";
import { Web3Selectors } from "../BlockChain/Web3/selectors";

export const PoolsAndGauges: FC = () => {
  usePoolsAndGaugesSlice();
  const dispatch = useDispatch();
  const gaugeContract = useSelector(selectGaugeContract);
  const isReadyToGetUserPools = useSelector(selectIsReadyToGetUserData);
  const alreadyGotUserPools = useSelector(selectGotUserPools);
  const networkLibrary = useSelector(Web3Selectors.selectNetworkLibrary);
  useEffect(() => {
    if (networkLibrary && !alreadyGotUserPools) {
      dispatch(PoolsAndGaugesActions.getLastInfo());
    }
  }, [networkLibrary, alreadyGotUserPools]);

  useEffect(() => {
    if (isReadyToGetUserPools && !alreadyGotUserPools) {
      dispatch(PoolsAndGaugesActions.getInitialData());
    }
  }, [isReadyToGetUserPools, alreadyGotUserPools]);

  useEffect(() => {
    dispatch(PoolsAndGaugesActions.setGaugeContract(gaugeContract));
  }, [gaugeContract]);

  return <></>;
};
