import { FC } from "react";
import { styled, Grid } from "@mui/material";
import { useSelector } from "react-redux";

import { SwapPageSelectors } from "app/pages/Swap/selectors";
import { mobile } from "styles/media";
import { Actions } from "./components/Actions";
import { TokenInfo } from "./components/TokenInfo";
import { Message } from "./components/Message";
import { Tokens } from "./components/Tokens";
import { HighPriceImpact } from "./components/HighPriceImpact";

export const ReviewModal: FC = () => {
  const reviewSwapConfirmationData = useSelector(
    SwapPageSelectors.reviewSwapConfirmationData
  );

  return (
    <ReviewContainer container spacing={2}>
      <Grid item xs={12}>
        <Tokens />
      </Grid>

      <Grid item xs={12}>
        <TokenInfo />
      </Grid>

      <Grid item xs={12}>
        <Message />
      </Grid>

      {reviewSwapConfirmationData?.isHighPriceImpactTxn && (
        <Grid item xs={12}>
          <HighPriceImpact />
        </Grid>
      )}

      <Grid item xs={12}>
        <Actions />
      </Grid>
    </ReviewContainer>
  );
};

const ReviewContainer = styled(Grid)({
  maxWidth: 600,
  minHeight: 500,
  marginTop: 10,

  [mobile]: {
    maxWidth: "80vw",
  },
});
