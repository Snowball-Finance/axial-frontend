import React, { FC } from "react";
import { styled, Grid, Typography } from "@mui/material";

import { CssVariables } from "styles/cssVariables/cssVariables";
import { SnowInput } from "app/components/base/SnowInput";
import axialIcon from "assets/images/logo.svg";

export const CurrencyInput: FC = () => {
  return (
    <StyledCurrencyInput
      container
      justifyContent="space-between"
      alignItems="center"
    >
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
        <Grid container spacing={1} alignItems="center">
          <Grid item>
            <CurrencyInputField value="0.00" onChange={() => {}} />
          </Grid>

          <Grid item>
            <InputText variant="body2">=$0.0</InputText>
          </Grid>
        </Grid>
      </Grid>
    </StyledCurrencyInput>
  );
};

const StyledCurrencyInput = styled(Grid)({
  width: "100%",
  backgroundColor: CssVariables.swapInputbackground,
  border: `4px solid ${CssVariables.poolCardBorder}`,
  borderRadius: "20px",
  padding: "5px 20px",
});

const IconImage = styled("img")({
  width: "33px",
});

const TokenText = styled(Typography)({
  color: CssVariables.white,
});

const InputText = styled(Typography)({
  color: CssVariables.white,
});

const CurrencyInputField = styled(SnowInput)({
  ".MuiInputBase-root": {
    color: CssVariables.white,
    fontSize: "16px",
    width: 80,
  },

  ".MuiOutlinedInput-notchedOutline": {
    border: "none",
  },
});
