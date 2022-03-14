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
  formatBNToShortString,
} from "app/containers/utils/contractUtils";
import { LiquidityPageSelectors } from "app/pages/Liquidity/selectors";
import { getKeyFromPoolIndex } from "app/pages/Liquidity/constants";
import { RewardsSelectors } from "app/containers/Rewards/selectors";
import { pools } from "app/pools";
import { Zero } from "app/containers/Rewards/constants";

type TParams = { poolIndex: string };

export const MyShare: FC = () => {
  const { t } = useTranslation();
  const { poolIndex } = useParams<TParams>();
  const poolKey = getKeyFromPoolIndex(poolIndex) || "";
  const userShareData = useSelector(
    LiquidityPageSelectors.liquidityUserShareData(poolKey)
  );
  const masterchefBalance = useSelector(RewardsSelectors.masterChefBalances);

  const tokenKey = pools[poolKey].lpToken.symbol;

  if (!userShareData) {
    return null;
  }

  return (
    <StyledMyShare>
      <Grid container direction="column" spacing={2}>
        <Grid item>
          <Grid
            container
            justifyContent="space-between"
            alignItems="center"
            spacing={1}
          >
            <Grid item>
              <MyShareTitle variant="h5">
                {t(translations.LiquidityPage.MyShare.Title())}
              </MyShareTitle>
            </Grid>

            <Grid item>
              <MyShareBalanceText variant="body2">
                {formatBNToPercentString(userShareData.share, 18)}{" "}
                {t(translations.LiquidityPage.MyShare.OfPool())}
              </MyShareBalanceText>
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
                {t(translations.LiquidityPage.MyShare.USDBalance())}:
              </BalanceLabelText>
            </Grid>

            <Grid item>
              <BalanceText variant="body2">
                ${formatBNToString(userShareData.usdBalance, 18, 2)}
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
                {masterchefBalance &&
                  formatBNToShortString(
                    masterchefBalance[tokenKey]?.userInfo.amount || Zero,
                    18
                  )}
              </BalanceText>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </StyledMyShare>
  );
};

const StyledMyShare = styled("div")({
  width: "100%",
  backgroundColor: CssVariables.swapInputbackground,
  border: `4px solid ${CssVariables.cardBorder}`,
  borderRadius: "20px",
  padding: 20,
});

const MyShareTitle = styled(Typography)({
  color: CssVariables.white,
});

const MyShareBalanceText = styled(Typography)({
  color: CssVariables.primary,
});

const BalanceLabelText = styled(Typography)({
  color: CssVariables.white,
});

const BalanceText = styled(Typography)({
  color: CssVariables.white,
});
