import React, { FC } from "react";
import { Grid } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { push } from "connected-react-router";
import { useTranslation } from "react-i18next";

import { translations } from "locales/i18n";
import { ContainedButton } from "app/components/common/buttons/containedButton";
import { OutlinedButton } from "app/components/common/buttons/outlinedButton";
import { AppPages } from "app/types";
import { ActionButtonProps } from "app/pages/Rewards/types";
import { getPoolIndexFromKey } from "app/pages/Rewards/constants";
import { RewardsSelectors } from "app/containers/Rewards/selectors";
import { pools } from "app/pools";
import { RewardsPageActions } from "app/pages/Rewards/slice";
import { Pool } from "app/containers/Rewards/types";

export const ActionButtons: FC<ActionButtonProps> = ({ poolKey }) => {
  const { t } = useTranslation();
  const masterchefBalance = useSelector(RewardsSelectors.masterChefBalances);
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

  const handleClaimClick=(pool:Pool)=>{
    dispatch(RewardsPageActions.claim(pool))
  }

  return (
    <Grid container spacing={2}>
      <Grid item>
        <ContainedButton
          width={120}
          onClick={() => handleNavigateToDeposit(poolKey)}
        >
          {t(translations.RewardsPage.ActionButtons.Deposit())}
        </ContainedButton>
      </Grid>

      <Grid item>
        <OutlinedButton
          width={120}
          onClick={() => handleNavigateToWithdraw(poolKey)}
        >
          {t(translations.RewardsPage.ActionButtons.Withdraw())}
        </OutlinedButton>
      </Grid>

      <Grid item>
        <OutlinedButton
          width={120}
          onClick={()=>handleClaimClick(pools[poolKey])}
          disabled={
            masterchefBalance &&
            masterchefBalance[tokenKey]?.pendingTokens.pendingAxial.eq("0x0")
          }
        >
          {t(translations.RewardsPage.ActionButtons.Claim())}
        </OutlinedButton>
      </Grid>
    </Grid>
  );
};
