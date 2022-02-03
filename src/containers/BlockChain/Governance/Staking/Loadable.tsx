/**
 *
 * Asynchronously loads the component for Staking
 *
 */
import React from "react"
import { lazyLoad } from "../../../../components/loadable"

export const Staking = lazyLoad(
  () => import("./index"),
  (module) => module.Staking,
  { fallback: <></> },
)
