import { OutlinedButton } from "app/components/common/buttons/outlinedButton";
import { LiquidityPageSelectors } from "app/pages/Liquidity/selectors";
import { LiquidityPageActions } from "app/pages/Liquidity/slice";
import { translations } from "locales/i18n";
import { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";

export const WithdrawApproveButton = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const isChecking = useSelector(LiquidityPageSelectors.isCheckingForApproval);
  const areAllApproved = useSelector(LiquidityPageSelectors.tokensAreApproved);

  const handleApproveClick = () => {
    dispatch(LiquidityPageActions.requestWithdrawApproval());
  };
  useEffect(() => {
    dispatch(LiquidityPageActions.checkForWithdrawApproval());
    return () => {
      dispatch(LiquidityPageActions.setTokensAreApproved(false));
    };
  }, []);

  return (
    <OutlinedButton
      disabled={areAllApproved}
      loading={isChecking}
      onClick={handleApproveClick}
      fullWidth
    >
      {t(translations.LiquidityPage.Buttons.ApproveTokens())}
    </OutlinedButton>
  );
};
