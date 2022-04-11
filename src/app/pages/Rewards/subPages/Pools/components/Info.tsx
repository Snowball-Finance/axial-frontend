import React, { FC } from "react";
import { styled, Grid, Typography, Skeleton } from "@mui/material";
import { useSelector } from "react-redux";
import { useTranslation } from "react-i18next";

import { translations } from "locales/i18n";
import { pools } from "app/pools";
import { CssVariables } from "styles/cssVariables/cssVariables";
import { RewardsPageSelectors } from "app/pages/Rewards/selectors";
import { PoolDataProps } from "app/pages/Rewards/types";
import { PoolTypes } from "app/containers/Rewards/types";
import { Zero } from "app/containers/Rewards/constants";
import { formatBNToShortString } from "app/containers/utils/contractUtils";
import { RewardsSelectors } from "app/containers/Rewards/selectors";
import { mobile } from "styles/media";

interface InfoData {
  title: string;
  value: string;
}

export const Info: FC<PoolDataProps> = ({ poolKey }) => {
  const { t } = useTranslation();
  const poolData = useSelector(RewardsPageSelectors.rewardsPoolData(poolKey));
  const masterchefBalance = useSelector(RewardsSelectors.masterChefBalances);

  const tokenKey = pools[poolKey].lpToken.symbol;

  const formattedData = {
    TVL: formatBNToShortString(poolData?.totalLocked || Zero, 18),
    axialPending: masterchefBalance
      ? formatBNToShortString(
          masterchefBalance[tokenKey]?.pendingTokens.pendingAxial || Zero,
          18
        )
      : "",
    apr: poolData?.apr
      ? `${Number(poolData?.apr).toFixed(2)}%`
      : poolData?.apr === 0
      ? "0%"
      : "-",
    rapr: poolData?.rapr
      ? `${Number(poolData?.rapr).toFixed(2)}%`
      : poolData?.rapr === 0
      ? "0%"
      : "-",
    extraapr: poolData?.extraapr
      ? `${Number(poolData.extraapr).toFixed(2)}%`
      : null,
    totalapr: Number(poolData?.rapr)
      ? (
          Number(poolData?.rapr) +
          (poolData?.apr ? Number(poolData?.apr) : 0) +
          (poolData?.extraapr ? Number(poolData?.extraapr) : 0)
        ).toFixed(2) + "%"
      : poolData?.rapr === 0
      ? "0%"
      : "-",
    userBalanceUSD: masterchefBalance
      ? formatBNToShortString(
          masterchefBalance[tokenKey]?.userInfo.amount || Zero,
          18
        )
      : "",
  };

  const hasShare =
    masterchefBalance && !!masterchefBalance[tokenKey]?.userInfo.amount.gt("0");
  let info: InfoData[] = [];

  if (pools[poolKey].poolType !== PoolTypes.LP) {
    info.push({
      title: t(translations.RewardsPage.Info.RewardsAPR()),
      value: `${formattedData.rapr}${
        formattedData.extraapr ? " + " + formattedData.extraapr : ""
      }`,
    });
  }

  info = info.concat([
    {
      title: t(translations.RewardsPage.Info.TotalAPR()),
      value: `${formattedData.totalapr}`,
    },
    {
      title: t(translations.RewardsPage.Info.TVL()),
      value: `$${formattedData.TVL}`,
    },
  ]);

  if (hasShare) {
    info.push(
      {
        title: t(translations.RewardsPage.Info.Balance()),
        value: `$${formattedData.userBalanceUSD}`,
      },
      {
        title: t(translations.RewardsPage.Info.Claimable()),
        value: `${formattedData.axialPending}`,
      }
    );
  }

  return (
    <StyledContainer container spacing={{ xs: 2, xl: 4 }}>
      {info.map((item, index) => (
        <Grid item key={index}>
          <Grid container spacing={1} direction="column">
            <Grid item>
              <PoolInfoTitleText variant="body1">
                {item.title}
              </PoolInfoTitleText>
            </Grid>
            <Grid item>
              <PoolInfoSubTitleText variant="body2">
                {item.value === "-" || item.value === "$0.0" ? (
                  <TextLoader width={50} />
                ) : (
                  item.value
                )}
              </PoolInfoSubTitleText>
            </Grid>
          </Grid>
        </Grid>
      ))}
    </StyledContainer>
  );
};

const StyledContainer = styled(Grid)({
  alignItems: "center",

  [mobile]: {
    flexDirection: "column",
  },
});

const PoolInfoTitleText = styled(Typography)({
  color: CssVariables.white,
});

const PoolInfoSubTitleText = styled(Typography)({
  color: CssVariables.white,
});

const TextLoader = styled(Skeleton)({
  backgroundColor: CssVariables.primary,
});
