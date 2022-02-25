import React, { FC } from "react";
import { styled, Grid, Typography } from "@mui/material";

import { CssVariables } from "styles/cssVariables/cssVariables";
import { AdvanceOption } from "./components/AdvanceOption";
import { ContainedButton } from "app/components/common/buttons/containedButton";
import { CurrencyInput } from "./components/CurrencyInput";
import { OutlinedButton } from "app/components/common/buttons/outlinedButton";

export const DepositWrapped: FC = () => {
  return (
    <StyledAddLiquidity>
      <Grid container direction="column" spacing={2}>
        <Grid item>
          <HeaderText variant="h4">DEPOSIT WRAPPED</HeaderText>
        </Grid>

        <Grid item alignSelf="end">
          <BalanceText variant="body2">Wallet balance: 0.00</BalanceText>
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
              <ContainedButton width={220}>Deposit</ContainedButton>
            </Grid>

            <Grid item>
              <OrText variant="body2">Or</OrText>
            </Grid>

            <Grid item>
              <OutlinedButton width={420}>
                COMPOUND WITH SNOWBALL
              </OutlinedButton>
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
  border: `4px solid ${CssVariables.poolCardBorder}`,
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
