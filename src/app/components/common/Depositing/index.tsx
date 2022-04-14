import React, { FC } from "react";
import { Grid, Typography, Box, CircularProgress } from "@mui/material";
import { useTranslation } from "react-i18next";

import { translations } from "locales/i18n";
import { CardWrapper } from "app/components/wrappers/Card";

export const Depositing: FC = () => {
  const { t } = useTranslation();

  return (
    <Box mt={2}>
      <CardWrapper>
        <Grid container spacing={1}>
          <Grid container item xs={12} spacing={2} alignItems="center">
            <Grid item>
              <CircularProgress color="primary" size={24} />
            </Grid>

            <Grid item>
              <Typography variant="body2">
                {t(translations.Common.DepositingTokens())}
              </Typography>
            </Grid>
          </Grid>

          <Grid
            container
            item
            xs={12}
            alignItems="center"
            justifyContent="center"
          >
            <Typography variant="body2">Steps 1/1</Typography>
          </Grid>
        </Grid>
      </CardWrapper>
    </Box>
  );
};
