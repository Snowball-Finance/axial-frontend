import React, { FC } from "react";
import { styled, Grid, Typography } from "@mui/material";
import { useSelector } from "react-redux";
import { useTranslation } from "react-i18next";
import { translations } from "locales/i18n";
import { CssVariables } from "styles/cssVariables/cssVariables";
import {
  formatBNToString,
  formatBNToPercentString,
  commify,
} from "app/containers/utils/contractUtils";
import { RewardsPageSelectors } from "app/pages/Rewards/selectors";
import { Zero } from "app/containers/Rewards/constants";
import { CardWrapper } from "app/components/wrappers/Card";

export const MyShare: FC = () => {
  const { t } = useTranslation();
  const userShareData = useSelector(
    RewardsPageSelectors.userShareDataUsingMasterchef
  );
  if (!userShareData) {
    return <></>;
  }

  return (
    <Grid container spacing={2}>
      <Grid item container justifyContent="space-between" alignItems="center">
        <Grid item>
          <MyShareTitle variant="h2">
            {t(translations.RewardsPage.MyShare.Title())}
          </MyShareTitle>
        </Grid>

        <Grid item>
          <MyShareBalanceText variant="body1">
            {formatBNToPercentString(userShareData.share, 18)}{" "}
            {t(translations.RewardsPage.MyShare.OfPool())}
          </MyShareBalanceText>
        </Grid>
      </Grid>

      <Grid item xs={12}>
        <CardWrapper>
          <Grid container direction="column" spacing={2}>
            <Grid item>
              <Grid
                container
                justifyContent="space-between"
                alignItems="center"
                spacing={1}
              >
                <Grid item>
                  <BalanceLabelText variant="body1">
                    {t(translations.RewardsPage.MyShare.USDBalance())}:
                  </BalanceLabelText>
                </Grid>

                <Grid item>
                  <BalanceText variant="body2">
                    $
                    {commify(formatBNToString(userShareData.usdBalance, 18, 2))}
                  </BalanceText>
                </Grid>
              </Grid>
            </Grid>

            <Grid item>
              <Grid
                container
                justifyContent="space-between"
                alignItems="center"
                spacing={1}
              >
                <Grid item>
                  <BalanceLabelText variant="body1">
                    {t(translations.RewardsPage.MyShare.Total())}:
                  </BalanceLabelText>
                </Grid>

                <Grid item>
                  <BalanceText variant="body2">
                    $
                    {userShareData &&
                      commify(
                        formatBNToString(
                          userShareData.masterchefBalance?.userInfo.amount ||
                            Zero,
                          18
                        )
                      )}
                  </BalanceText>
                </Grid>
              </Grid>
            </Grid>

            <Grid item>
              <Grid
                container
                justifyContent="space-between"
                alignItems="center"
                spacing={1}
              >
                <Grid item>
                  <BalanceLabelText variant="body1">
                    {t(translations.RewardsPage.MyShare.AxialRewards())}:
                  </BalanceLabelText>
                </Grid>

                <Grid item>
                  <BalanceText variant="body2">
                    $
                    {userShareData &&
                      commify(
                        formatBNToString(
                          userShareData.masterchefBalance?.pendingTokens
                            ?.pendingAxial || Zero,
                          18
                        )
                      )}
                  </BalanceText>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </CardWrapper>
      </Grid>
    </Grid>
  );
};

const MyShareTitle = styled(Typography)({
  color: CssVariables.white,
  textTransform: "uppercase",
});

const MyShareBalanceText = styled(Typography)({
  color: CssVariables.green,
});

const BalanceLabelText = styled(Typography)({
  color: CssVariables.white,
});

const BalanceText = styled(Typography)({
  color: CssVariables.white,
});
