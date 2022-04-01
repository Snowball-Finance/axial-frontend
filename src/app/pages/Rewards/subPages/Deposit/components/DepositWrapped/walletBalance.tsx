import { styled, Typography } from "@mui/material";
import { globalSelectors } from "app/appSelectors";
import { Zero } from "app/containers/Rewards/constants";
import { Token } from "app/containers/Swap/types";
import { zeroString } from "app/pages/Liquidity/constants";
import { RewardsPageActions } from "app/pages/Rewards/slice";
import { BNToString } from "common/format";
import { translations } from "locales/i18n";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { CssVariables } from "styles/cssVariables/cssVariables";

export const WalletBalance = ({ token }: { token: Token }) => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const tokens = useSelector(globalSelectors.tokens);
  const amountString = tokens
    ? BNToString(tokens[token.symbol].balance ?? Zero, token.decimals)
    : zeroString;
  const handleAllInClick = () => {
    dispatch(RewardsPageActions.setDepositValue(amountString || "0"));
  };
  return (
    <BalanceText variant="body2" onClick={handleAllInClick}>
      {t(translations.LiquidityPage.WalletBalance())}: {amountString}
    </BalanceText>
  );
};

const BalanceText = styled(Typography)({
  color: CssVariables.white,
  fontSize: "16px",
  cursor: "pointer",
});
