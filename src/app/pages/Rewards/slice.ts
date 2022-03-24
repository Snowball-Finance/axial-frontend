import { PayloadAction } from "@reduxjs/toolkit";

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
  isCompoundWithSnowballLoading: false,
  compoundWithSnowballAPY: "0.00",
};

const rewardsPageSlice = createSlice({
  name: "rewardsPage",
  initialState,
  reducers: {
    setCompoundWithSnowballLoading(state, action: PayloadAction<boolean>) {
      state.isCompoundWithSnowballLoading = action.payload;
    },
    setCompoundWithSnowballAPY(state, action: PayloadAction<string>) {
      state.compoundWithSnowballAPY = action.payload;
    },
    poolInfoByAddress(state, action: PayloadAction<string>) {},
  },
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
