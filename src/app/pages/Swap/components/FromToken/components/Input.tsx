import React, { FC } from "react";
import { styled, Grid } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";

import { CssVariables } from "styles/cssVariables/cssVariables";
import { SnowInput } from "app/components/base/SnowInput";
import { SwapPageSelectors } from "../../../selectors";
import { SwapPageActions } from "../../../slice";
import { EquivalentInUSD } from "../../equivalentAmount";

export const Input: FC = () => {
  const selectedFromAmount = useSelector(SwapPageSelectors.selectedFromAmount);
  const selectedFromToken = useSelector(SwapPageSelectors.selectedFromToken);
  const dispatch = useDispatch();

  const handleInputChange = (value: string) => {
    dispatch(SwapPageActions.amountChange(value));
  };

  return (
    <Wrapper item xs={6}>
      <CurrencyInputField
        value={selectedFromAmount}
        onChange={handleInputChange}
        placeHolder="0.00"
      />
      <EquivalentInUSD
        amount={selectedFromAmount}
        symbol={selectedFromToken?.symbol}
      />
    </Wrapper>
  );
};

const Wrapper = styled(Grid)({
  display: "flex",
  flexDirection: "column",
});

const CurrencyInputField = styled(SnowInput)({
  ".MuiInputBase-root": {
    color: CssVariables.white,
    fontSize: "26px",
  },

  ".MuiOutlinedInput-input": {
    padding: 0,
  },

  ".MuiOutlinedInput-notchedOutline": {
    border: "none",
  },
});
