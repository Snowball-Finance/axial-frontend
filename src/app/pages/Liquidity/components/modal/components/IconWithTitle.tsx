import React, { FC } from "react";
import { styled, Grid, Typography } from "@mui/material";

import { CssVariables } from "styles/cssVariables/cssVariables";
import { tokens } from "app/tokens";
import { mobile } from "styles/media";

export const IconWithTitle: FC<{ tokenSymbol?: string }> = ({
  tokenSymbol = "",
}) => {
  const token = tokens[tokenSymbol];

  return (
    <TokenIconContainer>
      <Grid
        container
        spacing={1}
        alignItems="center"
        justifyContent="flex-start"
      >
        <Grid item>
          <TokenIcon src={token?.logo} alt={`token-${token?.address}`} />
        </Grid>

        <Grid item>
          <TokenTitle variant="h2">{token?.symbol}</TokenTitle>
        </Grid>
      </Grid>
    </TokenIconContainer>
  );
};

const TokenIconContainer = styled("div")({
  border: `2px solid ${CssVariables.cardBorder}`,
  borderRadius: "20px",
  padding: "6px 16px",
});

const TokenTitle = styled(Typography)({});

const TokenIcon = styled("img")({
  width: "32px",
  height: "32px",

  [mobile]: {
    width: "25px",
  },
});
