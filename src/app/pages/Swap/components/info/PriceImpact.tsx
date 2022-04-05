import { FC } from "react";
import { styled, Grid, Typography, Skeleton } from "@mui/material";
import { useSelector } from "react-redux";
import { useTranslation } from "react-i18next";

import { translations } from "locales/i18n";
import { CssVariables } from "styles/cssVariables/cssVariables";
import { SwapSelectors } from "app/containers/Swap/selectors";
import { SwapPageSelectors } from "app/pages/Swap/selectors";
import { globalSelectors } from "app/appSelectors";
import { calculatePriceImpact } from "app/containers/Swap/utils/priceImpact";
import {
  calculatePrice,
  formatBNToPercentString,
} from "app/containers/utils/contractUtils";
import { Zero } from "app/containers/Rewards/constants";

export const PriceImpact: FC = () => {
  const { t } = useTranslation();
  const selectedToToken = useSelector(SwapPageSelectors.selectedToToken);
  const selectedFromToken = useSelector(SwapPageSelectors.selectedFromToken);
  const tokenPricesUSD = useSelector(globalSelectors.tokenPricesUSD);
  const isGettingBestSwapPath = useSelector(
    SwapSelectors.selectIsGettingBestPath
  );
  const bestPath = useSelector(SwapSelectors.selectBestPath);

  const getPriceImpact = () => {
    const tokenInputAmount = bestPath?.amounts[0] || Zero;
    const tokenOutputAmount =
      bestPath?.amounts[bestPath?.amounts.length - 1] || Zero;

    const toValueUSD = selectedToToken?.symbol
      ? calculatePrice(
          tokenOutputAmount,
          tokenPricesUSD?.[selectedToToken.symbol],
          selectedToToken.decimals
        )
      : Zero;

    const fromValueUSD = selectedFromToken?.symbol
      ? calculatePrice(
          tokenInputAmount,
          tokenPricesUSD?.[selectedFromToken.symbol],
          selectedFromToken.decimals
        )
      : Zero;

    const priceImpact = calculatePriceImpact(fromValueUSD, toValueUSD);
    return formatBNToPercentString(priceImpact, 18);
  };

  return (
    <Grid container justifyContent="space-between">
      <Grid item>
        <Text variant="body2">
          {t(translations.SwapPage.BestPath.PriceImpact())}
        </Text>
      </Grid>
      <Grid item>
        <Text variant="body2">
          {isGettingBestSwapPath ? <TextLoader width={50} /> : getPriceImpact()}
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
