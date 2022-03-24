import React, { FC } from "react";
import { styled, Grid, Typography } from "@mui/material";
import { useTranslation } from "react-i18next";

import { translations } from "locales/i18n";
import { CssVariables } from "styles/cssVariables/cssVariables";
import { CardWrapper } from "app/components/wrappers/Card";
import { OutlinedButton } from "app/components/common/buttons/outlinedButton";
import { ContainedButton } from "app/components/common/buttons/containedButton";
import { IconWithTitle } from "./components/IconWithTitle";
import { Message } from "./components/Message";
import { Rates } from "./components/Rates";
import { Total } from "./components/Total";

export const WithdrawModal: FC = () => {
  const { t } = useTranslation();

  return (
    <Grid container direction="column" spacing={1}>
      <Grid item>
        <Text variant="h6">
          {t(translations.LiquidityPage.Modal.ReviewWithdraw())}
        </Text>
      </Grid>

      <Grid item>
        <CardWrapper>
          <Grid container direction="column" spacing={2}>
            {[1, 2, 3, 4].map((item) => (
              <Grid item key={item}>
                <Grid
                  container
                  justifyContent="space-between"
                  alignItems="center"
                >
                  <Grid item>
                    <IconWithTitle />
                  </Grid>

                  <Grid item>
                    <Text variant="h6">1.054525</Text>
                  </Grid>
                </Grid>
              </Grid>
            ))}

            <Grid item>
              <Total />
            </Grid>
          </Grid>
        </CardWrapper>
      </Grid>

      <Grid item>
        <CardWrapper>
          <Grid container direction="column" spacing={1}>
            <Grid item>
              <Grid container justifyContent="space-between">
                <Grid item>
                  <Text variant="body2">
                    {t(translations.LiquidityPage.Modal.Gas())}
                  </Text>
                </Grid>

                <Grid item>
                  <Text variant="body2">58 GWEI</Text>
                </Grid>
              </Grid>
            </Grid>

            <Grid item>
              <Grid container justifyContent="space-between">
                <Grid item>
                  <Text variant="body2">
                    {t(translations.LiquidityPage.Modal.MaxSlippage())}
                  </Text>
                </Grid>

                <Grid item>
                  <Text variant="body2">0.1%</Text>
                </Grid>
              </Grid>
            </Grid>

            <Grid item>
              <Grid container justifyContent="space-between">
                <Grid item>
                  <Text variant="body2">
                    {t(translations.LiquidityPage.Modal.TxnDeadline())}
                  </Text>
                </Grid>

                <Grid item>
                  <Text variant="body2">20 min</Text>
                </Grid>
              </Grid>
            </Grid>

            <Grid item>
              <Rates />
            </Grid>
          </Grid>
        </CardWrapper>
      </Grid>

      <Grid item>
        <Message />
      </Grid>

      <Grid item>
        <Grid container justifyContent="center" alignItems="center" spacing={2}>
          <Grid item>
            <OutlinedButton>
              {t(translations.LiquidityPage.Buttons.Cancel())}
            </OutlinedButton>
          </Grid>
          <Grid item>
            <ContainedButton>
              {t(translations.LiquidityPage.Buttons.ConfirmWithdraw())}
            </ContainedButton>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
};

const Text = styled(Typography)({
  color: CssVariables.white,
});