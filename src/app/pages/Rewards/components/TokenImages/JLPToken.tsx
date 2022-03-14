import React, { FC } from "react";
import { styled, Grid, Typography } from "@mui/material";

import { CssVariables } from "styles/cssVariables/cssVariables";
import axialIcon from "assets/icons/logo_icon.svg";
import avaxIcon from "assets/icons/AVAX.png";

export const JLPToken: FC = () => {
  return (
    <Grid container spacing={2} alignItems="center">
      <Grid item>
        <Grid container spacing={1} alignItems="center">
          <Grid item>
            <PoolTokenImage src={axialIcon} alt={`token-AXIAL`} />
          </Grid>
          <Grid item>
            <PoolInfoTitleText>AXIAL</PoolInfoTitleText>
          </Grid>
        </Grid>
      </Grid>

      <Grid item>
        <Grid container spacing={1} alignItems="center">
          <Grid item>
            <PoolTokenImage src={avaxIcon} alt={`token-AVAX`} />
          </Grid>
          <Grid item>
            <PoolInfoTitleText>AVAX</PoolInfoTitleText>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
};

const PoolInfoTitleText = styled(Typography)({
  color: CssVariables.white,
  fontSize: "16px",
  fontWeight: "bold",
});

const PoolTokenImage = styled("img")({
  width: "33px",
});
