import React, { FC } from "react";
import { styled, Grid, Typography } from "@mui/material";

import { CssVariables } from "styles/cssVariables/cssVariables";
import { tokens } from "app/tokens";

export const IconWithTitle: FC = () => {
  const demo = tokens.AVAI;

  return (
    <TokenIconContainer>
      <Grid container spacing={1} alignItems="center" justifyContent="center">
        <Grid item>
          <TokenIcon src={demo.logo} alt={`token-${demo.address}`} />
        </Grid>

        <Grid item>
          <TokenTitle variant="body2">{demo.symbol}</TokenTitle>
        </Grid>
      </Grid>
    </TokenIconContainer>
  );
};

const TokenIconContainer = styled("div")({
  border: `2px solid ${CssVariables.cardBorder}`,
  borderRadius: CssVariables.buttonBorderRadius,
  padding: 5,
  minWidth: 150,
});

const TokenTitle = styled(Typography)({});

const TokenIcon = styled("img")({
  width: "33px",
});
