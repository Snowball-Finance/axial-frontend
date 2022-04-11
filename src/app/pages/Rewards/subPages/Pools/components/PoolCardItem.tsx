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
import { mobile } from "styles/media";
import { RewardsTokens } from "./RewardsTokens";

export const PoolCardItem: FC<PoolCardItemProps> = ({ poolKey }) => {
  const rewardsPool = useSelector(RewardsPageSelectors.rewardsPool(poolKey));

  return (
    <StyledPoolCard>
      <StyledPoolContainer container>
        <Grid item>
          <StyledPoolChildUpperContainer container>
            <Grid item>
              <Grid container spacing={2} direction="column">
                <Grid item>
                  <PoolHeaderText variant="h2">
                    {rewardsPool.name}
                  </PoolHeaderText>
                </Grid>

                <Grid item>
                  <TokenImages poolKey={poolKey} />
                </Grid>
              </Grid>
            </Grid>

            <Grid item>
              <Info poolKey={poolKey} />
            </Grid>
          </StyledPoolChildUpperContainer>
        </Grid>

        <Grid item>
          <StyledPoolChildLowerContainer container>
            <Grid item>
              <RewardsTokens />
            </Grid>

            <Grid item>
              <ActionButtons poolKey={poolKey} />
            </Grid>
          </StyledPoolChildLowerContainer>
        </Grid>
      </StyledPoolContainer>
    </StyledPoolCard>
  );
};

const StyledPoolCard = styled("div")({
  backgroundColor: CssVariables.poolCardBackground,
  border: `4px solid ${CssVariables.cardBorder}`,
  borderRadius: "20px",
  padding: "20px",
});

const StyledPoolContainer = styled(Grid)({
  flexDirection: "column",
  rowGap: 40,

  [mobile]: {
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
    columnGap: 20,
  },
});

const StyledPoolChildUpperContainer = styled(Grid)({
  justifyContent: "space-between",
  alignItems: "flex-start",

  [mobile]: {
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "column",
    rowGap: 20,
  },
});

const StyledPoolChildLowerContainer = styled(Grid)({
  justifyContent: "space-between",
  alignItems: "flex-end",

  [mobile]: {
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "column",
    rowGap: 20,
  },
});

const PoolHeaderText = styled(Typography)({
  color: CssVariables.white,
  textTransform: "uppercase",
});
