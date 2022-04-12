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
import { RewardsSelectors } from "app/containers/Rewards/selectors";
import { RewardsPageSelectors } from "../../selectors";
import { PoolData } from "app/containers/Rewards/types";

export const DepositModal: FC = () => {
  const { t } = useTranslation();
  const selectedPool = useSelector(RewardsPageSelectors.selectedPool);
  const poolData: PoolData = useSelector(
    RewardsSelectors.poolData(selectedPool?.key)
  );
  const tokensInQueueToApproving = useSelector(
    globalSelectors.tokensInQueueToApproving
  );
  
  const isDepositing = useSelector(RewardsSelectors.isDepositing);
  const stepsCount = isDepositing ? 2 : 1;

  const renderIcon = (tokenSymbol) => {
    if (tokensInQueueToApproving[tokenSymbol]) {
      return <CircularProgress color="primary" size={20} />;
    } else {
      return <CheckCircleOutlineOutlined color="primary" />;
    }
  };

  const renderDepositIcon = () => {
    if (isDepositing) {
      return <CircularProgress color="primary" size={20} />;
    } else {
      return <CircleOutlined color="primary" />;
    }
  };

  return (
    <Box mt={2}>
      <CardWrapper>
        <Grid container item xs={12} spacing={2} alignItems="center">
          <Grid item>{renderIcon(poolData?.lpToken)}</Grid>

          <Grid item>
            <Typography variant="body2">
              {t(translations.Common.Approval())} {poolData?.lpToken}
            </Typography>
          </Grid>
        </Grid>
        <Grid container item xs={12} spacing={2} alignItems="center">
          <Grid item>{renderDepositIcon()}</Grid>

          <Grid item>
            <Typography variant="body2">
              {t(translations.Common.Depositing())}
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
            <Typography variant="body2">Steps {stepsCount}/2</Typography>
          </Grid>
        </Grid>
      </CardWrapper>
    </Box>
  );
};
