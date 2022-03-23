import React, { FC } from "react";
import { styled, Grid, Typography } from "@mui/material";
import { useTranslation } from "react-i18next";

import { translations } from "locales/i18n";
import { CssVariables } from "styles/cssVariables/cssVariables";

export const Rates: FC = () => {
  const { t } = useTranslation();

  return (
    <Grid container justifyContent="space-between">
      <Grid item>
        <Text variant="body2">
          {t(translations.LiquidityPage.Modal.Rates())}
        </Text>
      </Grid>

      <Grid item>
        <Grid container direction="column" spacing={1}>
          <Grid item>
            <Text variant="body2">1 DAI.e = $0.00</Text>
          </Grid>

          <Grid item>
            <Text variant="body2">1 DAI.e = $0.00</Text>
          </Grid>

          <Grid item>
            <Text variant="body2">1 DAI.e = $0.00</Text>
          </Grid>

          <Grid item>
            <Text variant="body2">1 DAI.e = $0.00</Text>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
};

const Text = styled(Typography)({
  color: CssVariables.white,
});
