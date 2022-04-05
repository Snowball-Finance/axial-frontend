import { FC } from "react";
import { styled, Grid, Typography, Skeleton } from "@mui/material";
import { useSelector } from "react-redux";
import { useTranslation } from "react-i18next";

import { translations } from "locales/i18n";
import { CssVariables } from "styles/cssVariables/cssVariables";
import { SwapSelectors } from "app/containers/Swap/selectors";
import { SwapPageSelectors } from "app/pages/Swap/selectors";
import {
  calculateExchangeRate,
  formatBNToString,
} from "app/containers/utils/contractUtils";
import { Zero } from "app/containers/Rewards/constants";

export const Rate: FC = () => {
  const { t } = useTranslation();
  const selectedToToken = useSelector(SwapPageSelectors.selectedToToken);
  const selectedFromToken = useSelector(SwapPageSelectors.selectedFromToken);
  const isGettingBestSwapPath = useSelector(
    SwapSelectors.selectIsGettingBestPath
  );
  const bestPath = useSelector(SwapSelectors.selectBestPath);

  const getExachangeRate = () => {
    const tokenInputAmount = bestPath?.amounts[0] || Zero;
    const tokenOutputAmount =
      bestPath?.amounts[bestPath?.amounts.length - 1] || Zero;

    const exchangeRate = calculateExchangeRate(
      tokenInputAmount,
      selectedFromToken?.decimals || 18,
      tokenOutputAmount,
      selectedToToken?.decimals || 18
    );
    return formatBNToString(exchangeRate, 18, 6);
  };

  return (
    <Grid container justifyContent="space-between">
      <Grid item>
        <Text variant="body2">
          {t(translations.SwapPage.BestPath.Rate())} {selectedFromToken?.symbol}
          /{selectedToToken?.symbol}
        </Text>
      </Grid>
      <Grid item>
        <Text variant="body2">
          {isGettingBestSwapPath ? (
            <TextLoader width={50} />
          ) : (
            getExachangeRate()
          )}
        </Text>
      </Grid>
    </Grid>
  );
};

const Text = styled(Typography)({
  color: CssVariables.white,
});

const TextLoader = styled(Skeleton)({
  backgroundColor: CssVariables.cardBorder,
});
