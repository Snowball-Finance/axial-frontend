import { FC } from "react";
import { Grid, Typography, Box, CircularProgress } from "@mui/material";
import { useSelector } from "react-redux";
import { useTranslation } from "react-i18next";
import { CircleOutlined } from "@mui/icons-material";

import { translations } from "locales/i18n";
import { CardWrapper } from "app/components/wrappers/Card";
import { StakingSelectors } from "app/containers/BlockChain/Governance/Staking/selectors";

export const VeAxialWithdrawModal: FC = () => {
  const { t } = useTranslation();
  const isWithdrawing = useSelector(
    StakingSelectors.isWithdrawingAccruingToken
  );

  const renderWithdrawIcon = () => {
    if (isWithdrawing) {
      return <CircularProgress color="primary" size={"1.5rem"} />;
    } else {
      return <CircleOutlined color="primary" />;
    }
  };

  return (
    <Box mt={2}>
      <CardWrapper>
        <Grid container spacing={1}>
          <Grid item xs={12}>
            <Grid container spacing={2} alignItems="center">
              <Grid item>{renderWithdrawIcon()}</Grid>

              <Grid item>
                <Typography variant="body2">
                  {t(translations.Common.WithdrawingTokens())}
                </Typography>
              </Grid>
            </Grid>
          </Grid>

          <Grid xs={12}>
            <Typography variant="body2" align="center">
              Steps 1/1
            </Typography>
          </Grid>
        </Grid>
      </CardWrapper>
    </Box>
  );
};
