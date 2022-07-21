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
import { Web3Selectors } from "app/containers/BlockChain/Web3/selectors";
import { globalSelectors } from "app/appSelectors";
import { BNToFloat } from "common/format";
import { multiply } from "precise-math";

export const MyShare: FC = () => {
  const { t } = useTranslation();
  const account = useSelector(Web3Selectors.selectAccount);

  const userShareData = useSelector(
    RewardsPageSelectors.rewardsPageUserShareData
  );
  const pool = useSelector(RewardsPageSelectors.selectedPool);
  const tokenPricesUSD = useSelector(globalSelectors.tokenPricesUSD);
  const symbol = pool?.key;
  let tokenUSDValue: number = 0;
  const poolData = useSelector(
    RewardsPageSelectors.rewardsPoolData(symbol || "")
  );

  if (poolData?.lpTokenPriceUSD) {
    if (!poolData.lpTokenPriceUSD.isZero()) {
      tokenUSDValue = parseFloat(
        formatBNToString(poolData.lpTokenPriceUSD, 18, 2)
      );
    } else {
      if (symbol) {
        tokenUSDValue = tokenPricesUSD?.[symbol] || 0;
      }
    }
  }
  const userBalance = BNToFloat(
    userShareData?.poolBalance?.userInfo.amount || Zero
  );
  const equivalentUserBalance = multiply(userBalance || 0, tokenUSDValue || 0);

  if (!account) {
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
            {formatBNToPercentString(userShareData?.share || Zero, 18)}{" "}
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
                    ${commify(equivalentUserBalance.toFixed(2))}
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
                    {userShareData &&
                      commify(
                        formatBNToString(
                          userShareData?.poolBalance?.userInfo.amount || Zero,
                          18
                        ) +
                          " " +
                          pool?.key
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
                    {userShareData &&
                      commify(
                        formatBNToString(
                          userShareData?.poolBalance?.pendingTokens
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
