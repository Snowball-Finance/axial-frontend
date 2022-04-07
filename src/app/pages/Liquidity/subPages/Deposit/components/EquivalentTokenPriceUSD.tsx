import { styled, Typography } from "@mui/material";
import { useSelector } from "react-redux";
import { multiply } from "precise-math";

import { CssVariables } from "styles/cssVariables/cssVariables";
import { globalSelectors } from "app/appSelectors";
import { Token } from "app/containers/Swap/types";
import { LiquidityPageSelectors } from "app/pages/Liquidity/selectors";

export const EquivalentTokenPriceUSD = ({ token }: { token: Token }) => {
  const value = useSelector(
    LiquidityPageSelectors.liquidityDepositTokenAmount(token.symbol)
  );
  const tokenPriceInUsdt = useSelector(
    globalSelectors.tokenPriceInUSD(token.symbol)
  );
  const equivalentValue = multiply(Number(value || 0), tokenPriceInUsdt);
  let equivalentValueToShow = equivalentValue === 0 ? "$0" : `~ < $0.01`;
  if (equivalentValue > 0.01) {
    equivalentValueToShow = `~ $${equivalentValue.toFixed(2)}`;
  }
  return (
    <AmountInUsdt variant="body2" align="right">
      {equivalentValueToShow}
    </AmountInUsdt>
  );
};

const AmountInUsdt = styled(Typography)({
  color: CssVariables.white,
});
