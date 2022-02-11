/**
 *
 * Asynchronously loads the component for PoolsAndGauges
 *
 */
import React from "react";
import { lazyLoad } from "common/loadable";
import { PageLoading } from "app/components/common/pageLoading";

export const PoolsAndGauges = lazyLoad(
  () => import("./index"),
  (module) => module.PoolsAndGauges,
  { fallback: <PageLoading /> }
);
