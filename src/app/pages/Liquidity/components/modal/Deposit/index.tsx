import React, { FC } from "react";
import { styled, Grid, Typography } from "@mui/material";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";

import { translations } from "locales/i18n";
import { CssVariables } from "styles/cssVariables/cssVariables";
import { CardWrapper } from "app/components/wrappers/Card";
import { OutlinedButton } from "app/components/common/buttons/outlinedButton";
import { ContainedButton } from "app/components/common/buttons/containedButton";
import { RewardsSelectors } from "app/containers/Rewards/selectors";
import { LiquidityPageActions } from "../../../slice";
import { LiquidityPageSelectors } from "../../../selectors";
import { IconWithTitle } from "../components/IconWithTitle";
import { Message } from "../components/Message";
import { Slippage } from "../components/Slippage";
import { Rates } from "./components/Rates";
import { Total } from "./components/Total";
import { Receiving } from "./components/Receiving";
import { Share } from "./components/Share";

export const DepositModal: FC = () => {
  const { t } = useTranslation();

  const isDepositing = useSelector(RewardsSelectors.isDepositing);
  const depositTransactionData = useSelector(
    LiquidityPageSelectors.depositTransactionData
  );

  const dispatch = useDispatch();

  const handleCancelClick = () => {
    dispatch(LiquidityPageActions.setDepositTransactionData(undefined));
  };
  
  const handleDepositClick = () => {
    dispatch(LiquidityPageActions.deposit());
  };

  return (
    <Grid container direction="column" spacing={1}>
      <Grid item>
        <Text variant="h6">
          {t(translations.LiquidityPage.Modal.ReviewDeposit())}
        </Text>
      </Grid>

      <Grid item>
        <CardWrapper>
          <Grid container direction="column" spacing={2}>
            {depositTransactionData?.from.tokens.map((item) => (
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
        <Text variant="h6">
          {t(translations.LiquidityPage.Modal.Receiving())}
        </Text>
      </Grid>

      <Grid item>
        <Receiving />
      </Grid>

      <Grid item>
        <CardWrapper>
          <Grid container direction="column" spacing={1}>
            <Grid item>
              <Share />
            </Grid>

            <Grid item>
              <Slippage />
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
            <OutlinedButton onClick={handleCancelClick}>
              {t(translations.LiquidityPage.Buttons.Cancel())}
            </OutlinedButton>
          </Grid>
          <Grid item>
            <ContainedButton
              onClick={handleDepositClick}
              loading={isDepositing}
            >
              {t(translations.LiquidityPage.Buttons.ConfirmDeposit())}
            </ContainedButton>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
};

const Text = styled(Typography)({
  color: CssVariables.white,
});
