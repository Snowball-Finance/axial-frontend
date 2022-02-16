/**
 *
 * Asynchronously loads the component for LiquidityPage
 *
 */
import React from "react";
import { lazyLoad } from "common/loadable";
import { PageLoading } from "app/components/common/pageLoading";

export const Liquidity = lazyLoad(
  () => import("./index"),
  (module) => module.LiquidityPage,
  { fallback: <PageLoading /> }
);
