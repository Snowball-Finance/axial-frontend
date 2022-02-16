/**
 *
 * Asynchronously loads the component for Governance
 *
 */
import React from "react";
import { lazyLoad } from "common/loadable";
import { PageLoading } from "app/components/common/pageLoading";

export const GovernancePage = lazyLoad(
  () => import("./index"),
  (module) => module.GovernancePage,
  { fallback: <PageLoading /> }
);
