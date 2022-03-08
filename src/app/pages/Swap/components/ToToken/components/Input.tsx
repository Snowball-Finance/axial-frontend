import React, { FC } from "react";
import { styled, Grid, Typography, Skeleton } from "@mui/material";
import { useSelector } from "react-redux";
import { BigNumber } from "ethers";

import { CssVariables } from "styles/cssVariables/cssVariables";
import { SwapSelectors } from "app/containers/Swap/selectors";
import { BNToString } from "common/format";
import { SwapPageSelectors } from "../../../selectors";

export const Input: FC = () => {
  const selectedToToken = useSelector(SwapPageSelectors.selectedToToken);
  const bestPath = useSelector(SwapSelectors.selectBestPath);
  const isGettingBestSwapPath = useSelector(
    SwapSelectors.selectIsGettingBestPath
  );

  return (
    <Grid item xs={6}>
      <ToInputText variant="h6">
        {isGettingBestSwapPath ? (
          <ToTokenTextLoader width={100} />
        ) : (
          BNToString(
            bestPath?.amounts[bestPath?.amounts.length - 1] ??
              BigNumber.from(0),
            selectedToToken?.decimals
          )
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
  backgroundColor: CssVariables.poolCardBorder,
});
