import React, { FC } from "react";
import { styled, Grid, Typography, Skeleton } from "@mui/material";
import { useSelector } from "react-redux";
import { useTranslation } from "react-i18next";

import { translations } from "locales/i18n";
import { CssVariables } from "styles/cssVariables/cssVariables";
import { SwapSelectors } from "app/containers/Swap/selectors";
import { Token } from "app/containers/Swap/types";
import { SwapPageSelectors } from "../selectors";
import { globalSelectors } from "app/appSelectors";
import { calculatePriceImpact } from "app/containers/Swap/utils/priceImpact";
import {
  calculateExchangeRate,
  calculatePrice,
  formatBNToPercentString,
  formatBNToString,
} from "app/containers/utils/contractUtils";
import { Zero } from "app/containers/Rewards/constants";

export const BestPath: FC = () => {
  const { t } = useTranslation();
  const selectedToToken = useSelector(SwapPageSelectors.selectedToToken);
  const selectedFromToken = useSelector(SwapPageSelectors.selectedFromToken);
  const selectedFromAmount = useSelector(SwapPageSelectors.selectedFromAmount);
  const tokens = useSelector(globalSelectors.tokens);
  const tokenPricesUSD = useSelector(globalSelectors.tokenPricesUSD);
  const isGettingBestSwapPath = useSelector(
    SwapSelectors.selectIsGettingBestPath
  );
  const bestPath = useSelector(SwapSelectors.selectBestPath);

  const getBestPathWithName = () => {
    const bestPathNames: Token[] = [];
    for (let key in tokens) {
      if (bestPath?.path.includes(tokens[key].address)) {
        bestPathNames.push(tokens[key].symbol);
      }
    }
    return bestPathNames.join(" > ");
  };

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

  if (
    !(
      selectedFromToken?.symbol &&
      selectedToToken?.symbol &&
      selectedFromAmount
    )
  ) {
    return null;
  }

  return (
    <StyledContainerItem item>
      <StyledBestPath>
        <Grid container direction="column" spacing={1}>
          <Grid item>
            <Grid container justifyContent="space-between">
              <Grid item>
                <Text variant="body2">
                  {t(translations.SwapPage.BestPath.Rate())}{" "}
                  {selectedFromToken?.symbol}/{selectedToToken?.symbol}
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
          </Grid>

          <Grid item>
            <Grid container justifyContent="space-between">
              <Grid item>
                <Text variant="body2">
                  {t(translations.SwapPage.BestPath.PriceImpact())}
                </Text>
              </Grid>
              <Grid item>
                <Text variant="body2">
                  {isGettingBestSwapPath ? (
                    <TextLoader width={50} />
                  ) : (
                    getPriceImpact()
                  )}
                </Text>
              </Grid>
            </Grid>
          </Grid>

          <Grid item>
            <Grid container justifyContent="space-between">
              <Grid item>
                <Text variant="body2">
                  {t(translations.SwapPage.BestPath.Path())}
                </Text>
              </Grid>
              <Grid item>
                <Text variant="body2">
                  {isGettingBestSwapPath ? (
                    <TextLoader width={50} />
                  ) : (
                    getBestPathWithName()
                  )}
                </Text>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </StyledBestPath>
    </StyledContainerItem>
  );
};

const StyledContainerItem = styled(Grid)({
  width: "100%",
});

const StyledBestPath = styled("div")({
  width: "100%",
  backgroundColor: CssVariables.swapInputbackground,
  border: `4px solid ${CssVariables.cardBorder}`,
  borderRadius: "20px",
  padding: 20,
});

const Text = styled(Typography)({
  color: CssVariables.white,
});

const TextLoader = styled(Skeleton)({
  backgroundColor: CssVariables.cardBorder,
});
