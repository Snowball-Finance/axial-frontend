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
import { getPoolIndexFromKey } from "app/pages/Liquidity/constants";
import { mobile } from "styles/media";
import { LiquidityPageSelectors } from "app/pages/Liquidity/selectors";

export const ActionButtons: FC<ActionButtonProps> = ({ poolKey }) => {
  const { t } = useTranslation();
  const dispatch = useDispatch();

  const pool = useSelector(LiquidityPageSelectors.liquidityPool(poolKey));

  const handleNavigateToDeposit = (poolKey: string) => {
    const poolIndex = getPoolIndexFromKey(poolKey);
    dispatch(push(`${AppPages.LiquidityPage}/${poolIndex}/deposit`));
  };

  const handleNavigateToWithdraw = (poolKey: string) => {
    const poolIndex = getPoolIndexFromKey(poolKey);
    dispatch(push(`${AppPages.LiquidityPage}/${poolIndex}/withdraw`));
  };

  return (
    <StyledContainer container spacing={{ xs: 1, xl: 2 }}>
      <Grid item>
        <ContainedButton
          width={120}
          onClick={() => handleNavigateToDeposit(poolKey)}
          disabled={pool?.poolData?.isPaused}
        >
          {t(translations.LiquidityPage.ActionButtons.Deposit())}
        </ContainedButton>
      </Grid>

      <Grid item>
        <OutlinedButton
          width={120}
          onClick={() => handleNavigateToWithdraw(poolKey)}
        >
          {t(translations.LiquidityPage.ActionButtons.Withdraw())}
        </OutlinedButton>
      </Grid>
    </StyledContainer>
  );
};

const StyledContainer = styled(Grid)({
  flexDirection: "row",
  [mobile]: {
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "column",
  },
});
