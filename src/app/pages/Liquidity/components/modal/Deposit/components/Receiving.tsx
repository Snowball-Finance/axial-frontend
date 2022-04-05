import React, { FC } from "react";
import { styled, Grid, Typography } from "@mui/material";
import { useSelector } from "react-redux";

import { CssVariables } from "styles/cssVariables/cssVariables";
import { CardWrapper } from "app/components/wrappers/Card";
import { LiquidityPageSelectors } from "app/pages/Liquidity/selectors";
import { formatBNToString } from "app/containers/utils/contractUtils";
import { Zero } from "app/containers/Rewards/constants";
import { IconWithTitle } from "../../components/IconWithTitle";

export const Receiving: FC = () => {
  const depositTransactionData = useSelector(
    LiquidityPageSelectors.depositTransactionData
  );

  return (
    <CardWrapper>
      <Grid
        container
        justifyContent="space-between"
        alignItems="center"
        spacing={{ xs: 2, xl: 0 }}
      >
        <Grid item>
          <Text variant="h6">
            <IconWithTitle tokenSymbol={depositTransactionData?.to.symbol} />
          </Text>
        </Grid>

        <Grid item xs zeroMinWidth>
          <Text variant="h6" noWrap align="right">
            {formatBNToString(depositTransactionData?.to.value ?? Zero, 18)}
          </Text>
        </Grid>
      </Grid>
    </CardWrapper>
  );
};

const Text = styled(Typography)({
  color: CssVariables.white,
});