import React, { FC } from "react";
import { styled, Grid, Typography } from "@mui/material";

import { CssVariables } from "styles/cssVariables/cssVariables";
import { SnowInput } from "app/components/base/SnowInput";
import { TokenImages } from "./TokenImages";

export const CurrencyInput: FC = () => {
  return (
    <StyledAdvanceOption>
      <Grid container direction="column" spacing={2}>
        <Grid item>
          <Grid container justifyContent="space-between" alignItems="center">
            <Grid item>
              <HeaderText variant="h4">AC4D (USD)</HeaderText>
            </Grid>

            <Grid item>
              <CurrencyInputField value="0.00" onChange={() => {}} />
            </Grid>
          </Grid>
        </Grid>

        <Grid item>
          <Grid container justifyContent="space-between" alignItems="center">
            <Grid item>
              <TokenImages />
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
  border: `4px solid ${CssVariables.poolCardBorder}`,
  borderRadius: "20px",
  padding: 20,
});

const HeaderText = styled(Typography)({
  color: CssVariables.bodyTextColor,
  fontSize: "26px",
});

const CurrencyInputField = styled(SnowInput)({
  ".MuiInputBase-root": {
    color: CssVariables.white,
    fontSize: "16px",
    width: 80,
  },

  ".MuiInputBase-input": {
    textAlign: "end",
    padding: 0,
  },

  ".MuiOutlinedInput-notchedOutline": {
    border: "none",
  },
});

const InputText = styled(Typography)({
  color: CssVariables.white,
});
