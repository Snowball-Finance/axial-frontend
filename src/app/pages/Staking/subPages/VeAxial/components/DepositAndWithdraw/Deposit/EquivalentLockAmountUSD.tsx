import { FC } from "react";
import { styled, Typography } from "@mui/material";
import { useSelector } from "react-redux";
import { multiply } from "precise-math";

import { CssVariables } from "styles/cssVariables/cssVariables";
import { globalSelectors } from "app/appSelectors";
import { StakingPageSelectors } from "app/pages/Staking/selectors";
import { env } from "environment";

export const EquivalentLockAmountUSD: FC = () => {
  const tokenPricesUSD = useSelector(globalSelectors.tokenPricesUSD);
  const enteredAmount = useSelector(
    StakingPageSelectors.selectEnteredMainTokenToStakeIntoVeAxial
  );

  let tokenUSDValue: number = 0;
  if (env.MAIN_TOKEN_NAME) {
    tokenUSDValue = tokenPricesUSD?.[env.MAIN_TOKEN_NAME];
  }
  const numberAmount = Number(enteredAmount);
  const equivalent = multiply(numberAmount || 0, tokenUSDValue || 0);

  return <Text variant="body2">= {equivalent}</Text>;
};

const Text = styled(Typography)({
  color: CssVariables.white,
});
