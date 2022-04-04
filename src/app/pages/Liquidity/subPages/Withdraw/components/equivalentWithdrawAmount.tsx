import { styled, Typography } from "@mui/material";
import { globalSelectors } from "app/appSelectors";
import { Token } from "app/containers/Swap/types";
import { LiquidityPageSelectors } from "app/pages/Liquidity/selectors";
import { multiply } from "precise-math";
import { useSelector } from "react-redux";
import { CssVariables } from "styles/cssVariables/cssVariables";

export const EquivalentWithdrawAmount = ({ token }: { token: Token }) => {
  const value = useSelector(
    LiquidityPageSelectors.withdrawAmount(token.symbol)
  );
  const tokenPriceInUsdt = useSelector(
    globalSelectors.tokenPriceInUsdt(token.symbol)
  );
  const equivalentValue = multiply(Number(value || 0), tokenPriceInUsdt);
  let equivalentValueToShow = equivalentValue === 0 ? "$0" : `~ < $0.01`;
  if (equivalentValue > 0.01) {
    equivalentValueToShow = `~ $${equivalentValue.toFixed(2)}`;
  }
  return <AmountInUsdt>{equivalentValueToShow}</AmountInUsdt>;
};

const AmountInUsdt = styled(Typography)({
  color: CssVariables.white,
});
