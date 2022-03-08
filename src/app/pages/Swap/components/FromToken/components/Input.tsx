import React, { FC } from "react";
import { styled, Grid } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";

import { CssVariables } from "styles/cssVariables/cssVariables";
import { SnowInput } from "app/components/base/SnowInput";
import { SwapPageSelectors } from "../../../selectors";
import { SwapPageActions } from "../../../slice";

export const Input: FC = () => {
  const selectedFromAmount = useSelector(SwapPageSelectors.selectedFromAmount);
  const dispatch = useDispatch();

  const handleInputChange = (value: string) => {
    dispatch(SwapPageActions.amountChange(value));
  };

  return (
    <Grid item xs={6}>
      <CurrencyInputField
        value={selectedFromAmount}
        onChange={handleInputChange}
        placeHolder="0.00"
      />
    </Grid>
  );
};

const CurrencyInputField = styled(SnowInput)({
  ".MuiInputBase-root": {
    color: CssVariables.white,
    fontSize: "20px",
  },

  ".MuiOutlinedInput-notchedOutline": {
    border: "none",
  },
});
