import React, { FC } from "react";
import { styled, Grid, Typography, Skeleton } from "@mui/material";
import { useSelector } from "react-redux";

import { CssVariables } from "styles/cssVariables/cssVariables";
import { SwapSelectors } from "app/containers/Swap/selectors";
import { SwapPageSelectors } from "../../../selectors";

export const Input: FC = () => {
  const selectedToAmount = useSelector(SwapPageSelectors.selectedToAmount);
  const isGettingBestSwapPath = useSelector(
    SwapSelectors.selectIsGettingBestPath
  );

  return (
    <Grid item xs={6}>
      <ToInputText variant="h6">
        {isGettingBestSwapPath ? (
          <ToTokenTextLoader width={100} />
        ) : (
          selectedToAmount
        )}
      </ToInputText>
    </Grid>
  );
};

const ToInputText = styled(Typography)({
  color: CssVariables.white,
  fontSize: "20px",
});

const ToTokenTextLoader = styled(Skeleton)({
  backgroundColor: CssVariables.cardBorder,
});
