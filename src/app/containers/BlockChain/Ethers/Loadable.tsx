/**
 *
 * Asynchronously loads the component for Ethers
 *
 */
import React from "react";
import { lazyLoad } from "common/loadable";

export const Ethers = lazyLoad(
  () => import("./index"),
  (module) => module.Ethers,
  { fallback: <></> }
);
