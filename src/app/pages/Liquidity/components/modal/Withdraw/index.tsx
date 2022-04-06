import React, { FC } from "react";
import { styled, Grid, Typography } from "@mui/material";
import { useSelector } from "react-redux";
import { useTranslation } from "react-i18next";
import { translations } from "locales/i18n";
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

export const WithdrawModal: FC = () => {
  const { t } = useTranslation();

  const withdrawReviewData = useSelector(
    LiquidityPageSelectors.withdrawReviewData
  );

  return (
    <Grid container direction="column" spacing={1}>
      <Grid item>
        <Text variant="h6">
          {t(translations.LiquidityPage.Modal.ReviewWithdraw())}
        </Text>
      </Grid>

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
                    <Text variant="h6" noWrap align="right">
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
          <Grid item>
            <WithdrawApproveButton />
          </Grid>
          <Grid item>
            <WithdrawButton />
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
};

const Text = styled(Typography)({
  color: CssVariables.white,
});
