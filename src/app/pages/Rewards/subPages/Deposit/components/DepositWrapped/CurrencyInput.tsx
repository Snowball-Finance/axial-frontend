import React, { FC } from "react";
import { styled, Grid, Typography } from "@mui/material";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";

import { CssVariables } from "styles/cssVariables/cssVariables";
import { getKeyFromPoolIndex } from "app/pages/Rewards/constants";
import { RewardsPageSelectors } from "app/pages/Rewards/selectors";
import { TokenImages } from "app/pages/Rewards/components/TokenImages";
import { RewardsDepositInput } from "./input";

type TParams = { poolIndex: string };

export const CurrencyInput: FC = () => {
  const { poolIndex } = useParams<TParams>();
  const poolKey = getKeyFromPoolIndex(poolIndex) || "";
  const rewardsPool = useSelector(RewardsPageSelectors.rewardsPool(poolKey));

  return (
    <StyledAdvanceOption>
      <Grid container direction="column" spacing={2}>
        <Grid item>
          <Grid container justifyContent="space-between" alignItems="center">
            <Grid item>
              <HeaderText variant="h4">{rewardsPool?.name}</HeaderText>
            </Grid>

            <Grid item>
              <RewardsDepositInput />
            </Grid>
          </Grid>
        </Grid>

        <Grid item>
          <Grid container justifyContent="space-between" alignItems="center">
            <Grid item>
              <TokenImages poolKey={poolKey} />
            </Grid>

            <Grid item>
              <InputText variant="body2">=$0.0</InputText>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </StyledAdvanceOption>
  );
};

const StyledAdvanceOption = styled("div")({
  width: "100%",
  backgroundColor: CssVariables.swapInputbackground,
  border: `4px solid ${CssVariables.cardBorder}`,
  borderRadius: "20px",
  padding: 20,
});

const HeaderText = styled(Typography)({
  color: CssVariables.bodyTextColor,
  fontSize: "26px",
});

const InputText = styled(Typography)({
  color: CssVariables.white,
});
