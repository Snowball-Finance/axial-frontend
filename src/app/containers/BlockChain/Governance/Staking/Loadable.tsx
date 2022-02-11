/**
 *
 * Asynchronously loads the component for Staking
 *
 */
import React from "react";
import { lazyLoad } from "common/loadable";
import { PageLoading } from "app/components/common/pageLoading";

export const Staking = lazyLoad(
  () => import("./index"),
  (module) => module.Staking,
  { fallback: <PageLoading /> }
);
