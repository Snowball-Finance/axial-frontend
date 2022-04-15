import React, { FC } from "react";
import { styled, Grid, Typography } from "@mui/material";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";

import { CssVariables } from "styles/cssVariables/cssVariables";
import { getKeyFromPoolIndex } from "app/pages/Rewards/constants";
import { RewardsPageSelectors } from "app/pages/Rewards/selectors";
import { WithdrawInput } from "./input";
import { EquivalentInUsd } from "./equivalentAmount";
import { CardWrapper } from "app/components/wrappers/Card";

type TParams = { poolIndex: string };

export const CurrencyInput: FC = () => {
  const { poolIndex } = useParams<TParams>();
  const poolKey = getKeyFromPoolIndex(poolIndex) || "";
  const pool = useSelector(RewardsPageSelectors.rewardsPool(poolKey));

  return (
    <CardWrapper>
      <Grid container direction="column" spacing={2}>
        <Grid item>
          <Grid container justifyContent="space-between" alignItems="center">
            <TokenIconContainer item xs zeroMinWidth>
              <Grid
                container
                spacing={1}
                alignItems="center"
                justifyContent="flex-start"
              >
                <Grid item>
                  <IconImage src={pool?.lpToken?.logo} alt="icon"></IconImage>
                </Grid>

                <Grid item alignSelf="center" xs zeroMinWidth>
                  <TokenText variant="h2" noWrap>
                    {pool?.lpToken?.symbol}
                  </TokenText>
                </Grid>
              </Grid>
            </TokenIconContainer>

            <Grid item xs={6}>
              <Grid container direction="column">
                <Grid item xs={12}>
                  <WithdrawInput />
                </Grid>
                <Grid item xs zeroMinWidth alignSelf="right">
                  <EquivalentInUsd />
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </CardWrapper>
  );
};

const TokenIconContainer = styled(Grid)({
  border: `2px solid ${CssVariables.cardBorder}`,
  borderRadius: "20px",
  padding: 10,
});

const IconImage = styled("img")({
  width: "32px",
  height: "32px",
});

const TokenText = styled(Typography)({
  color: CssVariables.white,
  textTransform: "uppercase",
});
