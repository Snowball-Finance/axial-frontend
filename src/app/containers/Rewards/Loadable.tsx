/**
 *
 * Asynchronously loads the component for Rewards
 *
 */
import React from "react";
import { lazyLoad } from "common/loadable";
import { PageLoading } from "app/components/common/pageLoading";

export const Rewards = lazyLoad(
  () => import("./index"),
  (module) => module.Rewards,
  { fallback: <PageLoading /> }
);
