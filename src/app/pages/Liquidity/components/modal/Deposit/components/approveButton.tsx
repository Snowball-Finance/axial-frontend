import { OutlinedButton } from "app/components/common/buttons/outlinedButton";
import { LiquidityPageSelectors } from "app/pages/Liquidity/selectors";
import { LiquidityPageActions } from "app/pages/Liquidity/slice";
import { translations } from "locales/i18n";
import { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";

export const DepositApproveButton = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const areAllTokensApproved = useSelector(
    LiquidityPageSelectors.tokensAreApproved
  );
  const loading = useSelector(LiquidityPageSelectors.isCheckingForApproval);
  useEffect(() => {
    dispatch(LiquidityPageActions.checkIsAllTokensAreApprovedForDeposit());
    return () => {
      dispatch(LiquidityPageActions.setTokensAreApproved(false));
    };
  }, []);

  const handleApproveButtonClick = () => {
    dispatch(LiquidityPageActions.approveTokensForDeposit());
  };

  return (
    <OutlinedButton
      loading={loading}
      disabled={areAllTokensApproved}
      onClick={handleApproveButtonClick}
    >
      {t(translations.Common.Approve())}
    </OutlinedButton>
  );
};
