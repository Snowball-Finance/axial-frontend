
import { createSelector } from "@reduxjs/toolkit";
import { RootState } from "store/types";

const selectDomain = (state: RootState) => state;

export const selectRouter = createSelector(
  [selectDomain],
  state => state.router!,
);
