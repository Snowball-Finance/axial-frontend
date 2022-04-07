import { ContainedButton } from "app/components/common/buttons/containedButton";
import { RewardsSelectors } from "app/containers/Rewards/selectors";
import { LiquidityPageSelectors } from "app/pages/Liquidity/selectors";
import { LiquidityPageActions } from "app/pages/Liquidity/slice";
import { translations } from "locales/i18n";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";

export const WithdrawButton = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const areAllApproved = useSelector(LiquidityPageSelectors.tokensAreApproved);
  const isCheckingForApproval = useSelector(
    LiquidityPageSelectors.isCheckingForApproval
  );
  const isWithdrawing = useSelector(RewardsSelectors.isWithdrawing);
  const handleWithdrawClick = () => {
    dispatch(LiquidityPageActions.withdraw());
  };

  return (
    <ContainedButton
      loading={isWithdrawing}
      disabled={!areAllApproved || isCheckingForApproval}
      onClick={handleWithdrawClick}
    >
      {t(translations.LiquidityPage.Buttons.ConfirmWithdraw())}
    </ContainedButton>
  );
};
