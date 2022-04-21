import { FC } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useTranslation } from "react-i18next";

import { translations } from "locales/i18n";
import { SnowModal } from "app/components/common/modal";
import { SAxialDepositModal } from "app/pages/Staking/components/modal/sAxialDeposit";
import { StakingPageSelectors } from "app/pages/Staking/selectors";
import { globalSelectors } from "app/appSelectors";
import { GlobalActions } from "store/slice";
import { TransactionSuccess } from "app/components/common/TransactionStatus";
import { StakingPageActions } from "app/pages/Staking/slice";

export const DepositConfirmationModal: FC = () => {
  const { t } = useTranslation();

  const dispatch = useDispatch();
  const open = useSelector(StakingPageSelectors.selectIsModalOpen);
  const transactionSuccessId = useSelector(
    globalSelectors.transactionSuccessId
  );

  const handleClose = () => {
    if (transactionSuccessId) {
      dispatch(GlobalActions.setTransactionSuccessId(undefined));
    }
    dispatch(StakingPageActions.setIsModalOpen(false));
  };

  const renderModal = () => {
    if (transactionSuccessId) {
      return <TransactionSuccess />;
    } else {
      return <SAxialDepositModal />;
    }
  };

  const modalTitle = transactionSuccessId
    ? t(translations.SwapPage.ReviewSwap.TransactionStatus())
    : t(translations.Common.Depositing());

  return (
    <SnowModal isOpen={open} onClose={handleClose} title={modalTitle}>
      {renderModal()}
    </SnowModal>
  );
};
