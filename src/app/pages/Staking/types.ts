/* --- STATE --- */
export enum DepositAndWithdrawTab {
  Deposit = "deposit",
  Withdraw = "withdraw",
}
export enum DepositUnlockPeriod {
  daily = "daily",
  end = "end",
}
export interface StakingPageState {
  enteredMainTokenToStake: string;
  enteredMainTokenToStakeInVeAxial: string;
  selectedEpoch: Date | undefined;
  selectedDepositAndWithdrawTab: DepositAndWithdrawTab;
  selectedVeAxialDepositAndWithdrawTab: DepositAndWithdrawTab;
  selectedDepositUnlockPeriod: DepositUnlockPeriod;
  selectedDepositSliderValue: number;
  daysToUnlockGovernanceTokens: number;
}

export type ContainerState = StakingPageState;
