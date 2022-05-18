import { styled, Typography } from "@mui/material";
import { useDispatch } from "react-redux";
import { useTranslation } from "react-i18next";

import { translations } from "locales/i18n";
import { TextButton } from "app/components/common/buttons/textButton";
import { CssVariables } from "styles/cssVariables/cssVariables";
import { BNToString } from "common/format";
import { Token, TokenSymbols } from "app/containers/Swap/types";
import { Zero } from "app/containers/Rewards/constants";
import { LiquidityPageActions } from "app/pages/Liquidity/slice";

export const Max = ({ token }: { token: Token }) => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const amountString = BNToString(token.balance ?? Zero, token.decimals);

  const handleAllInClick = () => {
    let value = amountString || "0";
    dispatch(
      LiquidityPageActions.setLiquidityDepositTokenAmount({
        symbol: token.symbol as TokenSymbols,
        value,
      })
    );
  };

  return (
    <TextButton onClick={handleAllInClick}>
      <MaxText variant="h2">{t(translations.SwapPage.FromToken.Max())}</MaxText>
    </TextButton>
  );
};

const MaxText = styled(Typography)({
  color: CssVariables.green,
  textTransform: "uppercase",
});
