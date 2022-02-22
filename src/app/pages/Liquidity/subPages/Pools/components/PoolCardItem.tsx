import React, { FC } from "react";
import { styled, Grid, Typography } from "@mui/material";
import { useDispatch } from "react-redux";
import { push } from "connected-react-router";

import { CssVariables } from "styles/cssVariables/cssVariables";
import { ContainedButton } from "app/components/common/buttons/containedButton";
import { OutlinedButton } from "app/components/common/buttons/outlinedButton";
import { AppPages } from "app/types";
import { Info } from "./Info";
import { TokenImages } from "./TokenImages";

export const PoolCardItem: FC = () => {
  const dispatch = useDispatch();

  const handleNavigateToDeposit = (poolIndex: string) => {
    dispatch(push(`${AppPages.LiquidityPage}/${poolIndex}/deposit`));
  };

  const handleNavigateToWithdraw = (poolIndex: string) => {
    dispatch(push(`${AppPages.LiquidityPage}/${poolIndex}/withdraw`));
  };

  return (
    <StyledPoolCard>
      <Grid container direction="column" spacing={4}>
        <Grid item>
          <Grid container justifyContent="space-between" alignItems="center">
            <Grid item>
              <PoolHeaderText variant="h5">AS4D</PoolHeaderText>
            </Grid>

            <Grid item>
              <Info />
            </Grid>
          </Grid>
        </Grid>

        <Grid item>
          <Grid container justifyContent="space-between" alignItems="center">
            <Grid item>
              <TokenImages />
            </Grid>

            <Grid item>
              <Grid container spacing={2}>
                <Grid item>
                  <ContainedButton
                    width={120}
                    onClick={() => handleNavigateToDeposit("ac4d")}
                  >
                    Deposit
                  </ContainedButton>
                </Grid>

                <Grid item>
                  <OutlinedButton
                    width={120}
                    onClick={() => handleNavigateToWithdraw("ac4d")}
                  >
                    Withdraw
                  </OutlinedButton>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </StyledPoolCard>
  );
};

const StyledPoolCard = styled("div")({
  backgroundColor: CssVariables.poolCardBackground,
  border: `4px solid ${CssVariables.poolCardBorder}`,
  borderRadius: "20px",
  padding: "20px",
});

const PoolHeaderText = styled(Typography)({
  color: CssVariables.white,
  fontSize: "26px",
});
