import React, { FC } from "react";
import { styled, Grid, Typography } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { BigNumber } from "ethers";
import { useTranslation } from "react-i18next";

import { translations } from "locales/i18n";
import { CssVariables } from "styles/cssVariables/cssVariables";
import { CardWrapper } from "app/components/wrappers/Card";
import { OutlinedButton } from "app/components/common/buttons/outlinedButton";
import { ContainedButton } from "app/components/common/buttons/containedButton";
import { RewardsSelectors } from "app/containers/Rewards/selectors";
import { globalSelectors } from "app/appSelectors";
import {
  ApproveAndWithdrawPayload,
  WithdrawType,
} from "app/containers/Rewards/types";
import { LiquidityPageActions } from "../../../slice";
import { LiquidityPageSelectors } from "../../../selectors";
import { IconWithTitle } from "../components/IconWithTitle";
import { Message } from "../components/Message";
import { Rates } from "./components/Rates";
import { Total } from "./components/Total";
import { floatToBN } from "common/format";
import { Slippage } from "../components/Slippage";
import { Deadline } from "./components/Deadline";
import { GasPrice } from "./components/GasPrice";

export const WithdrawModal: FC = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const isWithdrawing = useSelector(RewardsSelectors.isWithdrawing);
  const selectedPool = useSelector(LiquidityPageSelectors.selectedPool);
  const withdrawReviewData = useSelector(
    LiquidityPageSelectors.withdrawReviewData
  );
  const tokens = useSelector(globalSelectors.tokens);
  const withdrawTokens = useSelector(
    LiquidityPageSelectors.withdrawTokenToShow()
  );

  const handleCancelClick = () => {
    dispatch(LiquidityPageActions.setWithdrawReviewData(undefined));
  };

  const handleWithdrawClick = () => {
    if (selectedPool && tokens) {
      const tmpAmounts = {};
      for (let k in withdrawTokens) {
        const v = withdrawTokens[k];
        const num = Number(v);
        const toSend = floatToBN(num, tokens[k].decimals);
        tmpAmounts[k] = toSend;
      }
      //TODO: fix this data
      const dataToSend: ApproveAndWithdrawPayload = {
        poolKey: selectedPool.key,
        type: WithdrawType.IMBALANCE,
        lpTokenAmountToSpend: BigNumber.from(0),
        tokenAmounts: tmpAmounts,
      };
      dispatch(LiquidityPageActions.withdraw(dataToSend));
    }
  };

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
            <OutlinedButton onClick={handleCancelClick}>
              {t(translations.LiquidityPage.Buttons.Cancel())}
            </OutlinedButton>
          </Grid>
          <Grid item>
            <ContainedButton
              loading={isWithdrawing}
              onClick={handleWithdrawClick}
            >
              {t(translations.LiquidityPage.Buttons.ConfirmWithdraw())}
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
