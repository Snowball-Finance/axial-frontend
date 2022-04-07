import React, { FC } from "react";
import { styled, Grid, Typography } from "@mui/material";
import { useSelector } from "react-redux";
import { useTranslation } from "react-i18next";

import { translations } from "locales/i18n";
import { CssVariables } from "styles/cssVariables/cssVariables";
import { LiquidityPageSelectors } from "app/pages/Liquidity/selectors";
import { formatBNToPercentString } from "app/containers/utils/contractUtils";
import { Zero } from "app/containers/Rewards/constants";

export const Share: FC = () => {
  const { t } = useTranslation();
  const depositTransactionData = useSelector(
    LiquidityPageSelectors.depositTransactionData
  );

  return (
    <Grid container justifyContent="space-between">
      <Grid item>
        <Text variant="body1">
          {t(translations.LiquidityPage.Modal.ShareOfPoll())}
        </Text>
      </Grid>

      <Grid item>
        <Text variant="body2">
          {formatBNToPercentString(depositTransactionData?.share ?? Zero, 18)}
        </Text>
      </Grid>
    </Grid>
  );
};

const Text = styled(Typography)({
  color: CssVariables.white,
});
