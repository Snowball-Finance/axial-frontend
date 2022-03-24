import React, { FC } from "react";
import { styled, Grid, Typography } from "@mui/material";
import { useTranslation } from "react-i18next";

import { translations } from "locales/i18n";
import { CssVariables } from "styles/cssVariables/cssVariables";
import { CurrencyInput } from "./CurrencyInput";
import { RewardsWithdrawSlider } from "./slider";
import { Percentage } from "./percentageText";
import { RewardsWithdrawButton } from "./withdrawButton";

export const WithdrawInput: FC = () => {
  const { t } = useTranslation();

  return (
    <StyledAddLiquidity>
      <Grid container direction="column" spacing={2}>
        <Grid item>
          <HeaderText variant="h4">
            {t(translations.RewardsPage.Withdraw.Title())}
          </HeaderText>
        </Grid>

        <Grid item>
          <RewardsWithdrawSlider />
        </Grid>

        <Grid item>
          <Grid container justifyContent="space-between">
            <Grid item>
              <PercentageText variant="body2">
                {t(translations.RewardsPage.Withdraw.WithdrawlPercentage())}{" "}
                (%):
              </PercentageText>
            </Grid>
            <Grid item>
              <Percentage />
            </Grid>
          </Grid>
        </Grid>

        <Grid item>
          <CurrencyInput />
        </Grid>

        <Grid item alignSelf="center">
          <RewardsWithdrawButton />
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

const PercentageText = styled(Typography)({
  color: CssVariables.white,
  fontSize: "16px",
});
