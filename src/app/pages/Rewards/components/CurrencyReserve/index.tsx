import React, { FC } from "react";
import { styled, Grid } from "@mui/material";

import { CssVariables } from "styles/cssVariables/cssVariables";
import { CurrencyInfo } from "./CurrencyInfo";
import { MyShare } from "./MyShare";
import { mobile } from "styles/media";

export const CurrencyReserve: FC = () => {
  return (
    <StyledCurrencyReserve>
      <Grid container direction="column" spacing={4}>
        <Grid item>
          <MyShare />
        </Grid>

        <Grid item>
          <CurrencyInfo />
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
