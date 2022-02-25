import React, { FC } from "react";
import { styled, Grid, Typography } from "@mui/material";

import { CssVariables } from "styles/cssVariables/cssVariables";

export const Info: FC = () => {
  return (
    <Grid
      container
      spacing={4}
      justifyContent="space-between"
      alignItems="center"
    >
      <Grid item>
        <Grid container spacing={1}>
          <Grid item>
            <PoolInfoTitleText variant="body1">Swap APR</PoolInfoTitleText>
          </Grid>
          <Grid item>
            <PoolInfoSubTitleText variant="body2">2.44%</PoolInfoSubTitleText>
          </Grid>
        </Grid>
      </Grid>

      <Grid item>
        <Grid container spacing={1}>
          <Grid item>
            <PoolInfoTitleText variant="body1">TVL</PoolInfoTitleText>
          </Grid>
          <Grid item>
            <PoolInfoSubTitleText variant="body2">$4.3M</PoolInfoSubTitleText>
          </Grid>
        </Grid>
      </Grid>
      
      <Grid item>
        <Grid container spacing={1}>
          <Grid item>
            <PoolInfoTitleText variant="body1">24h volume</PoolInfoTitleText>
          </Grid>
          <Grid item>
            <PoolInfoSubTitleText variant="body2">
              $784,782.18
            </PoolInfoSubTitleText>
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

const PoolInfoSubTitleText = styled(Typography)({
  color: CssVariables.white,
  fontSize: "16px",
});
