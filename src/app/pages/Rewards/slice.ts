import { ContainerState } from "./types";
import { createSlice } from "store/toolkit";
import { useInjectReducer, useInjectSaga } from "store/redux-injectors";

import { rewardsPageSaga } from "./saga";

// The initial state of the RewardsPage container
export const initialState: ContainerState = {
  pools: undefined,
  pool: undefined,
  poolTokens: undefined,
  poolData: undefined,
  userShareData: undefined,
};

const rewardsPageSlice = createSlice({
  name: "rewardsPage",
  initialState,
  reducers: {},
});

export const {
  actions: RewardsPageActions,
  reducer: RewardsPageReducer,
  name: sliceKey,
} = rewardsPageSlice;

export const useRewardsPageSlice = () => {
  useInjectReducer({ key: sliceKey, reducer: RewardsPageReducer });
  useInjectSaga({ key: sliceKey, saga: rewardsPageSaga });
  return { RewardsPageActions };
};
