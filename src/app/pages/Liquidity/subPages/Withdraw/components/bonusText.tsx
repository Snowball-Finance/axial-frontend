import { LiquidityPageSelectors } from "app/pages/Liquidity/selectors";
import { BigNumber } from "ethers";
import { translations } from "locales/i18n";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";

export const BonusText = () => {
  const { t } = useTranslation();
  const bonus =
    useSelector(LiquidityPageSelectors.withdrawBonus) || BigNumber.from(0);
  let text = t(translations.LiquidityPage.Bonus());
  if (bonus.lt(0)) {
    text = t(translations.LiquidityPage.PriceImpact());
  }
  return <>{text}</>;
};
