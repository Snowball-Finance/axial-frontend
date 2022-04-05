import { FC } from "react";
import { styled, Grid, Typography } from "@mui/material";
import { useSelector } from "react-redux";

import { CssVariables } from "styles/cssVariables/cssVariables";
import { SwapPageSelectors } from "app/pages/Swap/selectors";
import { mobile } from "styles/media";
import { CardWrapper } from "app/components/wrappers/Card";

export const Tokens: FC = () => {
  const reviewSwapConfirmationData = useSelector(
    SwapPageSelectors.reviewSwapConfirmationData
  );

  return (
    <CardWrapper>
      <Grid container justifyContent="space-between" spacing={1}>
        {reviewSwapConfirmationData?.tokens.map((token) => (
          <Grid item key={token.symbol} xs={12}>
            <Grid container justifyContent="space-between" alignItems="center">
              <TokenIconContainer item>
                <Grid
                  container
                  spacing={1}
                  alignItems="center"
                  justifyContent="center"
                >
                  <Grid item>
                    <TokenIcon src={token.icon} alt={`token-${token.symbol}`} />
                  </Grid>

                  <Grid item>
                    <TokenTitle variant="body1">{token.symbol}</TokenTitle>
                  </Grid>
                </Grid>
              </TokenIconContainer>

              <Grid item xs zeroMinWidth>
                <TokenTitle variant="body1" noWrap align="right">
                  {token.value}
                </TokenTitle>

                <TokenTitle variant="body2" noWrap align="right">
                  ≈${token.valueUSD}
                </TokenTitle>
              </Grid>
            </Grid>
          </Grid>
        ))}
      </Grid>
    </CardWrapper>
  );
};

const TokenIconContainer = styled(Grid)({
  border: `2px solid ${CssVariables.cardBorder}`,
  borderRadius: CssVariables.buttonBorderRadius,
  padding: 5,
  minWidth: 150,

  [mobile]: {
    minWidth: 100,
  },
});

const TokenTitle = styled(Typography)({
  color: CssVariables.white,
});

const TokenIcon = styled("img")({
  width: "33px",

  [mobile]: {
    width: "20px",
  },
});
