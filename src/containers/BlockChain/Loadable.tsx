/**
 *
 * Asynchronously loads the component for BlockChain
 *
 */
import React from "react";
import { lazyLoad } from "../../components/loadable";

export const BlockChain = lazyLoad(
  () => import("./index"),
  (module) => module.BlockChain,
  { fallback: <></> }
);
