/**
 *
 * Swap
 *
 */

import React, { FC, useEffect } from "react";
import { useDispatch } from "react-redux";
import { SwapActions, useSwapSlice } from "./slice";
import { Token, TokenSymbols } from "./types";

interface Props {
  aggregatorAddress: string;
  aggregatorABI: any;
  tokens: { [K in TokenSymbols]: Token };
}
if (!process.env.REACT_APP_AGGREGATOR_ADDRESS) {
  throw new Error("REACT_APP_AGGREGATOR_ADDRESS is not set");
}

export const Swap: FC<Props> = ({
  aggregatorABI,
  aggregatorAddress,
  tokens,
}) => {
  useSwapSlice();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(
      SwapActions.setAggregatorConfigs({
        abi: aggregatorABI,
        address: aggregatorAddress,
        tokens,
      })
    );
    return () => {};
  }, []);

  return <></>;
};
