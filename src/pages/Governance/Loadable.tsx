/**
 *
 * Asynchronously loads the component for Governance
 *
 */
import { lazyLoad } from "components/loadable"
import React from "react"

export const GovernancePage = lazyLoad(
  () => import("./index"),
  (module) => module.GovernancePage,
  { fallback: <></> },
)
