import React, { FC } from "react";
import { styled, Grid, Typography } from "@mui/material";
import {
  CircleOutlined,
  CheckCircleOutlineOutlined,
} from "@mui/icons-material";
import { useSelector } from "react-redux";
import { useTranslation } from "react-i18next";

import { translations } from "locales/i18n";
import { RewardsPageSelectors } from "app/pages/Rewards/selectors";
import { globalSelectors } from "app/appSelectors";
import { RewardsSelectors } from "app/containers/Rewards/selectors";

export const Steps: FC = () => {
  const { t } = useTranslation();
  const pool = useSelector(RewardsPageSelectors.selectedPool);
  const loading = useSelector(RewardsSelectors.isWithdrawing);
  const tokensInQueue = useSelector(globalSelectors.tokensInQueueToApprove);

  return (
    <Grid container direction="column" spacing={2}>
      {Object.keys(tokensInQueue).map((tokenSymbol) => {
        return (
          <Grid key={tokenSymbol} container item xs={12} spacing={2}>
            <Grid item>
              {tokensInQueue[tokenSymbol] ? (
                <CheckCircleOutlineOutlined color="primary" />
              ) : (
                <CircleOutlined color="primary" />
              )}
            </Grid>
            <Grid item>
              <Text variant="body1">{`${t(
                translations.RewardsPage.Modal.Approval()
              )} ${pool?.lpToken.symbol}`}</Text>
            </Grid>
          </Grid>
        );
      })}

      <Grid container item xs={12} spacing={2}>
        <Grid item>
          {loading ? (
            <CircleOutlined color="primary" />
          ) : (
            <CheckCircleOutlineOutlined color="primary" />
          )}
        </Grid>
        <Grid item>
          <Text variant="body1">
            {t(translations.RewardsPage.Modal.Withdraw())}
          </Text>
        </Grid>
      </Grid>

      <Grid item alignSelf="center">
        <Text variant="body2">
          {t(translations.RewardsPage.Modal.Steps())} 1/2
        </Text>
      </Grid>
    </Grid>
  );
};

const Text = styled(Typography)({});
