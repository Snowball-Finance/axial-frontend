import { ContainedButton } from "app/components/common/buttons/containedButton";
import { RewardsSelectors } from "app/containers/Rewards/selectors";
import { LiquidityPageSelectors } from "app/pages/Liquidity/selectors";
import { LiquidityPageActions } from "app/pages/Liquidity/slice";
import { translations } from "locales/i18n";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";

export const ConfirmButton = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const areAllTokensApproved = useSelector(
    LiquidityPageSelectors.tokensAreApproved
  );

  const isDepositing = useSelector(RewardsSelectors.isDepositing);
  const handleDepositClick = () => {
    dispatch(LiquidityPageActions.deposit());
  };

  return (
    <ContainedButton
      onClick={handleDepositClick}
      loading={isDepositing}
      disabled={!areAllTokensApproved}
      fullWidth
    >
      {t(translations.LiquidityPage.Buttons.ConfirmDeposit())}
    </ContainedButton>
  );
};
