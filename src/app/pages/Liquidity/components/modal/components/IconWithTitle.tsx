import React, { FC } from "react";
import { styled, Grid, Typography } from "@mui/material";

import { CssVariables } from "styles/cssVariables/cssVariables";
import { tokens } from "app/tokens";

export const IconWithTitle: FC<{ tokenSymbol?: string }> = ({
  tokenSymbol = "",
}) => {
  const token = tokens[tokenSymbol];

  return (
    <TokenIconContainer>
      <Grid container spacing={1} alignItems="center" justifyContent="center">
        <Grid item>
          <TokenIcon src={token?.logo} alt={`token-${token?.address}`} />
        </Grid>

        <Grid item>
          <TokenTitle variant="body2">{token?.symbol}</TokenTitle>
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
