import React, { FC } from "react";
import { styled, Grid, Typography } from "@mui/material";
import { useTranslation } from "react-i18next";

import { translations } from "locales/i18n";
import { CssVariables } from "styles/cssVariables/cssVariables";
import { mobile } from "styles/media";
import { CardWrapper } from "app/components/wrappers/Card";
import { demoData } from "./staticValues";
import { Actions } from "./Actions";

export const ClaimRewards: FC = () => {
  const { t } = useTranslation();

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
            {demoData.map((item) => {
              return (
                <Grid item key={item.symbol} xs={12}>
                  <Grid
                    container
                    justifyContent="space-between"
                    alignItems="center"
                  >
                    <Grid container spacing={1} alignItems="center" xs={4}>
                      <Grid item>
                        <IconImage src={item.logo} alt={item.symbol} />
                      </Grid>

                      <Grid item>
                        <TokenText variant="body2">{item.symbol}</TokenText>
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
                        <Text variant="body1">{item.apr}</Text>
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
                          {item.totalEarned} (${item.totalEarnedUSD})
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
