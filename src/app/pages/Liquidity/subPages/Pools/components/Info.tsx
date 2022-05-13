import React, { FC } from "react";
import { styled, Grid, Typography, Skeleton } from "@mui/material";
import { useSelector } from "react-redux";
import { useTranslation } from "react-i18next";

import { translations } from "locales/i18n";
import { CssVariables } from "styles/cssVariables/cssVariables";
import { Zero } from "app/containers/Rewards/constants";
import {
  commify,
  formatBNToShortString,
  formatBNToString,
} from "app/containers/utils/contractUtils";
import { PoolDataProps } from "app/pages/Liquidity/types";
import { RewardsSelectors } from "app/containers/Rewards/selectors";
import { mobile } from "styles/media";

interface InfoData {
  title: string;
  value: string;
}

export const Info: FC<PoolDataProps> = ({ poolKey }) => {
  const { t } = useTranslation();
  const poolData = useSelector(RewardsSelectors.poolData(poolKey));
  const userShareData = useSelector(RewardsSelectors.userShareData(poolKey));
  const isGettingPoolsData = useSelector(RewardsSelectors.isGettingPoolsData);

  const formattedData = {
    reserve: poolData?.reserve
      ? formatBNToShortString(poolData?.reserve, 18)
      : "-",
    apr: poolData?.apr
      ? `${Number(poolData?.apr).toFixed(2)}%`
      : poolData?.apr === 0
      ? "0%"
      : "-",
    volume: poolData?.volume
      ? `${commify(Number(poolData?.volume).toFixed(2))}`
      : poolData?.volume === 0
      ? "0"
      : "-",
    userBalanceUSD: formatBNToString(userShareData?.usdBalance || Zero, 18, 2),
  };

  const hasShare = !!userShareData?.usdBalance.gt("0");
  let info: InfoData[] = [];

  info = info.concat([
    {
      title: t(translations.LiquidityPage.Info.SwapAPR()),
      value: `${formattedData.apr}`,
    },
    {
      title: t(translations.LiquidityPage.Info.TVL()),
      value: `$${formattedData.reserve}`,
    },
    {
      title: t(translations.LiquidityPage.Info["24hVolume"]()),
      value: `$${formattedData.volume}`,
    },
  ]);

  if (hasShare) {
    info.push({
      title: t(translations.LiquidityPage.Info.Balance()),
      value: `$${formattedData.userBalanceUSD}`,
    });
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
  justifyContent: "space-between",
  alignItems: "center",

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
