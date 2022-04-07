import React, { FC } from "react";
import { styled, Grid, Typography } from "@mui/material";
import { useSelector } from "react-redux";
import { useTranslation } from "react-i18next";

import { translations } from "locales/i18n";
import { CssVariables } from "styles/cssVariables/cssVariables";
import { globalSelectors } from "app/appSelectors";
import { formatSlippageToString } from "utils/slippage";

export const Slippage: FC = () => {
  const { t } = useTranslation();
  const selectedSlippage = useSelector(globalSelectors.selectedSlippage);
  const customSlippage = useSelector(globalSelectors.customSlippage);

  return (
    <Grid container justifyContent="space-between">
      <Grid item>
        <Text variant="body1">
          {t(translations.LiquidityPage.Modal.MaxSlippage())}
        </Text>
      </Grid>

      <Grid item>
        <Text variant="body2">
          {formatSlippageToString(selectedSlippage, customSlippage)}%
        </Text>
      </Grid>
    </Grid>
  );
};

const Text = styled(Typography)({
  color: CssVariables.white,
});
