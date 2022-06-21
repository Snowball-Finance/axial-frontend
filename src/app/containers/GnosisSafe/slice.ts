import { ContainerState } from "./types";
import { createSlice } from "store/toolkit";
import { useInjectReducer, useInjectSaga } from "store/redux-injectors";
import { gnosisSafeSaga } from "./saga";
import { PayloadAction } from "@reduxjs/toolkit";
import SafeAppsSDK, { SafeInfo } from "@gnosis.pm/safe-apps-sdk";

// The initial state of the Swap container
export const initialState: ContainerState = {
  safe: undefined,
  sdk: undefined,
  connected: false,
};

const GnosisSafeSlice = createSlice({
  name: "gnosisSafe",
  initialState,
  reducers: {
    setGnosisData: (
      state,
      action: PayloadAction<{
        safe: SafeInfo;
        sdk: SafeAppsSDK;
        connected: boolean;
      }>
    ) => {
      state.safe = action.payload.safe;
      state.sdk = action.payload.sdk;
      state.connected = action.payload.connected;
    },
  },
});

export const {
  actions: GnosisSafeActions,
  reducer: GnosisSafeReducer,
  name: sliceKey,
} = GnosisSafeSlice;

export const useGnosisSafeSlice = () => {
  useInjectReducer({ key: sliceKey, reducer: GnosisSafeReducer });
  useInjectSaga({ key: sliceKey, saga: gnosisSafeSaga });
  return { GnosisSafeActions };
};
