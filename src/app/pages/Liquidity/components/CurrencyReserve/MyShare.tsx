import React, { FC } from "react";
import { styled, Grid, Typography } from "@mui/material";

import { CssVariables } from "styles/cssVariables/cssVariables";

export const MyShare: FC = () => {
  return (
    <StyledMyShare>
      <Grid container direction="column" spacing={2}>
        <Grid item>
          <Grid
            container
            justifyContent="space-between"
            alignItems="center"
            spacing={1}
          >
            <Grid item>
              <MyShareTitle variant="h5">MY SHARE</MyShareTitle>
            </Grid>

            <Grid item>
              <MyShareBalanceText variant="body2">
                0.50% of pool
              </MyShareBalanceText>
            </Grid>
          </Grid>
        </Grid>

        <Grid item>
          <Grid
            container
            justifyContent="space-between"
            alignItems="center"
            spacing={1}
          >
            <Grid item>
              <BalanceLabelText variant="body1">USD Balance:</BalanceLabelText>
            </Grid>

            <Grid item>
              <BalanceText variant="body2">$15,540.45</BalanceText>
            </Grid>
          </Grid>
        </Grid>

        <Grid item>
          <Grid
            container
            justifyContent="space-between"
            alignItems="center"
            spacing={1}
          >
            <Grid item>
              <BalanceLabelText variant="body1">Total:</BalanceLabelText>
            </Grid>

            <Grid item>
              <BalanceText variant="body2">$15,540.45</BalanceText>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </StyledMyShare>
  );
};

const StyledMyShare = styled("div")({
  width: "100%",
  backgroundColor: CssVariables.swapInputbackground,
  border: `4px solid ${CssVariables.poolCardBorder}`,
  borderRadius: "20px",
  padding: 20,
});

const MyShareTitle = styled(Typography)({
  color: CssVariables.white,
});

const MyShareBalanceText = styled(Typography)({
  color: CssVariables.primary,
});

const BalanceLabelText = styled(Typography)({
  color: CssVariables.white,
});

const BalanceText = styled(Typography)({
  color: CssVariables.white,
});
