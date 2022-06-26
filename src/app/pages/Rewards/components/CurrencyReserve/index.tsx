import React, { FC } from "react";
import { styled, Grid, Typography } from "@mui/material";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { useTranslation } from "react-i18next";

import { translations } from "locales/i18n";
import { CssVariables } from "styles/cssVariables/cssVariables";
import { RewardsPageSelectors } from "app/pages/Rewards/selectors";
import { PoolTypes, TokenShareType } from "app/containers/Rewards/types";
import { commify, formatBNToString } from "app/containers/utils/contractUtils";
import { pools } from "app/pools";
import { tokens } from "app/tokens";
import { mobile } from "styles/media";
import { CardWrapper } from "app/components/wrappers/Card";

type TParams = { poolIndex: string };

export const CurrencyReserve: FC = () => {
  const { t } = useTranslation();

  const { poolIndex } = useParams<TParams>();
  const poolKey = poolIndex?.toUpperCase() || "";
  const rewardsPoolData = useSelector(
    RewardsPageSelectors.rewardsPoolData(poolKey)
  );

  const formattedDecimals = pools[poolKey].poolType === PoolTypes.USD ? 2 : 4;

  return (
    <Grid container spacing={2}>
      <Grid item xs={12}>
        <HeaderText variant="h2">
          {t(translations.RewardsPage.CurrencyReserve.Title())}
        </HeaderText>
      </Grid>

      <Grid item xs={12}>
        <CardWrapper>
          <Grid container spacing={4}>
            {rewardsPoolData?.tokens.map((infoItem: TokenShareType) => (
              <Grid item key={infoItem.symbol} xs={12}>
                <Grid
                  container
                  justifyContent="space-between"
                  alignItems="center"
                  spacing={2}
                >
                  <Grid item xs={4}>
                    <Grid container spacing={1}>
                      <Grid item>
                        <IconImage
                          src={tokens[infoItem.symbol].logo}
                          alt="icon"
                        ></IconImage>
                      </Grid>

                      <Grid item alignSelf="center" xs zeroMinWidth>
                        <TokenText variant="body1" noWrap>
                          {infoItem.symbol}
                        </TokenText>
                      </Grid>
                    </Grid>
                  </Grid>

                  <Grid item xs={3}>
                    <BalanceText variant="body1">
                      {infoItem.percent}
                    </BalanceText>
                  </Grid>

                  <Grid item xs={5}>
                    <Grid container alignItems="center" spacing={1}>
                      <Grid item xs={4} alignSelf="right">
                        <BalanceLabelText variant="body1" align="right">
                          TVL
                        </BalanceLabelText>
                      </Grid>

                      <Grid item xs zeroMinWidth alignSelf="left">
                        <BalanceText variant="body2" noWrap align="left">
                          {commify(
                            formatBNToString(
                              infoItem.value,
                              18,
                              formattedDecimals
                            )
                          )}
                        </BalanceText>
                      </Grid>
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
            ))}
          </Grid>
        </CardWrapper>
      </Grid>
    </Grid>
  );
};

const IconImage = styled("img")({
  width: "33px",
  height: "33px",

  [mobile]: {
    width: "25px",
  },
});

const TokenText = styled(Typography)({
  color: CssVariables.white,

  [mobile]: {
    fontSize: "1rem",
  },
});

const BalanceLabelText = styled(Typography)({
  color: CssVariables.white,
});

const BalanceText = styled(Typography)({
  color: CssVariables.white,
});

const HeaderText = styled(Typography)({
  color: CssVariables.white,
  textTransform: "uppercase",
});
