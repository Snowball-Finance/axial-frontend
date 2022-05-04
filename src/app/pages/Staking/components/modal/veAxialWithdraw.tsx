import { FC } from "react";
import { Grid, Typography, Box, CircularProgress, styled } from "@mui/material";
import { useSelector } from "react-redux";
import { useTranslation } from "react-i18next";
import { CircleOutlined } from "@mui/icons-material";

import { translations } from "locales/i18n";
import { CardWrapper } from "app/components/wrappers/Card";
import { StakingSelectors } from "app/containers/BlockChain/Governance/Staking/selectors";
import { mobile } from "styles/media";

export const VeAxialWithdrawModal: FC = () => {
  const { t } = useTranslation();
  const isWithdrawing = useSelector(
    StakingSelectors.isWithdrawingAccruingToken
  );

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
        <StyledContainer container spacing={1}>
          <Grid container item spacing={2} alignItems="center">
            <Grid item>{renderWithdrawIcon()}</Grid>

            <Grid item>
              <Typography variant="body2">
                {t(translations.Common.WithdrawingTokens())}
              </Typography>
            </Grid>
          </Grid>

          <Grid container>
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
        </StyledContainer>
      </CardWrapper>
    </Box>
  );
};

const StyledContainer = styled(Grid)({
  flexDirection: "column",

  [mobile]: {
    width: "100%",
  },
});
