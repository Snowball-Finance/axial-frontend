export enum Deadlines {
  Ten = "TEN",
  Twenty = "TWENTY",
  Thirty = "THIRTY",
  Forty = "FORTY",
  Custom = "CUSTOM",
}

export function formatDeadlineToNumber(
  deadlineSelected: Deadlines,
  deadlineCustom?: string
): number {
  let deadline = 20;
  switch (deadlineSelected) {
    case Deadlines.Ten:
      deadline = 10;
      break;
    case Deadlines.Twenty:
      deadline = 20;
      break;
    case Deadlines.Thirty:
      deadline = 30;
      break;
    case Deadlines.Forty:
      deadline = 40;
      break;
    case Deadlines.Custom:
      deadline = +(deadlineCustom || formatDeadlineToNumber(Deadlines.Twenty));
      break;
  }
  return deadline;
}
