import React, { FC } from "react";
import { Grid, IconButton } from "@mui/material";
import { useDispatch } from "react-redux";

import { CssVariables } from "styles/cssVariables/cssVariables";
import ReverseSwapArrow from "assets/images/iconComponents/reverseSwapArrow";
import { SwapPageActions } from "../slice";

export const ReverseSwap: FC = () => {
  const dispatch = useDispatch();

  const handleReverseTokenChange = () => {
    dispatch(SwapPageActions.reverseTokenChange());
  };

  return (
    <Grid item>
      <IconButton aria-label="reverse swap" onClick={handleReverseTokenChange}>
        <ReverseSwapArrow color={CssVariables.white} />
      </IconButton>
    </Grid>
  );
};
