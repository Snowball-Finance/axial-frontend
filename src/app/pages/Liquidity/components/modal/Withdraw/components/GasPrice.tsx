import React, { FC } from "react";
import { styled, Grid, Typography } from "@mui/material";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";

import { translations } from "locales/i18n";
import { CssVariables } from "styles/cssVariables/cssVariables";
import { LiquidityPageSelectors } from "app/pages/Liquidity/selectors";

export const GasPrice: FC = () => {
  const { t } = useTranslation();
  const withdrawReviewData = useSelector(
    LiquidityPageSelectors.withdrawReviewData
  );

  return (
    <Grid container justifyContent="space-between" alignItems="center">
      <Grid item>
        <Text variant="body2">
          {t(translations.LiquidityPage.Modal.Gas())}
        </Text>
      </Grid>

      <Grid item>
        <Text variant="body2">{withdrawReviewData?.gasPrice} GWEI</Text>
      </Grid>
    </Grid>
  );
};

const Text = styled(Typography)({
  color: CssVariables.white,
});
