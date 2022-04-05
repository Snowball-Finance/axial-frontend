import React, { FC } from "react";
import { styled, Grid, Typography } from "@mui/material";
import { useSelector } from "react-redux";
import { useTranslation } from "react-i18next";

import { translations } from "locales/i18n";
import { CssVariables } from "styles/cssVariables/cssVariables";
import { LiquidityPageSelectors } from "app/pages/Liquidity/selectors";
import { globalSelectors } from "app/appSelectors";
import { formatBNToString } from "app/containers/utils/contractUtils";
import { Zero } from "app/containers/Rewards/constants";

export const Rates: FC = () => {
  const { t } = useTranslation();
  const depositTransactionData = useSelector(
    LiquidityPageSelectors.depositTransactionData
  );
  const selectedPool = useSelector(LiquidityPageSelectors.selectedPool);
  const tokenPricesUSD = useSelector(globalSelectors.tokenPricesUSD);

  return (
    <Grid container justifyContent="space-between">
      <Grid item>
        <Text variant="body2">
          {t(translations.LiquidityPage.Modal.Rates())}
        </Text>
      </Grid>

      <Grid item>
        <Grid container direction="column" spacing={1} alignItems="flex-end">
          {depositTransactionData?.from.tokens.map((item) => (
            <Grid item key={item.symbol}>
              <Text variant="body2">
                1 {item.symbol} = ${tokenPricesUSD[item.symbol]}
              </Text>
            </Grid>
          ))}

          <Grid item>
            <Text variant="body2">
              1 {depositTransactionData?.to.symbol} = $
              {depositTransactionData?.to.symbol &&
                formatBNToString(
                  selectedPool?.poolData?.lpTokenPriceUSD ?? Zero,
                  18,
                  2
                )}
            </Text>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
};

const Text = styled(Typography)({
  color: CssVariables.white,
});