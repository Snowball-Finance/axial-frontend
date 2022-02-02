/**
 * Combine all reducers in this file and export the combined reducers.
 */

import { combineReducers } from "@reduxjs/toolkit";
import { InjectedReducersType } from "./types/injector-typings";
import { globalReducer } from "./slice";
import application from "./application";
import user from "./module/user";

/**
 * Merges the main reducer with the router state and dynamically injected reducers
 */
// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export function createReducer(injectedReducers: InjectedReducersType = {}) {
  // Initially we don't have any injectedReducers, so returning identity function to avoid the error

  return combineReducers({
    ...(Object.keys(injectedReducers).length !== 0 && injectedReducers),
    global: globalReducer,
    application,
    user
  });
}
