import React, { FC } from "react";
import { styled, Grid } from "@mui/material";

import { CssVariables } from "styles/cssVariables/cssVariables";
import { mobile } from "styles/media";
import { CurrencyReserve } from "../CurrencyReserve";
import { MyShare } from "../MyShare";
import { ClaimRewards } from "../ClaimRewards";

export const CurrencyInfo: FC = () => {
  return (
    <StyledCurrencyInfo>
      <Grid container direction="column" spacing={4}>
        <Grid item>
          <MyShare />
        </Grid>

        <Grid item>
          <ClaimRewards />
        </Grid>

        <Grid item>
          <CurrencyReserve />
        </Grid>
      </Grid>
    </StyledCurrencyInfo>
  );
};

const StyledCurrencyInfo = styled("div")({
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
