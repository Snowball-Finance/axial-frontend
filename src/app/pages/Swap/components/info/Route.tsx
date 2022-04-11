import React, { FC } from "react";
import { styled, Grid, Typography, Skeleton } from "@mui/material";
import { useSelector } from "react-redux";
import { useTranslation } from "react-i18next";

import { translations } from "locales/i18n";
import { CssVariables } from "styles/cssVariables/cssVariables";
import { SwapSelectors } from "app/containers/Swap/selectors";
import { globalSelectors } from "app/appSelectors";

export const Route: FC = () => {
  const { t } = useTranslation();

  const tokens = useSelector(globalSelectors.tokens);
  const isGettingBestSwapPath = useSelector(
    SwapSelectors.selectIsGettingBestPath
  );
  const optimalPath = useSelector(SwapSelectors.selectBestPath);
  const bestPath = optimalPath?.bestPath;

  const getBestPathWithName = () => {
    const bestPathNames: string[] = [];
    if (bestPath?.path && tokens) {
      for (const address of bestPath.path) {
        const token = Object.values(tokens).find(
          (token) => token.address === address
        );
        if (token) {
          bestPathNames.push(token.symbol);
        }
      }
    }
    return bestPathNames.join(" > ");
  };

  return (
    <Grid container justifyContent="space-between">
      <Grid item>
        <Text variant="body1">{t(translations.SwapPage.BestPath.Path())}</Text>
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
  );
};

const Text = styled(Typography)({
  color: CssVariables.white,
});

const TextLoader = styled(Skeleton)({
  backgroundColor: CssVariables.cardBorder,
});
