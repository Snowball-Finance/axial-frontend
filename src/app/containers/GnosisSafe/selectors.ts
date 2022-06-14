import { createSelector } from "@reduxjs/toolkit";
import { RootState } from "store/types";

export const GnosisSafeDomains = {
  safe:(state:RootState)=>state.gnosisSafe?.safe,
  sdk:(state:RootState)=>state.gnosisSafe?.sdk,
  connected:(state:RootState)=>state.gnosisSafe?.connected,
};

export const GnosisSafeSelectors = {
  safe:createSelector(
    GnosisSafeDomains.safe,
    (safe)=>safe
  ),
  sdk:createSelector(
    GnosisSafeDomains.sdk,
    (sdk)=>sdk
  ),
  connected:createSelector(
    GnosisSafeDomains.connected,
    (connectedToGnosis)=>connectedToGnosis
  ),
};
