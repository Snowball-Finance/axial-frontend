import React, { FC } from "react";
import { styled, Grid, Typography } from "@mui/material";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { useTranslation } from "react-i18next";

import { translations } from "locales/i18n";
import { CssVariables } from "styles/cssVariables/cssVariables";
import {
  formatBNToString,
  formatBNToPercentString,
  commify,
} from "app/containers/utils/contractUtils";
import { getKeyFromPoolIndex } from "app/pages/Liquidity/constants";
import { RewardsSelectors } from "app/containers/Rewards/selectors";
import { Zero } from "app/containers/Rewards/constants";
import { CardWrapper } from "app/components/wrappers/Card";
import { Web3Selectors } from "app/containers/BlockChain/Web3/selectors";

type TParams = { poolIndex: string };

export const MyShare: FC = () => {
  const { t } = useTranslation();
  const account = useSelector(Web3Selectors.selectAccount);
  const { poolIndex } = useParams<TParams>();
  const poolKey = getKeyFromPoolIndex(poolIndex) || "";
  const userShareData = useSelector(RewardsSelectors.userShareData(poolKey));
  if (!account) {
    return <></>;
  }
  return (
    <Grid container spacing={2}>
      <Grid item container justifyContent="space-between" alignItems="center">
        <Grid item>
          <MyShareTitle variant="h2">
            {t(translations.LiquidityPage.MyShare.Title())}
          </MyShareTitle>
        </Grid>

        <Grid item>
          <MyShareBalanceText variant="body1">
            {userShareData &&
              formatBNToPercentString(userShareData?.share || Zero, 18)}{" "}
            {t(translations.LiquidityPage.MyShare.OfPool())}
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
                    {t(translations.LiquidityPage.MyShare.USDBalance())}:
                  </BalanceLabelText>
                </Grid>

                <Grid item>
                  <BalanceText variant="body2">
                    $
                    {userShareData &&
                      commify(
                        formatBNToString(
                          userShareData?.usdBalance || Zero,
                          18,
                          2
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
                    {t(translations.LiquidityPage.MyShare.Total())}:
                  </BalanceLabelText>
                </Grid>

                <Grid item>
                  <BalanceText variant="body2">
                    $
                    {userShareData &&
                      commify(
                        formatBNToString(
                          userShareData.underlyingTokensAmount || Zero,
                          18,
                          2
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
