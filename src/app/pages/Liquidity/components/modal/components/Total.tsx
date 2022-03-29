import React, { FC } from "react";
import { styled, Grid, Typography } from "@mui/material";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";

import { translations } from "locales/i18n";
import { CssVariables } from "styles/cssVariables/cssVariables";
import { LiquidityPageSelectors } from "app/pages/Liquidity/selectors";

export const Total: FC = () => {
  const { t } = useTranslation();
  const depositTransactionData = useSelector(
    LiquidityPageSelectors.depositTransactionData
  );

  return (
    <Grid container justifyContent="space-between" alignItems="center">
      <Grid item>
        <Text variant="h6">{t(translations.LiquidityPage.Modal.Total())}</Text>
      </Grid>

      <Grid item>
        <Text variant="h6">{depositTransactionData?.from.total}</Text>
      </Grid>
    </Grid>
  );
};

const Text = styled(Typography)({
  color: CssVariables.white,
});
