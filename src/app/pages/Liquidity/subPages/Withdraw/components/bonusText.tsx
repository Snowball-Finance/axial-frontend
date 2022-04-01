import { formatBNToPercentString } from "app/containers/utils/contractUtils";
import { LiquidityPageSelectors } from "app/pages/Liquidity/selectors";
import { BigNumber } from "ethers";
import { useSelector } from "react-redux";
import { CssVariables } from "styles/cssVariables/cssVariables";

export const BonusText = () => {
  const bonus =
    useSelector(LiquidityPageSelectors.withdrawBonus) || BigNumber.from(0);
  const toShow = formatBNToPercentString(bonus, 18, 4);
  let color = bonus.eq(0)
    ? CssVariables.commonTextColor
    : bonus.gt(0)
    ? CssVariables.green
    : CssVariables.red;
  return <span style={{ color }}>{toShow}</span>;
};
