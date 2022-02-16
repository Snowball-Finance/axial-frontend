/**
 *
 * TODO: It is the component which is common as per design of liquidity page card, please make it common while working on functionality
 *
 */

import React, { FC } from "react";
import { styled, Grid, Typography } from "@mui/material";

import { CssVariables } from "styles/cssVariables/cssVariables";
import { ContainedButton } from "app/components/common/buttons/containedButton";
import { OutlinedButton } from "app/components/common/buttons/outlinedButton";
import snobIcon from 'assets/images/logo.svg'

export const PoolCardItem: FC = () => {
  return (
    <StyledPoolCard>
      <Grid container direction="column" spacing={4}>
        <Grid item>
          <Grid container justifyContent="space-between" alignItems="center">
            <Grid item>
              <PoolHeaderText variant="h5">AC4D</PoolHeaderText>
            </Grid>

            <Grid item>
              <Grid
                container
                spacing={4}
                justifyContent="space-between"
                alignItems="center"
              >
                <Grid item>
                  <Grid container spacing={1}>
                    <Grid item>
                      <PoolInfoTitleText variant="body1">
                        Reward APR
                      </PoolInfoTitleText>
                    </Grid>
                    <Grid item>
                      <PoolInfoSubTitleText variant="body2">
                        2.44%
                      </PoolInfoSubTitleText>
                    </Grid>
                  </Grid>
                </Grid>
                <Grid item>
                  <Grid container spacing={1}>
                    <Grid item>
                      <PoolInfoTitleText variant="body1">Total APR</PoolInfoTitleText>
                    </Grid>
                    <Grid item>
                      <PoolInfoSubTitleText variant="body2">
                        $4.3M
                      </PoolInfoSubTitleText>
                    </Grid>
                  </Grid>
                </Grid>
                <Grid item>
                  <Grid container spacing={1}>
                    <Grid item>
                      <PoolInfoTitleText variant="body1">
                        TVL
                      </PoolInfoTitleText>
                    </Grid>
                    <Grid item>
                      <PoolInfoSubTitleText variant="body2">
                        $784,782.18
                      </PoolInfoSubTitleText>
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Grid>

        <Grid item>
          <Grid container justifyContent="space-between" alignItems="center">
            <Grid item>
              <Grid container spacing={2} alignItems="center">
                <Grid item>
                  <Grid container spacing={1} alignItems="center">
                    <Grid item>
                      <PoolTokenImage
                        src={snobIcon}
                        alt="token1"
                      />
                    </Grid>
                    <Grid item>
                      <PoolInfoTitleText>AXIAL</PoolInfoTitleText>
                    </Grid>
                  </Grid>
                </Grid>

                <Grid item>
                  <Grid container spacing={1} alignItems="center">
                    <Grid item>
                      <PoolTokenImage
                        src={snobIcon}
                        alt="token1"
                      />
                    </Grid>
                    <Grid item>
                      <PoolInfoTitleText>AXIAL</PoolInfoTitleText>
                    </Grid>
                  </Grid>
                </Grid>

                <Grid item>
                  <Grid container spacing={1} alignItems="center">
                    <Grid item>
                      <PoolTokenImage
                        src={snobIcon}
                        alt="token1"
                      />
                    </Grid>
                    <Grid item>
                      <PoolInfoTitleText>AXIAL</PoolInfoTitleText>
                    </Grid>
                  </Grid>
                </Grid>

                <Grid item>
                  <Grid container spacing={1} alignItems="center">
                    <Grid item>
                      <PoolTokenImage
                        src={snobIcon}
                        alt="token1"
                      />
                    </Grid>
                    <Grid item>
                      <PoolInfoTitleText>AXIAL</PoolInfoTitleText>
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>

            <Grid item>
              <Grid container spacing={2}>
                <Grid item>
                  <ContainedButton width={120}>Deposit</ContainedButton>
                </Grid>

                <Grid item>
                  <OutlinedButton width={120}>Withdraw</OutlinedButton>
                </Grid>

                <Grid item>
                  <OutlinedButton width={120}>Claim</OutlinedButton>
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

const PoolInfoTitleText = styled(Typography)({
  color: CssVariables.white,
  fontSize: "16px",
  fontWeight: "bold",
});

const PoolInfoSubTitleText = styled(Typography)({
  color: CssVariables.white,
  fontSize: "16px",
});

const PoolTokenImage = styled("img")({
    width: '33px'
});
