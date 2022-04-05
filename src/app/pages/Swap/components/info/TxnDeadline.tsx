import { FC } from "react";
import { styled, Grid, Typography } from "@mui/material";
import { useTranslation } from "react-i18next";

import { translations } from "locales/i18n";
import { CssVariables } from "styles/cssVariables/cssVariables";
import {
  Deadlines,
  formatDeadlineToNumber,
} from "app/containers/Rewards/utils/deadline";

export const TxnDeadline: FC = () => {
  const { t } = useTranslation();

  return (
    <Grid container justifyContent="space-between">
      <Grid item>
        <Text variant="body2">
          {t(translations.SwapPage.BestPath.TxnDeadline())}
        </Text>
      </Grid>

      <Grid item>
        <Text variant="body2">
          {formatDeadlineToNumber(Deadlines.Twenty)} min
        </Text>
      </Grid>
    </Grid>
  );
};

const Text = styled(Typography)({
  color: CssVariables.white,
});
