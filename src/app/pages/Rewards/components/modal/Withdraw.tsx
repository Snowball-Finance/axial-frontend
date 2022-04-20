import { FC } from "react";
import { Grid, Typography, Box, CircularProgress } from "@mui/material";
import { useSelector } from "react-redux";
import { useTranslation } from "react-i18next";
import { CircleOutlined } from "@mui/icons-material";

import { translations } from "locales/i18n";
import { CardWrapper } from "app/components/wrappers/Card";
import { RewardsSelectors } from "app/containers/Rewards/selectors";

export const WithdrawModal: FC = () => {
  const { t } = useTranslation();
  const isWithdrawing = useSelector(RewardsSelectors.isWithdrawing);

  const renderWithdrawIcon = () => {
    if (isWithdrawing) {
      return <CircularProgress color="primary" size={20} />;
    } else {
      return <CircleOutlined color="primary" />;
    }
  };

  return (
    <Box mt={2}>
      <CardWrapper>
        <Grid container item xs={12} spacing={2} alignItems="center">
          <Grid item>{renderWithdrawIcon()}</Grid>

          <Grid item>
            <Typography variant="body2">
              {t(translations.Common.WithdrawingTokens())}
            </Typography>
          </Grid>
        </Grid>

        <Grid container spacing={1}>
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
