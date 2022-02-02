/**
 *
 * Asynchronously loads the component for Web3
 *
 */
import React from "react";
import { lazyLoad } from "../../../components/loadable";

export const Web3 = lazyLoad(
  () => import("./index"),
  (module) => module.Web3,
  { fallback: <></> }
);
