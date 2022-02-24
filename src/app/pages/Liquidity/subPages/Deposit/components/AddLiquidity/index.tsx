import React, { FC } from "react";
import { styled, Grid, Typography } from "@mui/material";

import { CssVariables } from "styles/cssVariables/cssVariables";
import { AdvanceOption } from "./components/AdvanceOption";
import { ContainedButton } from "app/components/common/buttons/containedButton";
import { CurrencyInput } from "./components/CurrencyInut";

export const AddLiquidity: FC = () => {
  return (
    <StyledAddLiquidity>
      <Grid container direction="column" spacing={2}>
        <Grid item>
          <HeaderText variant="h4">ADD LIQUIDITY</HeaderText>
        </Grid>

        {[1, 2, 3, 4].map((inputItem) => (
          <Grid item key={inputItem}>
            <CurrencyInput />
          </Grid>
        ))}

        <Grid item>
          <AdvanceOption />
        </Grid>

        <Grid item alignSelf="center">
          <ContainedButton width={220}>Deposit</ContainedButton>
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
