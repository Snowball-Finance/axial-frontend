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
  selectedEpoch: Date | undefined;
  selectedDepositAndWithdrawTab: DepositAndWithdrawTab;
  selectedDepositUnlockPeriod: DepositUnlockPeriod;
  selectedDepositSliderValue: number;
}

export type ContainerState = StakingPageState;
