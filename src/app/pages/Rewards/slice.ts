import { ContainerState } from "./types";
import { createSlice } from "store/toolkit";
import { useInjectReducer, useInjectSaga } from "store/redux-injectors";

import { rewardsPageSaga } from "./saga";
import { zeroString } from "../Liquidity/constants";
import { PayloadAction } from "@reduxjs/toolkit";
import { Pool } from "app/containers/Rewards/types";

// The initial state of the RewardsPage container
export const initialState: ContainerState = {
  pools: undefined,
  pool: undefined,
  poolTokens: undefined,
  poolData: undefined,
  userShareData: undefined,
  depositValue: zeroString,
};

const rewardsPageSlice = createSlice({
  name: "rewardsPage",
  initialState,
  reducers: {
    setSelectedPool(state, action: PayloadAction<Pool | undefined>) {
      state.pool = action.payload;
    },
    setDepositValue(state, action: PayloadAction<string>) {
      state.depositValue = action.payload;
    },
    deposit() {},
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
