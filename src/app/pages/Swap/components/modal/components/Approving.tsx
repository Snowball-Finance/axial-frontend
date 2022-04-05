import React, { FC } from "react";
import { Grid, Typography } from "@mui/material";
import { useSelector } from "react-redux";
import { useTranslation } from "react-i18next";

import { translations } from "locales/i18n";
import { CardWrapper } from "app/components/wrappers/Card";
import ApprovalLoaderIcon from "assets/images/iconComponents/approvalLoader";
import { SwapPageSelectors } from "app/pages/Swap/selectors";

export const Approving: FC = () => {
  const { t } = useTranslation();
  const selectedFromToken = useSelector(SwapPageSelectors.selectedFromToken);

  return (
    <CardWrapper>
      <Grid container spacing={1}>
        <Grid container item xs={12} spacing={2} alignItems="center">
          <Grid item>
            <ApprovalLoaderIcon />
          </Grid>

          <Grid item>
            <Typography variant="body2">
              {t(translations.SwapPage.Approval())} {selectedFromToken?.symbol}
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
  );
};
