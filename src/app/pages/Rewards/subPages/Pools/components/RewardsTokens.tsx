import React, { FC } from "react";
import { styled, Grid, Typography } from "@mui/material";
import { useSelector } from "react-redux";

import { CssVariables } from "styles/cssVariables/cssVariables";
import axialIcon from "assets/icons/logo_icon.svg";
import { mobile } from "styles/media";
import { PoolsAndGaugesSelectors } from "app/containers/PoolsAndGauges/selectors";
import { RewardsPageSelectors } from "app/pages/Rewards/selectors";

interface Props {
  poolKey: string;
}
export const RewardsTokens: FC<Props> = ({ poolKey }) => {
  const pools = useSelector(PoolsAndGaugesSelectors.pools);
  const rewardsPool = useSelector(RewardsPageSelectors.rewardsPool(poolKey));

  if (!(rewardsPool.address in pools)) {
    return null;
  }

  return (
    <Grid container spacing={1}>
      <Grid item xs={12}>
        <PoolInfoTitleText variant="body1">Rewards</PoolInfoTitleText>
      </Grid>

      <Grid item container>
        {pools[rewardsPool.address]?.tokens.map((token) => {
          return (
            <Grid
              key={token.address}
              container
              spacing={1}
              alignItems="center"
              item
              xs={6}
            >
              <Grid item>
                <PoolTokenImage src={axialIcon} alt={`token-AXIAL`} />
              </Grid>
              <Grid item>
                <PoolInfoTitleText variant="body1">
                  {token.symbol}
                </PoolInfoTitleText>
              </Grid>
            </Grid>
          );
        })}
      </Grid>
    </Grid>
  );
};

const PoolInfoTitleText = styled(Typography)({
  color: CssVariables.white,
});

const PoolTokenImage = styled("img")({
  width: "22px",
  height: "22px",

  [mobile]: {
    width: "22px",
    height: "22px",
  },
});
