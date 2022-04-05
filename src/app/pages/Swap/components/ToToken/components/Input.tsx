import React, { FC } from "react";
import { styled, Grid, Typography, Skeleton } from "@mui/material";
import { useSelector } from "react-redux";

import { CssVariables } from "styles/cssVariables/cssVariables";
import { SwapSelectors } from "app/containers/Swap/selectors";
import { SwapPageSelectors } from "../../../selectors";
import { EquivalentInUSD } from "../../equivalentAmount";

export const Input: FC = () => {
  const selectedToAmount = useSelector(SwapPageSelectors.selectedToAmount);
  const selectedToToken = useSelector(SwapPageSelectors.selectedToToken);
  const isGettingBestSwapPath = useSelector(
    SwapSelectors.selectIsGettingBestPath
  );

  return (
    <Wrapper item xs={6}>
      <ToInputText variant="h6">
        {isGettingBestSwapPath ? (
          <ToTokenTextLoader width={100} />
        ) : (
          selectedToAmount
        )}
      </ToInputText>
      {isGettingBestSwapPath ? (
        <ToTokenTextLoader width={100} height={24} />
      ) : (
        <EquivalentInUSD
          amount={selectedToAmount}
          symbol={selectedToToken?.symbol}
        />
      )}
    </Wrapper>
  );
};

const Wrapper = styled(Grid)({
  display: "flex",
  flexDirection: "column",
});

const ToInputText = styled(Typography)({
  color: CssVariables.white,
  fontSize: "20px",
});

const ToTokenTextLoader = styled(Skeleton)({
  backgroundColor: CssVariables.cardBorder,
});
