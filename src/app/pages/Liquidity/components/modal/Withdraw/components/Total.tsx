import React, { FC } from "react";
import { styled, Grid, Typography } from "@mui/material";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";

import { translations } from "locales/i18n";
import { CssVariables } from "styles/cssVariables/cssVariables";
import { LiquidityPageSelectors } from "app/pages/Liquidity/selectors";

export const Total: FC = () => {
  const { t } = useTranslation();
  const withdrawReviewData = useSelector(
    LiquidityPageSelectors.withdrawReviewData
  );

  return (
    <Grid
      container
      justifyContent="space-between"
      alignItems="center"
      spacing={{ xs: 2, xl: 0 }}
    >
      <Grid item>
        <Text variant="h2">{t(translations.LiquidityPage.Modal.Total())}</Text>
      </Grid>

      <Grid item xs zeroMinWidth>
        <Text variant="h2" noWrap align="right">
          {withdrawReviewData?.total}
        </Text>
      </Grid>
    </Grid>
  );
};

const Text = styled(Typography)({
  color: CssVariables.white,
  textTransform: "uppercase",
});
