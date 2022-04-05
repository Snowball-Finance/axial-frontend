import { FC } from "react";
import { styled, Grid, Typography } from "@mui/material";
import { useSelector } from "react-redux";
import { useTranslation } from "react-i18next";

import { translations } from "locales/i18n";
import { CssVariables } from "styles/cssVariables/cssVariables";
import { globalSelectors } from "app/appSelectors";

export const Gas: FC = () => {
  const { t } = useTranslation();

  const gasPrice = useSelector(globalSelectors.gasPrice);

  return (
    <Grid container justifyContent="space-between">
      <Grid item>
        <Text variant="body2">{t(translations.SwapPage.BestPath.Gas())}</Text>
      </Grid>

      <Grid item>
        <Text variant="body2">{gasPrice?.gasStandard.toString()} GWEI</Text>
      </Grid>
    </Grid>
  );
};

const Text = styled(Typography)({
  color: CssVariables.white,
});
