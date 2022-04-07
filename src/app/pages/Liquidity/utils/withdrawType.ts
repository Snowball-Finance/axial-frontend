import { TokenAmounts, WithdrawType } from "app/containers/Rewards/types";
import { TokenSymbols } from "app/containers/Swap/types";
import { TypeOfTokensToWithdraw } from "../types";

interface Props {
  tokenAmounts: TokenAmounts;
  selectedToken: TypeOfTokensToWithdraw | TokenSymbols;
}

export const withdrawType = ({ tokenAmounts, selectedToken }: Props) => {
  let type: WithdrawType | TokenSymbols = WithdrawType.IMBALANCE;
  if (Object.keys(tokenAmounts).length === 1) {
    type = Object.keys(tokenAmounts)[0] as TokenSymbols;
  } else if (selectedToken === TypeOfTokensToWithdraw.Mixed) {
    type = WithdrawType.IMBALANCE;
  } else if (selectedToken === TypeOfTokensToWithdraw.Combo) {
    type = WithdrawType.ALL;
  }
  return type;
};
