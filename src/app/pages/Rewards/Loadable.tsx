/**
 *
 * Asynchronously loads the component for RewardsPage
 *
 */
import React from "react";
import { lazyLoad } from "common/loadable";
import { PageLoading } from "app/components/common/pageLoading";

export const RewardsPage = lazyLoad(
  () => import("./index"),
  (module) => module.RewardsPage,
  { fallback: <PageLoading /> }
);
