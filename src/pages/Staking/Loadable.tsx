/**
 *
 * Asynchronously loads the component for StakingPage
 *
 */
import { lazyLoad } from "components/loadable"
import React from "react"

export const StakingPage = lazyLoad(
  () => import("./index"),
  (module) => module.StakingPage,
  { fallback: <></> },
)
