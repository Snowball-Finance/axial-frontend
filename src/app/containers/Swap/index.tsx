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
  swapRouterAddress: string;
  swapRouterABI: any;
  tokens: { [K in TokenSymbols]: Token };
}
if (!process.env.REACT_APP_SWAP_ROUTER_ADDRESS) {
  throw new Error("REACT_APP_SWAP_ROUTER_ADDRESS is not set");
}

export const Swap: FC<Props> = ({
  swapRouterABI,
  swapRouterAddress,
  tokens,
}) => {
  useSwapSlice();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(
      SwapActions.setSwapRouterConfigs({
        abi: swapRouterABI,
        address: swapRouterAddress,
        tokens,
      })
    );
    return () => {};
  }, []);

  return <></>;
};
