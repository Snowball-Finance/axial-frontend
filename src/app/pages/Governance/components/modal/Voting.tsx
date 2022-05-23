import { FC } from "react";
import { Grid, Typography, Box } from "@mui/material";
import { useSelector } from "react-redux";
import { useTranslation } from "react-i18next";
import { CircleOutlined } from "@mui/icons-material";

import { translations } from "locales/i18n";
import { CardWrapper } from "app/components/wrappers/Card";
import { GovernanceSelectors } from "app/containers/BlockChain/Governance/selectors";
import { SnowCircularProgressInModal } from "app/components/common/snowCircularProgressInModals";

export const VotingModal: FC = () => {
  const { t } = useTranslation();

  const isVotingFor = useSelector(GovernanceSelectors.isVotingFor);

  const renderVotingIcon = () => {
    if (isVotingFor) {
      return <SnowCircularProgressInModal />;
    } else {
      return <CircleOutlined color="primary" />;
    }
  };

  return (
    <Box mt={2}>
      <CardWrapper>
        <Grid container spacing={2} alignItems="center" direction="column">
          <Grid item container spacing={1} alignItems="center">
            <Grid item>{renderVotingIcon()}</Grid>
            <Grid item>
              <Typography variant="body2">
                {t(translations.GovernancePage.ApprovingVoteTransaction())}
              </Typography>
            </Grid>
          </Grid>

          <Grid item>
            <Typography variant="body1" align="center">
              Step 1/1
            </Typography>
          </Grid>
        </Grid>
      </CardWrapper>
    </Box>
  );
};
