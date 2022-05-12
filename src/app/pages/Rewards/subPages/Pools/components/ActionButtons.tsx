import React, { FC } from "react";
import { Grid, styled } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { push } from "connected-react-router";
import { useTranslation } from "react-i18next";

import { translations } from "locales/i18n";
import { ContainedButton } from "app/components/common/buttons/containedButton";
import { OutlinedButton } from "app/components/common/buttons/outlinedButton";
import { AppPages } from "app/types";
import { ActionButtonProps } from "app/pages/Rewards/types";
import { RewardsSelectors } from "app/containers/Rewards/selectors";
import { pools } from "app/pools";
import { RewardsPageActions } from "app/pages/Rewards/slice";
import { Pool } from "app/containers/Rewards/types";
import { Web3Selectors } from "app/containers/BlockChain/Web3/selectors";
import { mobile } from "styles/media";
import { RewardsPageSelectors } from "app/pages/Rewards/selectors";
import { getPoolIndexFromKey } from "app/pages/Liquidity/constants";

export const ActionButtons: FC<ActionButtonProps> = ({ poolKey }) => {
  const { t } = useTranslation();
  const poolsBalances = useSelector(RewardsSelectors.poolsBalances);
  const account = useSelector(Web3Selectors.selectAccount);
  const poolData = useSelector(RewardsPageSelectors.rewardsPoolData(poolKey));
  const dispatch = useDispatch();

  const tokenKey = pools[poolKey].lpToken.symbol;

  const handleNavigateToDeposit = (poolKey: string) => {
    const poolIndex = getPoolIndexFromKey(poolKey);
    dispatch(push(`${AppPages.RewardPage}/${poolIndex}/deposit`));
  };

  const handleNavigateToWithdraw = (poolKey: string) => {
    const poolIndex = getPoolIndexFromKey(poolKey);
    dispatch(push(`${AppPages.RewardPage}/${poolIndex}/withdraw`));
  };

  const handleClaimClick = (pool: Pool) => {
    dispatch(RewardsPageActions.claimRewardsToken());
  };

  return (
    <StyledContainer container spacing={{ xs: 1, xl: 2 }}>
      <StyledFullChildContainer item>
        <StyledContainedButton
          onClick={() => handleNavigateToDeposit(poolKey)}
          disabled={poolData?.isPaused}
        >
          {t(translations.RewardsPage.ActionButtons.Deposit())}
        </StyledContainedButton>
      </StyledFullChildContainer>

      <StyledFullChildContainer item>
        <StyledOutlinedButton onClick={() => handleNavigateToWithdraw(poolKey)}>
          {t(translations.RewardsPage.ActionButtons.Withdraw())}
        </StyledOutlinedButton>
      </StyledFullChildContainer>

      <StyledFullChildContainer item>
        <StyledOutlinedButton
          onClick={() => handleClaimClick(pools[poolKey])}
          disabled={
            !account ||
            (poolsBalances &&
              poolsBalances[tokenKey]?.pendingTokens.pendingAxial.eq("0x0"))
          }
        >
          {t(translations.RewardsPage.ActionButtons.Claim())}
        </StyledOutlinedButton>
      </StyledFullChildContainer>
    </StyledContainer>
  );
};

const StyledContainer = styled(Grid)({
  flexDirection: "row",

  [mobile]: {
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "column",
    width: "100%",
  },
});

const StyledFullChildContainer = styled(Grid)({
  [mobile]: {
    width: "100%",
  },
});

const StyledContainedButton = styled(ContainedButton)({
  width: 120,

  [mobile]: {
    width: "100%",
  },
});

const StyledOutlinedButton = styled(OutlinedButton)({
  width: 120,

  [mobile]: {
    width: "100%",
  },
});
