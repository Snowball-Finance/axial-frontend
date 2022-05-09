import React, { FC } from "react";
import { styled, Grid, Typography } from "@mui/material";
import { useSelector } from "react-redux";
import { useTranslation } from "react-i18next";

import { translations } from "locales/i18n";
import { CssVariables } from "styles/cssVariables/cssVariables";
import { mobile } from "styles/media";
import { CardWrapper } from "app/components/wrappers/Card";
import { PoolsAndGaugesSelectors } from "app/containers/PoolsAndGauges/selectors";
import { RewardsPageSelectors } from "app/pages/Rewards/selectors";
import axialIcon from "assets/icons/logo_icon.svg";
import { Actions } from "./Actions";
import { formatBNToString } from "app/containers/utils/contractUtils";
import { Zero } from "app/containers/Rewards/constants";

export const ClaimRewards: FC = () => {
  const { t } = useTranslation();

  const pools = useSelector(PoolsAndGaugesSelectors.pools);
  const selectedPool = useSelector(RewardsPageSelectors.selectedPool);

  if (selectedPool && !(selectedPool.address in pools)) {
    return null;
  }

  return (
    <Grid container spacing={2} direction="column">
      <Grid item>
        <HeaderText variant="h2">
          {t(translations.RewardsPage.ClaimRewards.Title())}
        </HeaderText>
      </Grid>

      <Grid item>
        <CardWrapper>
          <Grid container spacing={2}>
            {selectedPool &&
              pools[selectedPool.address]?.tokens.map((token) => {
                return (
                  <Grid item key={token.symbol} xs={12}>
                    <Grid
                      container
                      justifyContent="space-between"
                      alignItems="center"
                    >
                      <Grid container spacing={1} alignItems="center" xs={4}>
                        <Grid item>
                          <IconImage src={axialIcon} alt={token.symbol} />
                        </Grid>

                        <Grid item>
                          <TokenText variant="body2">{token.symbol}</TokenText>
                        </Grid>
                      </Grid>

                      <Grid
                        item
                        container
                        justifyContent="center"
                        alignItems="center"
                        xs={4}
                      >
                        <Grid item xs={12}>
                          <Text variant="body2">APR</Text>
                        </Grid>

                        <Grid item xs={12}>
                          <Text variant="body1">
                            {pools[selectedPool.address]?.last_apr}
                          </Text>
                        </Grid>
                      </Grid>

                      <Grid
                        item
                        container
                        justifyContent="center"
                        alignItems="center"
                        xs={4}
                      >
                        <Grid item xs={12}>
                          <Text variant="body2">Earned</Text>
                        </Grid>

                        <Grid item xs={12}>
                          <Text variant="body1">
                            {formatBNToString(
                              pools[selectedPool.address]?.userDepositedLP ??
                                Zero,
                              18
                            )}
                          </Text>
                        </Grid>
                      </Grid>
                    </Grid>
                  </Grid>
                );
              })}

            <Grid item xs={12}>
              <Actions />
            </Grid>
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
    height: "25px",
  },
});

const TokenText = styled(Typography)({
  color: CssVariables.white,

  [mobile]: {
    fontSize: "1rem",
  },
});

const Text = styled(Typography)({
  color: CssVariables.white,
});

const HeaderText = styled(Typography)({
  color: CssVariables.white,
  textTransform: "uppercase",
});
