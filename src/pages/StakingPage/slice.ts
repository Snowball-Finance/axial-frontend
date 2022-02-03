import { PayloadAction } from "@reduxjs/toolkit"
import { ContainerState } from "./types"
import { createSlice } from "store/toolkit"
import { useInjectReducer, useInjectSaga } from "store/redux-injectors"

import { stakingPageSaga } from "./saga"
import { getDayOffset } from "containers/BlockChain/Governance/Staking/helpers/date"

// The initial state of the StakingPage container
export const initialState: ContainerState = {
  enteredMainTokenToStake: "",
  selectedEpoch: undefined,
}

const stakingPageSlice = createSlice({
  name: "stakingPage",
  initialState,
  reducers: {
    setEnteredMainTokenToStake(state, action: PayloadAction<string>) {
      state.enteredMainTokenToStake = action.payload
    },
    setSelectedEpoch(state, action: PayloadAction<number>) {
      let selectedEpoch
      switch (action.payload) {
        case 1:
          selectedEpoch = getDayOffset(new Date(), 7)
          break
        case 2:
          selectedEpoch = getDayOffset(new Date(), 30)
          break
        case 3:
          selectedEpoch = getDayOffset(new Date(), 364)
          break
        case 4:
          selectedEpoch = getDayOffset(new Date(), 365 * 2)
          break
        default:
          selectedEpoch = getDayOffset(new Date(), 7)
          break
      }
      state.selectedEpoch = selectedEpoch
    },
  },
})

export const {
  actions: StakingPageActions,
  reducer: StakingPageReducer,
  name: sliceKey,
} = stakingPageSlice

export const useStakingPageSlice = () => {
  useInjectReducer({ key: sliceKey, reducer: StakingPageReducer })
  useInjectSaga({ key: sliceKey, saga: stakingPageSaga })
  return { StakingPageActions }
}
