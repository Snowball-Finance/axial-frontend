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

  const formattedData = {
    reserve: poolData?.reserve
      ? formatBNToShortString(poolData?.reserve, 18)
      : "",
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
    userBalanceUSD: formatBNToShortString(
      userShareData?.usdBalance || Zero,
      18
    ),
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
          <Grid container spacing={1} direction="column" alignItems="center">
            <Grid item>
              <PoolInfoTitleText variant="body1">
                {item.title}
              </PoolInfoTitleText>
            </Grid>
            <Grid item>
              <PoolInfoSubTitleText variant="body2">
                {item.value === "-" ? <TextLoader width={50} /> : item.value}
              </PoolInfoSubTitleText>
            </Grid>
          </Grid>
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
  },
});

const PoolInfoTitleText = styled(Typography)({
  color: CssVariables.white,
  fontSize: "16px",
  fontWeight: "bold",
});

const PoolInfoSubTitleText = styled(Typography)({
  color: CssVariables.white,
  fontSize: "16px",
});

const TextLoader = styled(Skeleton)({
  backgroundColor: CssVariables.primary,
});
