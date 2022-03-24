import React, { FC } from "react";
import { styled, Grid, Typography } from "@mui/material";
import { useTranslation } from "react-i18next";

import { translations } from "locales/i18n";
import { CssVariables } from "styles/cssVariables/cssVariables";
import { AdvanceOption } from "app/pages/Rewards/components/AdvanceOption";
import { ContainedButton } from "app/components/common/buttons/containedButton";
import { CurrencyInput } from "./CurrencyInput";
import { CompoundWithSnowball } from "./CompoundWithSnowball";

export const DepositWrapped: FC = () => {
  const { t } = useTranslation();

  return (
    <StyledAddLiquidity>
      <Grid container direction="column" spacing={2}>
        <Grid item>
          <HeaderText variant="h4">
            {t(translations.RewardsPage.Deposit.Title())}
          </HeaderText>
        </Grid>

        <Grid item alignSelf="end">
          <BalanceText variant="body2">
            {t(translations.RewardsPage.WalletBalance())}: 0.00
          </BalanceText>
        </Grid>

        <Grid item>
          <CurrencyInput />
        </Grid>

        <Grid item>
          <AdvanceOption />
        </Grid>

        <Grid item>
          <Grid container spacing={2} direction="column" alignItems="center">
            <Grid item>
              <ContainedButton width={220}>
                {t(translations.RewardsPage.ActionButtons.Deposit())}
              </ContainedButton>
            </Grid>

            <Grid item>
              <OrText variant="body2">
                {t(translations.RewardsPage.Deposit.Or())}
              </OrText>
            </Grid>

            <Grid item>
              <CompoundWithSnowball />
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </StyledAddLiquidity>
  );
};

const StyledAddLiquidity = styled("div")({
  width: 600,
  margin: "0 auto",
  backgroundColor: CssVariables.poolCardBackground,
  border: `4px solid ${CssVariables.cardBorder}`,
  borderRadius: "20px",
  padding: "40px",
});

const HeaderText = styled(Typography)({
  color: CssVariables.white,
  fontSize: "26px",
});

const BalanceText = styled(Typography)({
  color: CssVariables.white,
  fontSize: "16px",
});

const OrText = styled(Typography)({
  color: CssVariables.white,
  fontSize: "16px",
});
