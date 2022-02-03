/* --- STATE --- */
export interface StakingPageState {
  enteredMainTokenToStake: string
  selectedEpoch: Date | undefined
}

export type ContainerState = StakingPageState
