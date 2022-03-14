/**
 *
 * TODO: It is the component which is common as per design of liquidity page card, please make it common while working on functionality
 *
 */

import React, { FC } from "react";
import { styled, Grid, Typography } from "@mui/material";
import { useSelector } from "react-redux";

import { CssVariables } from "styles/cssVariables/cssVariables";
import { TokenImages } from "app/pages/Rewards/components/TokenImages";
import { PoolCardItemProps } from "app/pages/Rewards/types";
import { RewardsPageSelectors } from "app/pages/Rewards/selectors";
import { Info } from "./Info";
import { ActionButtons } from "./ActionButtons";

export const PoolCardItem: FC<PoolCardItemProps> = ({ poolKey }) => {
  const rewardsPool = useSelector(RewardsPageSelectors.rewardsPool(poolKey));

  return (
    <StyledPoolCard>
      <Grid container direction="column" spacing={4}>
        <Grid item>
          <Grid container justifyContent="space-between" alignItems="center">
            <Grid item>
              <PoolHeaderText variant="h5">{rewardsPool.name}</PoolHeaderText>
            </Grid>

            <Grid item>
              <Info poolKey={poolKey} />
            </Grid>
          </Grid>
        </Grid>

        <Grid item>
          <Grid container justifyContent="space-between" alignItems="center">
            <Grid item>
              <TokenImages poolKey={poolKey} />
            </Grid>

            <Grid item>
              <ActionButtons poolKey={poolKey} />
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </StyledPoolCard>
  );
};

const StyledPoolCard = styled("div")({
  backgroundColor: CssVariables.poolCardBackground,
  border: `4px solid ${CssVariables.cardBorder}`,
  borderRadius: "20px",
  padding: "20px",
});

const PoolHeaderText = styled(Typography)({
  color: CssVariables.white,
  fontSize: "26px",
});
