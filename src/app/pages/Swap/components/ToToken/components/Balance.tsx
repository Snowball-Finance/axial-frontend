import React, { FC } from "react";
import { styled, Grid, Typography } from "@mui/material";
import { useSelector } from "react-redux";
import { BigNumber } from "ethers";
import { useTranslation } from "react-i18next";

import { translations } from "locales/i18n";
import { CssVariables } from "styles/cssVariables/cssVariables";
import { BNToString } from "common/format";
import { SwapPageSelectors } from "../../../selectors";

export const Balance: FC = () => {
  const { t } = useTranslation();
  const selectedToToken = useSelector(SwapPageSelectors.selectedToToken);

  return (
    <Grid item>
      <Grid container justifyContent="flex-end">
        <Grid item>
          <BalanceText>
            {t(translations.SwapPage.ToToken.WalletBalance())}{" "}
            {BNToString(
              selectedToToken?.balance ?? BigNumber.from(0),
              selectedToToken?.decimals
            )}
          </BalanceText>
        </Grid>
      </Grid>
    </Grid>
  );
};

const BalanceText = styled(Typography)({
  color: CssVariables.white,
});
