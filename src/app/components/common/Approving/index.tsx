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

export const Approving: FC = () => {
  const { t } = useTranslation();
  const tokensInQueue = useSelector(globalSelectors.tokensInQueueToApprove);
  const tokensInQueueToApproving = useSelector(
    globalSelectors.tokensInQueueToApproving
  );
  const tokensInQueueLength = Object.keys(tokensInQueue).length;

  let stepsCount =
    Object.keys(tokensInQueue).filter((key) => tokensInQueue[key]).length || 0;

  const renderIcon = (tokenSymbol) => {
    if (tokensInQueueToApproving[tokenSymbol]) {
      return <CircularProgress color="primary" size={"1.5rem"}/>;
    } else if (tokensInQueue[tokenSymbol]) {
      return <CheckCircleOutlineOutlined color="primary" />;
    } else {
      return <CircleOutlined color="primary" />;
    }
  };

  return (
    <Box mt={2}>
      <CardWrapper>
        <Grid container spacing={1}>
          {Object.keys(tokensInQueue).map((tokenSymbol) => {
            return (
              <Grid key={tokenSymbol} item xs={12}>
                <Grid container spacing={2} alignItems="center">
                  <Grid item>{renderIcon(tokenSymbol)}</Grid>

                  <Grid item>
                    <Typography variant="body2">
                      {t(translations.Common.Approval())} {tokenSymbol}
                    </Typography>
                  </Grid>
                </Grid>
              </Grid>
            );
          })}

          <Grid item xs={12}>
            <Typography variant="body2" align="center">
              Steps {stepsCount + 1}/{tokensInQueueLength}
            </Typography>
          </Grid>
        </Grid>
      </CardWrapper>
    </Box>
  );
};
