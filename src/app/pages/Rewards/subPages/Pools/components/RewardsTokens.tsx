import React, { FC } from "react";
import { styled, Grid, Typography } from "@mui/material";

import { CssVariables } from "styles/cssVariables/cssVariables";
import axialIcon from "assets/icons/logo_icon.svg";
import avaxIcon from "assets/icons/AVAX.png";
import { mobile } from "styles/media";

export const RewardsTokens: FC = () => {
  return (
    <Grid container spacing={1}>
      <Grid item xs={12}>
        <PoolInfoTitleText variant="body1">Rewards</PoolInfoTitleText>
      </Grid>

      <Grid item container>
        <Grid item container spacing={1} alignItems="center" xs={6}>
          <Grid item>
            <PoolTokenImage src={axialIcon} alt={`token-AXIAL`} />
          </Grid>
          <Grid item>
            <PoolInfoTitleText variant="body1">AXIAL</PoolInfoTitleText>
          </Grid>
        </Grid>

        <Grid item container spacing={1} alignItems="center" xs={6}>
          <Grid item>
            <PoolTokenImage src={avaxIcon} alt={`token-AVAX`} />
          </Grid>
          <Grid item>
            <PoolInfoTitleText variant="body1">AVAX</PoolInfoTitleText>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
};

const PoolInfoTitleText = styled(Typography)({
  color: CssVariables.white,

  [mobile]: {
    fontSize: "14px",
  },
});

const PoolTokenImage = styled("img")({
  width: "22px",
  height: "22px",

  [mobile]: {
    width: "22px",
  },
});
