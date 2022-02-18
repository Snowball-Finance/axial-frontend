import React, { FC } from "react";
import { styled, Grid } from "@mui/material";

import { CssVariables } from "styles/cssVariables/cssVariables";
import { SnowSelect } from "app/components/base/SnowSelect";
import { SnowInput } from "app/components/base/SnowInput";
import axialIcon from "assets/images/logo.svg";

export const CurrencyInput: FC = () => {
  return (
    <StyledCurrencyInput>
      <Grid container justifyContent="space-between" alignItems="center">
        <Grid item>
          <CurrencyInputField value="0.00" onChange={() => {}} />
        </Grid>

        <Grid item>
          <CurrencySelect
            options={testOptions}
            selectedValue="axial"
            onChange={() => {}}
          />
        </Grid>
      </Grid>
    </StyledCurrencyInput>
  );
};

const StyledCurrencyInput = styled("div")({
  width: "100%",
  backgroundColor: CssVariables.swapInputbackground,
  border: `4px solid ${CssVariables.poolCardBorder}`,
  borderRadius: "20px",
  padding: 20,
});

const IconImage = styled("img")({
  width: "33px",
});

const CurrencyInputField = styled(SnowInput)({
  ".MuiInputBase-root": {
    color: CssVariables.white,
    fontSize: "20px",
  },

  ".MuiOutlinedInput-notchedOutline": {
    border: "none",
  },
});

const CurrencySelect = styled(SnowSelect)({
  width: 200,

  ".MuiSelect-select": {
    display: "flex",
    alignItems: "center",
    flexDirection: "row",
    columnGap: 20,
  },
});

// TODO: will be removed, used for testing ui
const testOptions = [
  {
    icon: <IconImage src={axialIcon} />,
    label: "Axial",
    value: "axial",
  },
  {
    icon: <IconImage src={axialIcon} />,
    label: "Snob",
    value: "snob",
  },
];
