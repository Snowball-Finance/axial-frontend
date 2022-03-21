import React, { FC } from "react";
import { styled, Grid, Typography } from "@mui/material";
import { useTranslation } from "react-i18next";

import { translations } from "locales/i18n";
import { CssVariables } from "styles/cssVariables/cssVariables";
import { CardWrapper } from "app/components/wrappers/Card";
import { IconWithTitle } from "./components/IconWithTitle";
import { Steps } from "./components/Steps";

export const DepositModal: FC = () => {
  const { t } = useTranslation();

  return (
    <Grid container direction="column" spacing={1}>
      <Grid item>
        <Text variant="h6">{t(translations.RewardsPage.Modal.Deposit())}</Text>
      </Grid>

      <Grid item>
        <CardWrapper>
          <Grid container justifyContent="space-between" alignItems="center">
            <Grid item>
              <Text variant="h6">
                <IconWithTitle />
              </Text>
            </Grid>

            <Grid item>
              <Text variant="h6">1.054525</Text>
            </Grid>
          </Grid>
        </CardWrapper>
      </Grid>

      <Grid item>
        <CardWrapper>
          <Steps />
        </CardWrapper>
      </Grid>
    </Grid>
  );
};

const Text = styled(Typography)({
  color: CssVariables.white,
});
