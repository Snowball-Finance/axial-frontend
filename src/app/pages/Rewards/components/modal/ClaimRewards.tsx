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
import { commify } from "app/containers/utils/contractUtils";
import { formatNumber } from "common/format";

interface Props {
  pool?: Pool;
}

export const ClaimRewardsModal: FC<Props> = ({ pool }) => {
  const { t } = useTranslation();
  const dispatch = useDispatch();

  const harvestables = useSelector(RewardsPageSelectors.tokensToClaim);
  const checkedClaimRewards = useSelector(
    RewardsPageSelectors.checkedClaimRewards
  );
  const claimable = useSelector(RewardsPageSelectors.tokensToClaim);
  const isClaimRewardsLoading = useSelector(
    RewardsPageSelectors.isClaimRewardsLoading
  );

  const isCheckAll = checkedClaimRewards.length === claimable.length;

  const handleCheckAllClick = () => {
    if (isCheckAll) {
      dispatch(RewardsPageActions.setCheckedClaimRewards([]));
    } else {
      let checkedItems: number[] = [];
      harvestables?.forEach((_, index) => {
        checkedItems.push(index);
      });

      dispatch(RewardsPageActions.setCheckedClaimRewards(checkedItems));
    }
  };

  const handleOneItemClick = (index: number) => {
    let checkedItems = [...checkedClaimRewards];
    const checkedIndex = checkedItems.indexOf(index);
    if (checkedIndex > -1) {
      checkedItems.splice(checkedIndex, 1);
    } else {
      checkedItems = [...checkedItems, index];
    }
    dispatch(RewardsPageActions.setCheckedClaimRewards(checkedItems));
  };

  const handleClaimClick = () => {
    if (pool) {
      dispatch(RewardsPageActions.claim(pool));
    }
  };

  return (
    <StyledContainer mt={2}>
      <CardWrapper>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            {harvestables.length > 1 && (
              <Grid container spacing={1} alignItems="center">
                <Grid item>
                  <CustomCheckbox
                    checked={isCheckAll}
                    onChange={handleCheckAllClick}
                  />
                </Grid>
                <Grid item>
                  <Text variant="body2">Check all</Text>
                </Grid>
              </Grid>
            )}
          </Grid>

          {harvestables.map((item, index) => {
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
                        <CustomCheckbox
                          checked={checkedClaimRewards.includes(index)}
                          onChange={() => handleOneItemClick(index)}
                        />
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
                        <Text variant="body1">
                          {commify(
                            formatNumber(+item.amountToHarvest, 4).toString()
                          )}
                        </Text>
                      </Grid>

                      <Grid item>
                        <Text variant="body2">
                          {"($"}
                          {commify(
                            formatNumber(+item.amountInUsd, 4).toString()
                          )}
                          {")"}
                        </Text>
                      </Grid>
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
            );
          })}

          <Grid item xs={12}>
            <ContainedButton
              fullWidth
              disabled={checkedClaimRewards.length === 0}
              loading={isClaimRewardsLoading}
              onClick={handleClaimClick}
            >
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
