import React, { FC } from "react";
import { styled, Grid, Typography, Skeleton } from "@mui/material";
import { useSelector } from "react-redux";
import { useTranslation } from "react-i18next";

import { translations } from "locales/i18n";
import { pools } from "app/pools";
import { CssVariables } from "styles/cssVariables/cssVariables";
import { RewardsPageSelectors } from "app/pages/Rewards/selectors";
import { PoolDataProps } from "app/pages/Rewards/types";
import { PoolTypes, UserShareData } from "app/containers/Rewards/types";
import { Zero } from "app/containers/Rewards/constants";
import {
  abbreviatedNumber,
  commify,
  // formatBNToShortString,
  formatBNToString,
} from "app/containers/utils/contractUtils";
import { mobile } from "styles/media";
import { RewardsSelectors } from "app/containers/Rewards/selectors";
import { PoolsAndGaugesSelectors } from "app/containers/PoolsAndGauges/selectors";
import { subtract } from "precise-math";

interface InfoData {
  title: string;
  value: string;
}

export const Info: FC<PoolDataProps> = ({ poolKey }) => {
  const { t } = useTranslation();
  const poolData = useSelector(RewardsPageSelectors.rewardsPoolData(poolKey));
  const userShareData: UserShareData | undefined = useSelector(
    RewardsPageSelectors.rewardsUserShareData(poolKey)
  );
  const isGettingPoolsData = useSelector(RewardsSelectors.isGettingPoolsData);
  const poolsAndGaugesPools = useSelector(PoolsAndGaugesSelectors.pools);
  console.log({key:poolKey, address:pools[poolKey]?.swapAddress||pools[poolKey]?.address,})
  const poolDataFromAPI =
    poolsAndGaugesPools[pools[poolKey]?.swapAddress] ||
    poolsAndGaugesPools[pools[poolKey]?.address];
  const totalAPR = poolDataFromAPI?.last_apr || 0;
  const lastSwapApr = poolDataFromAPI?.last_swap_apr || 0;
  const lastAPR = poolDataFromAPI?.last_apr || 0;
  const lastTVL=poolDataFromAPI?.last_tvl||0
  const rewardsAPR = subtract(Number(lastAPR), Number(lastSwapApr));
  const formattedData = {
    TVL: abbreviatedNumber(Number(lastTVL||"0")),//formatBNToShortString(poolData?.totalLocked || Zero, 18), 
    axialPending: userShareData
      ? commify(
          formatBNToString(
            userShareData?.poolBalance?.pendingTokens.pendingAxial || Zero,
            18,
            2
          )
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
    totalapr: totalAPR
      ? commify(Number(totalAPR).toFixed(2)) + "%"
      : poolData?.rapr === 0
      ? "0%"
      : "-",
    userBalanceUSD: userShareData
      ? formatBNToString(
          userShareData?.poolBalance?.userInfo.amount || Zero,
          18,
          2
        )
      : "-",
  };

  const hasShare =
    userShareData && !!userShareData?.poolBalance?.userInfo.amount.gt("0");
  let info: InfoData[] = [];

  if (pools[poolKey].poolType !== PoolTypes.LP) {
    info.push({
      title: t(translations.RewardsPage.Info.RewardsAPR()),
      value: `${commify(Number(rewardsAPR).toFixed(2))}%`,
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
          <StyledChildContainer container>
            <Grid item>
              <PoolInfoTitleText variant="body1">
                {item.title}
              </PoolInfoTitleText>
            </Grid>
            <Grid item>
              <PoolInfoSubTitleText variant="body2">
                {isGettingPoolsData ? <TextLoader width={50} /> : item.value}
              </PoolInfoSubTitleText>
            </Grid>
          </StyledChildContainer>
        </Grid>
      ))}
    </StyledContainer>
  );
};

const StyledContainer = styled(Grid)({
  alignItems: "center",
  justifyContent: "flex-end",

  [mobile]: {
    flexDirection: "column",
    alignItems: "flex-start",
  },
});

const StyledChildContainer = styled(Grid)({
  flexDirection: "column",
  alignItems: "center",
  rowGap: 20,

  [mobile]: {
    flexDirection: "row",
    columnGap: 20,
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
