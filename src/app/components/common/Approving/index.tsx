import { FC } from "react";
import { Grid, Typography, Box } from "@mui/material";
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
  const tokensInQueueLength = Object.keys(tokensInQueue).length;

  let stepsCount =
    Object.keys(tokensInQueue).filter((key) => tokensInQueue[key]).length || 0;

  const renderIcon = (tokenSymbol) => {
    if (tokensInQueue[tokenSymbol]) {
      return <CheckCircleOutlineOutlined color="primary" />;
    } else {
      return <CircleOutlined color="primary" />;
    }
  };

  return (
    <Box mt={2}>
      <CardWrapper>
        {Object.keys(tokensInQueue).map((tokenSymbol) => {
          return (
            <Grid
              key={tokenSymbol}
              container
              item
              xs={12}
              spacing={2}
              alignItems="center"
            >
              <Grid item>{renderIcon(tokenSymbol)}</Grid>

              <Grid item>
                <Typography variant="body2">
                  {t(translations.Common.Approval())} {tokenSymbol}
                </Typography>
              </Grid>
            </Grid>
          );
        })}
        <Grid container spacing={1}>
          <Grid
            container
            item
            xs={12}
            alignItems="center"
            justifyContent="center"
          >
            <Typography variant="body2">
              Steps {stepsCount + 1}/{tokensInQueueLength}
            </Typography>
          </Grid>
        </Grid>
      </CardWrapper>
    </Box>
  );
};