import { useDispatch, useSelector } from "react-redux";
import { useTranslation } from "react-i18next";

import { translations } from "locales/i18n";
import { SnowModal } from "app/components/common/modal";
import { WithdrawModal } from "app/pages/Liquidity/components/modal/Withdraw";
import { LiquidityPageSelectors } from "app/pages/Liquidity/selectors";
import { LiquidityPageActions } from "app/pages/Liquidity/slice";
import { globalSelectors } from "app/appSelectors";
import { GlobalActions } from "store/slice";
import { TransactionSuccess } from "app/components/common/TransactionStatus";
import { Approving } from "app/components/common/Approving";

export const WithdrawConfirmation = () => {
  const { t } = useTranslation();

  const dispatch = useDispatch();

  const data = useSelector(LiquidityPageSelectors.withdrawReviewData);
  const isApprovingTokens = useSelector(
    LiquidityPageSelectors.isApprovingTokens
  );
  const transactionSuccessId = useSelector(
    globalSelectors.transactionSuccessId
  );

  const handleClose = () => {
    if (transactionSuccessId) {
      dispatch(GlobalActions.setTransactionSuccessId(undefined));
    }
    dispatch(LiquidityPageActions.setWithdrawReviewData(undefined));
  };

  const renderModal = () => {
    if (transactionSuccessId) {
      return <TransactionSuccess />;
    } else if (isApprovingTokens) {
      return <Approving />;
    } else {
      return <WithdrawModal />;
    }
  };

  const modalTitle = transactionSuccessId
    ? t(translations.SwapPage.ReviewSwap.TransactionStatus())
    : isApprovingTokens
    ? t(translations.Common.Approving())
    : t(t(translations.LiquidityPage.Modal.ReviewWithdraw()));

  return (
    <SnowModal
      isOpen={data !== undefined}
      onClose={handleClose}
      title={modalTitle}
    >
      {renderModal()}
    </SnowModal>
  );
};
