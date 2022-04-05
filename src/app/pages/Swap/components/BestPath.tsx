import React, { FC } from "react";
import { styled, Grid } from "@mui/material";
import { useSelector } from "react-redux";

import { SwapPageSelectors } from "../selectors";
import { CardWrapper } from "app/components/wrappers/Card";
import { Rate } from "./info/Rate";
import { PriceImpact } from "./info/PriceImpact";
import { Route } from "./info/Route";

export const BestPathIndicator: FC = () => {
  const selectedToToken = useSelector(SwapPageSelectors.selectedToToken);
  const selectedFromToken = useSelector(SwapPageSelectors.selectedFromToken);
  const selectedFromAmount = useSelector(SwapPageSelectors.selectedFromAmount);

  if (
    !(
      selectedFromToken?.symbol &&
      selectedToToken?.symbol &&
      selectedFromAmount
    )
  ) {
    return null;
  }

  return (
    <StyledContainerItem item xs={12}>
      <CardWrapper>
        <Grid container direction="column" spacing={1}>
          <Grid item>
            <Rate />
          </Grid>

          <Grid item>
            <PriceImpact />
          </Grid>

          <Grid item>
            <Route />
          </Grid>
        </Grid>
      </CardWrapper>
    </StyledContainerItem>
  );
};

const StyledContainerItem = styled(Grid)({
  width: "100%",
});
