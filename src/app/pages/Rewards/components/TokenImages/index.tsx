import React, { FC } from "react";
import { styled, Grid, Typography } from "@mui/material";
import { useSelector } from "react-redux";

import { CssVariables } from "styles/cssVariables/cssVariables";
import { RewardsPageSelectors } from "app/pages/Rewards/selectors";
import { TokenImageProps } from "app/pages/Rewards/types";
import { Token } from "app/containers/Swap/types";
import { Pools } from "app/containers/Rewards/types";
import { JLPToken } from "./JLPToken";

export const TokenImages: FC<TokenImageProps> = ({ poolKey }) => {
  const poolTokens = useSelector(
    RewardsPageSelectors.rewardsPoolTokens(poolKey)
  );

  if (poolKey === Pools.AXIAL_JLP) {
    return <JLPToken />;
  }

  return (
    <Grid container spacing={2} alignItems="center">
      {poolTokens &&
        poolTokens.map((token: Token) => (
          <Grid item key={token.address}>
            <Grid container spacing={1} alignItems="center">
              <Grid item>
                <PoolTokenImage
                  src={token.logo}
                  alt={`token-${token.symbol}`}
                />
              </Grid>
              <Grid item>
                <PoolInfoTitleText>{token.symbol}</PoolInfoTitleText>
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
