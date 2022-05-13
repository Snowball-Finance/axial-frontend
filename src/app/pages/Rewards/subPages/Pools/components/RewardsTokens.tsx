import React, { FC } from "react";
import { styled, Grid, Typography } from "@mui/material";

import { CssVariables } from "styles/cssVariables/cssVariables";
import { mobile } from "styles/media";
import { Pools } from "app/containers/Rewards/types";
import { PoolsAndGaugesSelectors } from "app/containers/PoolsAndGauges/selectors";
import { useSelector } from "react-redux";

export const RewardsTokens: FC<{ poolKey: Pools }> = ({ poolKey }) => {
  const harvestables = useSelector(
    PoolsAndGaugesSelectors.harvestableTokensOfPool(poolKey)
  );
  return (
    <Grid container spacing={1}>
      {harvestables.length > 0 && (
        <Grid item xs={12}>
          <PoolInfoHeaderText variant="body1">Rewards</PoolInfoHeaderText>
        </Grid>
      )}

      <Grid item container>
        {harvestables.map((harvestable) => {
          return (
            <Grid
              item
              container
              spacing={1}
              alignItems="center"
              key={harvestable.token.address}
            >
              <Grid item>
                <PoolTokenImage
                  src={harvestable.token.logo}
                  alt={`token-AXIAL`}
                />
              </Grid>
              <Grid item>
                <PoolInfoTitleText variant="body1">
                  {harvestable.token.name}
                </PoolInfoTitleText>
              </Grid>
            </Grid>
          );
        })}
      </Grid>
    </Grid>
  );
};

const PoolInfoHeaderText = styled(Typography)({
  color: CssVariables.white,

  [mobile]: {
    textAlign: "center",
  },
});

const PoolInfoTitleText = styled(Typography)({
  color: CssVariables.white,
});

const PoolTokenImage = styled("img")({
  width: "22px",
  height: "22px",

  [mobile]: {
    width: "22px",
  },
});
