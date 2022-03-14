import React, { FC } from "react";
import { styled, Grid, Typography, Slider } from "@mui/material";

import { CssVariables } from "styles/cssVariables/cssVariables";
import { ContainedButton } from "app/components/common/buttons/containedButton";
import { CurrencyInput } from "./components/CurrencyInput";

export const WithdrawInput: FC = () => {
  return (
    <StyledAddLiquidity>
      <Grid container direction="column" spacing={2}>
        <Grid item>
          <HeaderText variant="h4">Withdraw</HeaderText>
        </Grid>

        <Grid item>
          <WithdrawSlider
            defaultValue={50}
            aria-label="Default"
            valueLabelDisplay="auto"
          />
        </Grid>

        <Grid item>
          <Grid container justifyContent="space-between">
            <Grid item>
              <PercentageText variant="body2">
                withdrawl percentage (%):
              </PercentageText>
            </Grid>
            <Grid item>
              <PercentageText variant="body2">0</PercentageText>
            </Grid>
          </Grid>
        </Grid>

        <Grid item>
          <CurrencyInput />
        </Grid>

        <Grid item alignSelf="center">
          <ContainedButton width={220}>Withdraw</ContainedButton>
        </Grid>
      </Grid>
    </StyledAddLiquidity>
  );
};

const StyledAddLiquidity = styled("div")({
  width: 600,
  margin: "0 auto",
  backgroundColor: CssVariables.poolCardBackground,
  border: `4px solid ${CssVariables.cardBorder}`,
  borderRadius: "20px",
  padding: "40px",
});

const HeaderText = styled(Typography)({
  color: CssVariables.white,
  fontSize: "26px",
});

const PercentageText = styled(Typography)({
  color: CssVariables.white,
  fontSize: "16px",
});

const WithdrawSlider = styled(Slider)({
  color: CssVariables.primary,
  height: 10,

  "& .MuiSlider-track": {
    border: "none",
  },
  "& .MuiSlider-thumb": {
    height: 24,
    width: 24,
    backgroundColor: CssVariables.primary,
    border: `2px solid ${CssVariables.primary}`,
    "&:focus, &:hover, &.Mui-active, &.Mui-focusVisible": {
      boxShadow: "inherit",
    },
    "&:before": {
      display: "none",
    },
  },
  "& .MuiSlider-valueLabel": {
    lineHeight: 1.2,
    fontSize: 12,
    background: "unset",
    padding: 0,
    width: 32,
    height: 32,
    borderRadius: "50% 50% 50% 0",
    backgroundColor: CssVariables.primary,
    transformOrigin: "bottom left",
    transform: "translate(50%, -100%) rotate(-45deg) scale(0)",
    "&:before": { display: "none" },
    "&.MuiSlider-valueLabelOpen": {
      transform: "translate(50%, -100%) rotate(-45deg) scale(1)",
    },
    "& > *": {
      transform: "rotate(45deg)",
    },
  },
});
