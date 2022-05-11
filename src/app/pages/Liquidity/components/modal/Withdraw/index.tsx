import React, { FC } from "react";
import { styled, Grid, Typography } from "@mui/material";
import { useSelector } from "react-redux";
import { CssVariables } from "styles/cssVariables/cssVariables";
import { CardWrapper } from "app/components/wrappers/Card";
import { LiquidityPageSelectors } from "../../../selectors";
import { IconWithTitle } from "../components/IconWithTitle";
import { Message } from "../components/Message";
import { Rates } from "./components/Rates";
import { Total } from "./components/Total";
import { Slippage } from "../components/Slippage";
import { Deadline } from "./components/Deadline";
import { GasPrice } from "./components/GasPrice";
import { WithdrawApproveButton } from "./components/approveButton";
import { WithdrawButton } from "./components/withdrawButton";
import { mobile } from "styles/media";

export const WithdrawModal: FC = () => {
  const withdrawReviewData = useSelector(
    LiquidityPageSelectors.withdrawReviewData
  );

  return (
    <StyledContainer container direction="column" spacing={2}>
      <Grid item>
        <CardWrapper>
          <Grid container direction="column" spacing={2}>
            {withdrawReviewData?.tokens.map((item) => (
              <Grid item key={item.symbol}>
                <Grid
                  container
                  justifyContent="space-between"
                  alignItems="center"
                  spacing={{ xs: 2, xl: 0 }}
                >
                  <Grid item>
                    <IconWithTitle tokenSymbol={item.symbol} />
                  </Grid>

                  <Grid item xs zeroMinWidth>
                    <Text variant="h2" noWrap align="right">
                      {item.value}
                    </Text>
                  </Grid>
                </Grid>
              </Grid>
            ))}

            <Grid item>
              <Total />
            </Grid>
          </Grid>
        </CardWrapper>
      </Grid>

      <Grid item>
        <CardWrapper>
          <Grid container direction="column" spacing={1}>
            <Grid item>
              <GasPrice />
            </Grid>

            <Grid item>
              <Slippage />
            </Grid>

            <Grid item>
              <Deadline />
            </Grid>

            <Grid item>
              <Rates />
            </Grid>
          </Grid>
        </CardWrapper>
      </Grid>

      <Grid item>
        <Message />
      </Grid>

      <Grid item>
        <Grid container justifyContent="center" alignItems="center" spacing={2}>
          <Grid item xs={12} xl={6}>
            <WithdrawApproveButton />
          </Grid>
          <Grid item xs={12} xl={6}>
            <WithdrawButton />
          </Grid>
        </Grid>
      </Grid>
    </StyledContainer>
  );
};

const StyledContainer = styled(Grid)({
  marginTop: 20,
  width: 600,

  [mobile]: {
    width: "100%",
  },
});

const Text = styled(Typography)({
  color: CssVariables.white,
});
