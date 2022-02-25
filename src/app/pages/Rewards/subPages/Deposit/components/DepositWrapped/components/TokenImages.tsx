import React, { FC } from "react";
import { styled, Grid, Typography } from "@mui/material";

import { CssVariables } from "styles/cssVariables/cssVariables";
import snobIcon from "assets/images/logo.svg";

export const TokenImages: FC = () => {
  return (
    <Grid container spacing={2} alignItems="center">
      {[1, 2, 3, 4].map((image) => (
        <Grid item key={image}>
          <Grid container spacing={1} alignItems="center">
            <Grid item>
              <PoolTokenImage src={snobIcon} alt="token1" />
            </Grid>
            <Grid item>
              <PoolInfoTitleText>AXIAL</PoolInfoTitleText>
            </Grid>
          </Grid>
        </Grid>
      ))}
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
