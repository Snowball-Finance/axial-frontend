import React, { FC } from "react";
import { styled, Grid, Typography, Checkbox } from "@mui/material";

import { CssVariables } from "styles/cssVariables/cssVariables";
import { SnowInput } from "app/components/base/SnowInput";

export const AdvanceOption: FC = () => {
  return (
    <StyledAdvanceOption>
      <Grid container direction="column" spacing={2}>
        <Grid item>
          <Text variant="body2">advance options</Text>
        </Grid>

        <Grid item>
          <Grid container alignItems="center" justifyContent="flex-start">
            <Grid item>
              <Checkbox defaultChecked />
            </Grid>
            <Grid item>
              <Text variant="body2">approve permanently</Text>
            </Grid>
          </Grid>
        </Grid>

        <Grid item>
          <Grid container alignItems="center" spacing={2}>
            <Grid item>
              <Text variant="body2">max slippage:</Text>
            </Grid>
            <Grid item>
              <Grid container alignItems="center" spacing={1}>
                <Grid item>
                  <InputField value="0.5" onChange={() => {}} />
                </Grid>
                <Grid item>
                  <PercentageText variant="body1">%</PercentageText>
                </Grid>
              </Grid>
            </Grid>

            <Grid item>
              <Grid container alignItems="center" spacing={1}>
                <Grid item>
                  <InputField value="0.6" onChange={() => {}} />
                </Grid>
                <Grid item>
                  <PercentageText variant="body1">%</PercentageText>
                </Grid>
              </Grid>
            </Grid>

            <Grid item>
              <Grid container alignItems="center" spacing={1}>
                <Grid item>
                  <InputField value="" onChange={() => {}} />
                </Grid>
                <Grid item>
                  <PercentageText variant="body1">%</PercentageText>
                </Grid>
              </Grid>
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

const Text = styled(Typography)({
  color: CssVariables.bodyTextColor,
  fontSize: "16px",
});

const InputField = styled(SnowInput)({
  ".MuiInputBase-root": {
    color: CssVariables.white,
    fontSize: "16px",
    width: 60,
    height: 40,
  },

  ".MuiOutlinedInput-notchedOutline": {
    border: `2px solid ${CssVariables.primary}`,
    borderRadius: CssVariables.buttonBorderRadius,
  },
});

const PercentageText = styled(Typography)({
  color: CssVariables.primary,
  fontSize: "20px",
});