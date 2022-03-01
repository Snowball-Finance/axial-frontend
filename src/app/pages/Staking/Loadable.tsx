/**
 *
 * Asynchronously loads the component for StakingPage
 *
 */
import React from "react";
import { lazyLoad } from "common/loadable";
import { PageLoading } from "app/components/common/pageLoading";

export const StakingPage = lazyLoad(
  () => import("./index"),
  (module) => module.StakingPage,
  { fallback: <PageLoading /> }
);
