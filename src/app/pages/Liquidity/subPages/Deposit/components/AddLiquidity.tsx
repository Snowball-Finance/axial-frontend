import React, { FC } from "react";
import { styled, Grid, Typography } from "@mui/material";
import { useTranslation } from "react-i18next";

import { translations } from "locales/i18n";
import { CssVariables } from "styles/cssVariables/cssVariables";
import { AdvanceOption } from "../../../../../components/common/advancedOptions";
import { CurrencyInputs } from "./CurrencyInput";
import { DepositButton } from "./depositButton";

export const AddLiquidity: FC = () => {
  const { t } = useTranslation();

  return (
    <StyledAddLiquidity>
      <Grid container direction="column" spacing={2}>
        <Grid item>
          <HeaderText variant="h4">
            {t(translations.LiquidityPage.AddLiquidity.Title())}
          </HeaderText>
        </Grid>

        <CurrencyInputs />

        <Grid item>
          <AdvanceOption />
        </Grid>

        <Grid item alignSelf="center">
          <DepositButton />
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
