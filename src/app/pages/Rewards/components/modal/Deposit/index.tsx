import React, { FC } from "react";
import { styled, Grid, Typography } from "@mui/material";
import { useSelector } from "react-redux";
import { useTranslation } from "react-i18next";

import { translations } from "locales/i18n";
import { CssVariables } from "styles/cssVariables/cssVariables";
import { RewardsPageSelectors } from "app/pages/Rewards/selectors";
import { CardWrapper } from "app/components/wrappers/Card";
import { IconWithTitle } from "../components/IconWithTitle";
import { Steps } from "./components/Steps";

export const DepositModal: FC = () => {
  const { t } = useTranslation();
  const pool = useSelector(RewardsPageSelectors.selectedPool);
  const depositValue = useSelector(RewardsPageSelectors.depositValue);

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
                <IconWithTitle tokenSymbol={pool?.lpToken.symbol} />
              </Text>
            </Grid>

            <Grid item>
              <Text variant="h6">{parseFloat(depositValue)}</Text>
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
