import { styled, Typography } from "@mui/material";
import { useSelector } from "react-redux";
import { useTranslation } from "react-i18next";

import { translations } from "locales/i18n";
import { CssVariables } from "styles/cssVariables/cssVariables";
import { Token } from "app/containers/Swap/types";
import { parseUnits } from "ethers/lib/utils";
import { LiquidityPageSelectors } from "app/pages/Liquidity/selectors";
import { zeroString } from "app/pages/Liquidity/constants";

export const InsufficientBalance = ({ token }: { token: Token }) => {
  const { t } = useTranslation();
  const depositTokens = useSelector(
    LiquidityPageSelectors.liquidityDepositTokenAmounts
  );
  if (
    token?.balance &&
    token?.balance.lt(
      parseUnits(
        depositTokens[token.symbol] ?? zeroString,
        token?.decimals || 18
      )
    )
  ) {
    return (
      <ErrorText variant="body2" align="right">
        {t(translations.Common.InsufficientBalance())}
      </ErrorText>
    );
  } else {
    return null;
  }
};

const ErrorText = styled(Typography)({
  color: CssVariables.error,
});
