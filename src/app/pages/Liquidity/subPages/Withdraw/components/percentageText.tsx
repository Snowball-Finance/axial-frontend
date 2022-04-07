import { styled, Typography } from "@mui/material";
import { LiquidityPageSelectors } from "app/pages/Liquidity/selectors";
import { useSelector } from "react-redux";
import { CssVariables } from "styles/cssVariables/cssVariables";

export const PercentageText = () => {
  const selectedPercentage = useSelector(
    LiquidityPageSelectors.withdrawPercentage
  );
  return (
    <Text variant="body2" align="right">
      {selectedPercentage.toString()}
    </Text>
  );
};

const Text = styled(Typography)({
  color: CssVariables.white,
});
