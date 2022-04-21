import { FC } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useTranslation } from "react-i18next";

import { translations } from "locales/i18n";
import { SnowModal } from "app/components/common/modal";
import { WithdrawModal } from "app/pages/Rewards/components/modal/Withdraw";
import { RewardsPageSelectors } from "app/pages/Rewards/selectors";
import { globalSelectors } from "app/appSelectors";
import { GlobalActions } from "store/slice";
import { TransactionSuccess } from "app/components/common/TransactionStatus";
import { RewardsPageActions } from "app/pages/Rewards/slice";

export const WithdrawConfirmationModal: FC = () => {
  const { t } = useTranslation();

  const dispatch = useDispatch();
  const open = useSelector(RewardsPageSelectors.isModalOpen);
  const transactionSuccessId = useSelector(
    globalSelectors.transactionSuccessId
  );

  const handleClose = () => {
    if (transactionSuccessId) {
      dispatch(GlobalActions.setTransactionSuccessId(undefined));
    }
    dispatch(RewardsPageActions.setIsModalOpen(false));
  };

  const renderModal = () => {
    if (transactionSuccessId) {
      return <TransactionSuccess />;
    } else {
      return <WithdrawModal />;
    }
  };

  const modalTitle = transactionSuccessId
    ? t(translations.SwapPage.ReviewSwap.TransactionStatus())
    : t(translations.Common.Withdrawing());

  return (
    <SnowModal isOpen={open} onClose={handleClose} title={modalTitle}>
      {renderModal()}
    </SnowModal>
  );
};