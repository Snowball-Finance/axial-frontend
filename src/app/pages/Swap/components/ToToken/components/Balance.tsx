import React, { FC } from "react";
import { styled, Grid, Typography } from "@mui/material";
import { useSelector } from "react-redux";
import { BigNumber } from "ethers";
import { useTranslation } from "react-i18next";

import { translations } from "locales/i18n";
import { CssVariables } from "styles/cssVariables/cssVariables";
import { BNToString } from "common/format";
import { globalSelectors } from "app/appSelectors";
import { SwapPageSelectors } from "../../../selectors";
import { commify } from "app/containers/utils/contractUtils";

export const Balance: FC = () => {
  const { t } = useTranslation();
  const selectedToToken = useSelector(SwapPageSelectors.selectedToToken);
  const tokens = useSelector(globalSelectors.tokens);

  const getWalletBalance = () => {
    if (tokens && selectedToToken) {
      const str = BNToString(
        tokens[selectedToToken.symbol]?.balance ?? BigNumber.from(0),
        tokens[selectedToToken.symbol]?.decimals
      );
      const commified = commify(str || "0");
      return commified;
    }

    return "0";
  };

  return (
    <Grid item>
      <Grid container justifyContent="flex-end">
        <Grid item>
          <BalanceText variant="body2">
            {t(translations.SwapPage.ToToken.WalletBalance())}{" "}
            {getWalletBalance()}
          </BalanceText>
        </Grid>
      </Grid>
    </Grid>
  );
};

const BalanceText = styled(Typography)({
  color: CssVariables.white,
});
