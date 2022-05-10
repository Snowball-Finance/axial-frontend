import React, { FC } from "react";
import { styled, Grid, Typography, Checkbox, Box } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { useTranslation } from "react-i18next";

import { translations } from "locales/i18n";
import { CssVariables } from "styles/cssVariables/cssVariables";
import { mobile } from "styles/media";
import { CardWrapper } from "app/components/wrappers/Card";
import axialIcon from "assets/icons/logo_icon.svg";
import { ContainedButton } from "app/components/common/buttons/containedButton";
import { PoolsAndGaugesSelectors } from "app/containers/PoolsAndGauges/selectors";
import { RewardsPageSelectors } from "app/pages/Rewards/selectors";
import { RewardsPageActions } from "app/pages/Rewards/slice";
import { formatBNToString } from "app/containers/utils/contractUtils";
import { Zero } from "app/containers/Rewards/constants";

export const ClaimRewardsModal: FC = () => {
  const { t } = useTranslation();

  const pools = useSelector(PoolsAndGaugesSelectors.pools);
  const selectedPool = useSelector(RewardsPageSelectors.selectedPool);
  const checkedClaimRewards = useSelector(
    RewardsPageSelectors.checkedClaimRewards
  );
  const isClaimRewardsLoading = useSelector(
    RewardsPageSelectors.isClaimRewardsLoading
  );

  const dispatch = useDispatch();

  if (!selectedPool) {
    return null;
  }

  if (selectedPool && !(selectedPool.address in pools)) {
    return null;
  }

  const isCheckAll =
    checkedClaimRewards.length === pools[selectedPool?.address].rewardTokens?.length;

  const handleCheckAllClick = () => {
    if (isCheckAll) {
      dispatch(RewardsPageActions.setCheckedClaimRewards([]));
    } else {
      let checkedItems: number[] = [];
      pools[selectedPool?.address].rewardTokens?.forEach((_, index) => {
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

  const handleClaim = () => {
    dispatch(RewardsPageActions.claimRewardsToken());
  };

  return (
    <StyledContainer mt={2}>
      <CardWrapper>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <Grid container spacing={1} alignItems="center">
              <Grid item>
                <CustomCheckbox
                  checked={isCheckAll}
                  onChange={handleCheckAllClick}
                />
              </Grid>

              <Grid item>
                <Text variant="body2">{t(translations.Common.CheckAll())}</Text>
              </Grid>
            </Grid>
          </Grid>

          {pools[selectedPool?.address].rewardTokens?.map((token, index) => {
            return (
              <Grid item key={token.symbol} xs={12}>
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
                        <IconImage src={axialIcon} alt={token.symbol} />
                      </Grid>

                      <Grid item>
                        <TokenText variant="body1">{token.symbol}</TokenText>
                      </Grid>
                    </Grid>
                  </Grid>

                  <Grid item>
                    <Grid container spacing={1} alignItems="center">
                      <Grid item>
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
              </Grid>
            );
          })}

          <Grid item xs={12}>
            <ContainedButton
              loading={isClaimRewardsLoading}
              fullWidth
              onClick={handleClaim}
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
});

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

const CustomCheckbox = styled(Checkbox)({
  path: {
    fill: CssVariables.green,
  },
});
