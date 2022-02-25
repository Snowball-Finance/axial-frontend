import React, { FC } from "react";
import { styled, Grid, Typography } from "@mui/material";

import { CssVariables } from "styles/cssVariables/cssVariables";
import axialIcon from "assets/images/logo.svg";

export const CurrencyInfo: FC = () => {
  return (
    <StyledInfo>
      <Grid container direction="column" spacing={2}>
        {[1, 2, 3, 4].map((infoItem) => (
          <Grid item key={infoItem}>
            <Grid container justifyContent="space-between" alignItems="center">
              <Grid item>
                <Grid container spacing={1}>
                  <Grid item>
                    <IconImage src={axialIcon} alt="icon"></IconImage>
                  </Grid>

                  <Grid item>
                    <TokenText variant="h6">Axial</TokenText>
                  </Grid>
                </Grid>
              </Grid>

              <Grid item>
                <BalanceText variant="body2">18.80%</BalanceText>
              </Grid>

              <Grid item>
                <Grid container spacing={1} alignItems="center">
                  <Grid item>
                    <BalanceLabelText variant="body1">TVL</BalanceLabelText>
                  </Grid>

                  <Grid item>
                    <BalanceText variant="body2">$765,996.95</BalanceText>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        ))}
      </Grid>
    </StyledInfo>
  );
};

const StyledInfo = styled("div")({
  width: "100%",
  backgroundColor: CssVariables.swapInputbackground,
  border: `4px solid ${CssVariables.poolCardBorder}`,
  borderRadius: "20px",
  padding: 20,
});

const IconImage = styled("img")({
  width: "33px",
});

const TokenText = styled(Typography)({
  color: CssVariables.white,
});

const BalanceLabelText = styled(Typography)({
  color: CssVariables.white,
  fontWeight: "bold",
});

const BalanceText = styled(Typography)({
  color: CssVariables.white,
});
