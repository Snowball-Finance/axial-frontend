import React, { FC } from "react";
import { styled, Grid, Typography } from "@mui/material";

import { CssVariables } from "styles/cssVariables/cssVariables";
import { Info } from "./components/Info";
import { MyShare } from "./components/MyShare";

export const CurrencyReserve: FC = () => {
  return (
    <StyledCurrencyReserve>
      <Grid container direction="column" spacing={2}>
        <Grid item>
          <HeaderText variant="h4">CURRENCY RESERVES</HeaderText>
        </Grid>

        <Grid item>
          <Info />
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
  border: `4px solid ${CssVariables.poolCardBorder}`,
  borderRadius: "20px",
  padding: "40px",
});

const HeaderText = styled(Typography)({
  color: CssVariables.white,
  fontSize: "26px",
});
