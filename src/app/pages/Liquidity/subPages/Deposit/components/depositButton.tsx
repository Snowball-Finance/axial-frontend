import { ContainedButton } from "app/components/common/buttons/containedButton";
import { RewardsSelectors } from "app/containers/Rewards/selectors";
import { LiquidityPageSelectors } from "app/pages/Liquidity/selectors";
import { LiquidityPageActions } from "app/pages/Liquidity/slice";
import { translations } from "locales/i18n";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";

export const DepositButton = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const depositTokens = useSelector(
    LiquidityPageSelectors.liquidityDepositTokenAmounts
  );
  const disabled = Object.keys(depositTokens).length === 0;
  const isDepositing = useSelector(RewardsSelectors.isDepositing);
  const handleDepositClick = () => {
    dispatch(LiquidityPageActions.deposit());
  };
  return (
    <ContainedButton
      width={220}
      height={42}
      disabled={disabled}
      loading={isDepositing}
      onClick={handleDepositClick}
    >
      {t(translations.LiquidityPage.ActionButtons.Deposit())}
    </ContainedButton>
  );
};
