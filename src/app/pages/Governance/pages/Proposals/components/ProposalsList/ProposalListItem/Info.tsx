import { FC } from "react";
import { Grid, styled, Typography } from "@mui/material";
import { useTranslation } from "react-i18next";

import { translations } from "locales/i18n";
import { CssVariables } from "styles/cssVariables/cssVariables";

export const Info: FC = () => {
  const { t } = useTranslation();

  return (
    <Grid container>
      <Grid item container justifyContent="space-between" alignItems="center">
        <Grid item>
          <Text variant="body1">{t(translations.GovernancePage.Status())}</Text>
        </Grid>

        <Grid item>
          <Text variant="body2">Active</Text>
        </Grid>
      </Grid>

      <Grid item container justifyContent="space-between" alignItems="center">
        <Grid item>
          <Text variant="body1">
            {t(translations.GovernancePage.Proposedby())}
          </Text>
        </Grid>

        <Grid item>
          <Text variant="body2">0x8f24..b56A</Text>
        </Grid>
      </Grid>

      <Grid item container justifyContent="space-between" alignItems="center">
        <Grid item>
          <Text variant="body1">{t(translations.GovernancePage.Date())}</Text>
        </Grid>

        <Grid item>
          <Text variant="body2">Feb 23, 2022</Text>
        </Grid>
      </Grid>
    </Grid>
  );
};

const Text = styled(Typography)({
  color: CssVariables.white,
});
