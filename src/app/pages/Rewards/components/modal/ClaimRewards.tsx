import React, { FC } from "react";
import { styled, Grid, Typography, Checkbox, Box } from "@mui/material";
import { useTranslation } from "react-i18next";

import { translations } from "locales/i18n";
import { CssVariables } from "styles/cssVariables/cssVariables";
import { mobile } from "styles/media";
import { CardWrapper } from "app/components/wrappers/Card";
import { ContainedButton } from "app/components/common/buttons/containedButton";
import { RewardsPageSelectors } from "../../selectors";
import { useDispatch, useSelector } from "react-redux";
import { RewardsPageActions } from "../../slice";
import { Pool } from "app/containers/Rewards/types";

export const ClaimRewardsModal: FC = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const pool = useSelector(RewardsPageSelectors.selectedPool) as Pool;
  const harvestables = useSelector(RewardsPageSelectors.tokensToClaim);
  const handleClaimClick = () => {
    dispatch(RewardsPageActions.claim(pool));
  };
  return (
    <StyledContainer mt={2}>
      <CardWrapper>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <Grid container spacing={1} alignItems="center">
              <Grid item>
                <CustomCheckbox checked={false} onChange={() => {}} />
              </Grid>

              <Grid item>
                <Text variant="body2">Check all</Text>
              </Grid>
            </Grid>
          </Grid>

          {harvestables.map((item) => {
            return (
              <Grid item key={item.token.symbol} xs={12}>
                <Grid
                  container
                  justifyContent="space-between"
                  alignItems="center"
                >
                  <Grid item>
                    <Grid container spacing={1} alignItems="center">
                      <Grid item>
                        <CustomCheckbox checked={false} onChange={() => {}} />
                      </Grid>

                      <Grid item>
                        <IconImage
                          src={item.token.logo}
                          alt={item.token.symbol}
                        />
                      </Grid>

                      <Grid item>
                        <TokenText variant="body1">
                          {item.token.symbol}
                        </TokenText>
                      </Grid>
                    </Grid>
                  </Grid>

                  <Grid item>
                    <Grid container spacing={1} alignItems="center">
                      <Grid item>
                        <Text variant="body1">{item.amountToHarvest}</Text>
                      </Grid>

                      <Grid item>
                        <Text variant="body2">(${item.amountInUsd})</Text>
                      </Grid>
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
            );
          })}

          <Grid item xs={12}>
            <ContainedButton onClick={handleClaimClick} fullWidth>
              {t(translations.RewardsPage.ActionButtons.Claim())}
            </ContainedButton>
          </Grid>
        </Grid>
      </CardWrapper>
    </StyledContainer>
  );
};

const StyledContainer = styled(Box)({
  width: 550,

  [mobile]: {
    width: "100%",
  },
});

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

const CustomCheckbox = styled(Checkbox)({
  path: {
    fill: CssVariables.green,
  },
});
