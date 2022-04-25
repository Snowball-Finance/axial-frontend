import React, { FC } from "react";
import { styled, Grid, Typography } from "@mui/material";
import { useSelector } from "react-redux";

import { CssVariables } from "styles/cssVariables/cssVariables";
import { RewardsPageSelectors } from "app/pages/Rewards/selectors";
import { TokenImageProps } from "app/pages/Rewards/types";
import { Token } from "app/containers/Swap/types";
import { Pools } from "app/containers/Rewards/types";
import { JLPToken } from "./JLPToken";
import { mobile } from "styles/media";

export const TokenImages: FC<TokenImageProps> = ({ poolKey }) => {
  const poolTokens = useSelector(
    RewardsPageSelectors.rewardsPoolTokens(poolKey)
  );

  if (poolKey === Pools.AXIAL_JLP) {
    return <JLPToken />;
  }

  return (
    <StyledContainer container spacing={{ xs: 1, xl: 2 }} alignItems="center">
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
                <PoolInfoTitleText variant="body1">
                  {token.symbol}
                </PoolInfoTitleText>
              </Grid>
            </Grid>
          </Grid>
        ))}
    </StyledContainer>
  );
};

const StyledContainer = styled(Grid)({
  [mobile]: {
    fontSize: "14px",
  },
});

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
