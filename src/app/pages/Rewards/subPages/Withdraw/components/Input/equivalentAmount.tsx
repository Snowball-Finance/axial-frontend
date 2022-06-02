import { styled, Typography } from "@mui/material";
import { globalSelectors } from "app/appSelectors";
import { RewardsSelectors } from "app/containers/Rewards/selectors";
import { PoolData } from "app/containers/Rewards/types";
import { formatBNToString } from "app/containers/utils/contractUtils";
import { RewardsPageSelectors } from "app/pages/Rewards/selectors";
import { multiply } from "precise-math";
import { useSelector } from "react-redux";
import { CssVariables } from "styles/cssVariables/cssVariables";

export const EquivalentInUsd = () => {
  const selectedPool = useSelector(RewardsPageSelectors.selectedPool);
  const poolData: PoolData = useSelector(
    RewardsSelectors.poolData(selectedPool?.key)
  );
  const tokenPricesUSD = useSelector(globalSelectors.tokenPricesUSD);
  const poolInputAmount = useSelector(RewardsPageSelectors.withdrawAmount);
  const symbol = selectedPool?.key;
  let tokenUSDValue: number = 0;

  if (poolData?.lpTokenPriceUSD) {
    if (!poolData.lpTokenPriceUSD.isZero()) {
      tokenUSDValue = parseFloat(
        formatBNToString(poolData.lpTokenPriceUSD, 18, 2)
      );
    } else {
      if (symbol) {
        tokenUSDValue = tokenPricesUSD?.[symbol] || 0;
      }
    }
  }
  const numberAmount = Number(poolInputAmount);
  const equivalent = multiply(numberAmount || 0, tokenUSDValue || 0);
  return (
    <InputText variant="body2" noWrap align="right">
      =$ {equivalent.toFixed(2)}
    </InputText>
  );
};

const InputText = styled(Typography)({
  color: CssVariables.white,
});
