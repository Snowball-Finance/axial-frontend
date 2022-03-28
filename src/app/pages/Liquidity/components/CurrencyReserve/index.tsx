import React, { FC } from "react";
import { styled, Grid, Typography } from "@mui/material";
import { useTranslation } from "react-i18next";

import { translations } from "locales/i18n";
import { CssVariables } from "styles/cssVariables/cssVariables";
import { CurrencyInfo } from "./CurrencyInfo";
import { MyShare } from "./MyShare";
import { mobile } from "styles/media";

export const CurrencyReserve: FC = () => {
  const { t } = useTranslation();

  return (
    <StyledCurrencyReserve>
      <Grid container direction="column" spacing={2}>
        <Grid item>
          <HeaderText variant="h4">
            {t(translations.LiquidityPage.CurrencyReserves())}
          </HeaderText>
        </Grid>

        <Grid item>
          <CurrencyInfo />
        </Grid>

        <Grid item>
          <MyShare />
        </Grid>
      </Grid>
    </StyledCurrencyReserve>
  );
};

const StyledCurrencyReserve = styled("div")({
  width: 600,
  margin: "0 auto",
  backgroundColor: CssVariables.poolCardBackground,
  border: `4px solid ${CssVariables.cardBorder}`,
  borderRadius: "20px",
  padding: "40px",

  [mobile]: {
    width: "100%",
    padding: "20px",
  },
});

const HeaderText = styled(Typography)({
  color: CssVariables.white,
  fontSize: "26px",
});
