import { styled, Typography } from "@mui/material";
import { Zero } from "app/containers/Rewards/constants";
import { Token } from "app/containers/Swap/types";
import { BNToString } from "common/format";
import { translations } from "locales/i18n";
import { useTranslation } from "react-i18next";
import { CssVariables } from "styles/cssVariables/cssVariables";

export const WalletBalance = ({ token }: { token: Token }) => {
  const { t } = useTranslation();
  const amountString = BNToString(token.balance ?? Zero, token.decimals);

  return (
    <BalanceText variant="body2">
      {t(translations.LiquidityPage.WalletBalance())}: {amountString}
    </BalanceText>
  );
};

const BalanceText = styled(Typography)({
  color: CssVariables.white,
});
