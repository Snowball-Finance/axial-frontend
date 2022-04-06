import React, { FC } from "react";
import { styled, Grid, Typography, Skeleton } from "@mui/material";
import { useSelector } from "react-redux";
import { useTranslation } from "react-i18next";

import { translations } from "locales/i18n";
import { CssVariables } from "styles/cssVariables/cssVariables";
import { SwapSelectors } from "app/containers/Swap/selectors";
import { Token } from "app/containers/Swap/types";
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
    const bestPathNames: Token[] = [];
    for (let key in tokens) {
      if (bestPath?.path.includes(tokens[key].address)) {
        bestPathNames.push(tokens[key].symbol);
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
