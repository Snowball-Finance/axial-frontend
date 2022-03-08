import React, { FC } from "react";
import { styled, Grid, Typography, Skeleton } from "@mui/material";
import { useSelector } from "react-redux";
import { BigNumber } from "ethers";
import { useTranslation } from "react-i18next";

import { translations } from "locales/i18n";
import { CssVariables } from "styles/cssVariables/cssVariables";
import { SwapSelectors } from "app/containers/Swap/selectors";
import { BNToString } from "common/format";
import { Token } from "app/containers/Swap/types";
import { SwapPageSelectors } from "../selectors";
import { globalSelectors } from "app/appSelectors";
// import { calculatePriceImpact } from "app/containers/Swap/utils/priceImpact";

export const BestPath: FC = () => {
  const { t } = useTranslation();
  const selectedToToken = useSelector(SwapPageSelectors.selectedToToken);
  const selectedFromToken = useSelector(SwapPageSelectors.selectedFromToken);
  const selectedFromAmount = useSelector(SwapPageSelectors.selectedFromAmount);
  const tokens = useSelector(globalSelectors.tokens);
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
    return bestPathNames.join(">");
  };

  // TODO: Need to work on it
  // const getPriceImpact = () => {
  //   const tokenInputAmount = bestPath?.amounts[0] || BigNumber.from(0);
  //   const tokenOutputAmount =
  //     bestPath?.amounts[bestPath?.amounts.length - 1] || BigNumber.from(0);
  //   const priceImpact = calculatePriceImpact(
  //     tokenInputAmount,
  //     tokenOutputAmount
  //   );
  //   return BNToString(priceImpact ?? BigNumber.from(0), 18);
  // };

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
                  BNToString(
                    bestPath?.amounts[1] ?? BigNumber.from(0),
                    selectedToToken?.decimals
                  )
                )}
              </Text>
            </Grid>
          </Grid>
        </Grid>

        {/* <Grid item>
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
        </Grid> */}

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
    </StyledContainerItem>
  );
};

const StyledContainerItem = styled(Grid)({
  width: "100%",
});

const Text = styled(Typography)({
  color: CssVariables.white,
});

const TextLoader = styled(Skeleton)({
  backgroundColor: CssVariables.poolCardBorder,
});
