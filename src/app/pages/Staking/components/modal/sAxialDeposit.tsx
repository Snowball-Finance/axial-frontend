import { FC } from "react";
import { Grid, Typography, Box, CircularProgress } from "@mui/material";
import { useSelector } from "react-redux";
import { useTranslation } from "react-i18next";
import {
  CircleOutlined,
  CheckCircleOutlineOutlined,
} from "@mui/icons-material";

import { translations } from "locales/i18n";
import { CardWrapper } from "app/components/wrappers/Card";
import { globalSelectors } from "app/appSelectors";
import { StakingSelectors } from "app/containers/BlockChain/Governance/Staking/selectors";
import { env } from "environment";

export const SAxialDepositModal: FC = () => {
  const { t } = useTranslation();

  const tokensInQueueToApproving = useSelector(
    globalSelectors.tokensInQueueToApproving
  );
  const isStaking = useSelector(StakingSelectors.selectIsStaking);

  const stepsCount = isStaking ? 2 : 1;

  const renderIcon = (tokenSymbol) => {
    if (tokensInQueueToApproving[tokenSymbol]) {
      return <CircularProgress color="primary" size={"1.5rem"} />;
    } else {
      return <CheckCircleOutlineOutlined color="primary" />;
    }
  };

  const renderDepositIcon = () => {
    if (isStaking) {
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
              <Grid item>{renderIcon(env.MAIN_TOKEN_NAME)}</Grid>

              <Grid item>
                <Typography variant="body2">
                  {t(translations.Common.Approval())} AXIAL
                </Typography>
              </Grid>
            </Grid>
          </Grid>

          <Grid item xs={12}>
            <Grid container spacing={2} alignItems="center">
              <Grid item>{renderDepositIcon()}</Grid>

              <Grid item>
                <Typography variant="body2">
                  {t(translations.Common.DepositingTokens())}
                </Typography>
              </Grid>
            </Grid>
          </Grid>

          <Grid item xs={12}>
            <Typography variant="body2" align="center">
              Steps {stepsCount}/2
            </Typography>
          </Grid>
        </Grid>
      </CardWrapper>
    </Box>
  );
};
