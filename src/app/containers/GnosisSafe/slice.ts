import { ContainerState } from "./types";
import { createSlice } from "store/toolkit";
import { useInjectReducer, useInjectSaga } from "store/redux-injectors";
import { gnosisSafeSaga } from "./saga";

// The initial state of the Swap container
export const initialState: ContainerState = {
safe:undefined,
sdk:undefined
};

const GnosisSafeSlice = createSlice({
  name: "gnosisSafe",
  initialState,
  reducers: {
   setGnosisSdk: (state, action) => {
    state.sdk = action.payload;
   },
   setGnosisSafe: (state, action) => {
    state.safe = action.payload;
   }
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
