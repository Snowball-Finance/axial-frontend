import React, { FC } from "react";
import { styled, Grid, Typography } from "@mui/material";
import { useSelector } from "react-redux";

import { CssVariables } from "styles/cssVariables/cssVariables";
import { Token } from "app/containers/Swap/types";
import { TokenImageProps } from "app/pages/Liquidity/types";
import { LiquidityPageSelectors } from "app/pages/Liquidity/selectors";
import { mobile } from "styles/media";

export const TokenImages: FC<TokenImageProps> = ({ poolKey }) => {
  const poolTokens = useSelector(
    LiquidityPageSelectors.liquidityPoolTokens(poolKey)
  );

  return (
    <StyledContainer container spacing={{ xs: 1, xl: 2 }} alignItems="center">
      {poolTokens.map((token: Token) => (
        <Grid item key={token.address}>
          <Grid container spacing={1} alignItems="center">
            <Grid item>
              <PoolTokenImage src={token.logo} alt={`token-${token.symbol}`} />
            </Grid>
            <Grid item>
              <PoolInfoTitleText>{token.symbol}</PoolInfoTitleText>
            </Grid>
          </Grid>
        </Grid>
      ))}
    </StyledContainer>
  );
};

const StyledContainer = styled(Grid)({
  justifyContent: "space-between",

  [mobile]: {
    fontSize: "14px",
  },
});

const PoolInfoTitleText = styled(Typography)({
  color: CssVariables.white,
  fontSize: "16px",
  fontWeight: "bold",

  [mobile]: {
    fontSize: "14px",
  },
});

const PoolTokenImage = styled("img")({
  width: "33px",

  [mobile]: {
    width: "25px",
  },
});
