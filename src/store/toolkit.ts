import { RootStateKeyType } from "./types/injector-typings"
import {
  createSlice as createSliceOriginal,
  SliceCaseReducers,
  CreateSliceOptions,
} from "@reduxjs/toolkit"

/* Wrap createSlice with stricter Name options */

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export const createSlice = <
  State,
  CaseReducers extends SliceCaseReducers<State>,
  Name extends RootStateKeyType,
>(
  options: CreateSliceOptions<State, CaseReducers, Name>,
) => {
  return createSliceOriginal(options)
}
