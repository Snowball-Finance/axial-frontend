import React, { FC } from "react";
import { Grid, styled } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { push } from "connected-react-router";
import { useTranslation } from "react-i18next";

import { translations } from "locales/i18n";
import { ContainedButton } from "app/components/common/buttons/containedButton";
import { OutlinedButton } from "app/components/common/buttons/outlinedButton";
import { AppPages } from "app/types";
import { ActionButtonProps } from "app/pages/Liquidity/types";
import { mobile } from "styles/media";
import { LiquidityPageSelectors } from "app/pages/Liquidity/selectors";

export const ActionButtons: FC<ActionButtonProps> = ({ poolKey }) => {
  const { t } = useTranslation();
  const dispatch = useDispatch();

  const pool = useSelector(LiquidityPageSelectors.liquidityPool(poolKey));

  const handleNavigateToDeposit = (poolKey: string) => {
    const poolIndex = poolKey.toLowerCase();
    dispatch(push(`${AppPages.LiquidityPage}/${poolIndex}/deposit`));
  };

  const handleNavigateToWithdraw = (poolKey: string) => {
    const poolIndex = poolKey.toLowerCase();
    dispatch(push(`${AppPages.LiquidityPage}/${poolIndex}/withdraw`));
  };

  return (
    <StyledContainer container spacing={{ xs: 1, xl: 2 }}>
      <Grid item>
        <DepositButton
          onClick={() => handleNavigateToDeposit(poolKey)}
          disabled={pool?.poolData?.isPaused}
        >
          {t(translations.LiquidityPage.ActionButtons.Deposit())}
        </DepositButton>
      </Grid>

      <Grid item>
        <WithdrawButton onClick={() => handleNavigateToWithdraw(poolKey)}>
          {t(translations.LiquidityPage.ActionButtons.Withdraw())}
        </WithdrawButton>
      </Grid>
    </StyledContainer>
  );
};

const StyledContainer = styled(Grid)({
  flexDirection: "row",

  [mobile]: {
    flexDirection: "column",
    width: "100%",
  },
});

const DepositButton = styled(ContainedButton)({
  width: 120,

  [mobile]: {
    width: "100%",
  },
});

const WithdrawButton = styled(OutlinedButton)({
  width: 120,
  [mobile]: {
    width: "100%",
  },
});
