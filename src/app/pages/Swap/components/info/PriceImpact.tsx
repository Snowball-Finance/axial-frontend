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
  const optimalPath = useSelector(SwapSelectors.selectBestPath);
  const bestPath = optimalPath?.bestPath;

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
    return priceImpact;
  };

  const priceImpact = getPriceImpact();

  const color = priceImpact.eq(0)
    ? CssVariables.commonTextColor
    : priceImpact.gt(0)
    ? CssVariables.green
    : CssVariables.red;

  return (
    <Grid container justifyContent="space-between">
      <Grid item>
        <Text variant="body1">
          {t(translations.SwapPage.BestPath.PriceImpact())}
        </Text>
      </Grid>
      <Grid item>
        <Typography variant="body2" color={color}>
          {isGettingBestSwapPath ? (
            <TextLoader width={50} />
          ) : (
            formatBNToPercentString(priceImpact, 18)
          )}
        </Typography>
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
