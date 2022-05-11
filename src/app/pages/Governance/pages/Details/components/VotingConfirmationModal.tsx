import { FC } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useTranslation } from "react-i18next";

import { translations } from "locales/i18n";
import { SnowModal } from "app/components/common/modal";
import { globalSelectors } from "app/appSelectors";
import { GlobalActions } from "store/slice";
import { TransactionSuccess } from "app/components/common/TransactionStatus";
import { VotingModal } from "app/pages/Governance/components/modal/Voting";
import { GovernancePageSelectors } from "app/pages/Governance/selectors";
import { GovernancePageActions } from "app/pages/Governance/slice";

export const VotingConfirmationModal: FC = () => {
  const { t } = useTranslation();

  const dispatch = useDispatch();
  const open = useSelector(GovernancePageSelectors.selectIsModalOpen);
  const transactionSuccessId = useSelector(
    globalSelectors.transactionSuccessId
  );

  const handleClose = () => {
    if (transactionSuccessId) {
      dispatch(GlobalActions.setTransactionSuccessId(undefined));
    }
    dispatch(GovernancePageActions.setIsModalOpen(false));
  };

  const renderModal = () => {
    if (transactionSuccessId) {
      return <TransactionSuccess />;
    } else {
      return <VotingModal />;
    }
  };

  const modalTitle = transactionSuccessId
    ? t(translations.SwapPage.ReviewSwap.TransactionStatus())
    : t(translations.GovernancePage.Voting());

  return (
    <SnowModal isOpen={open} onClose={handleClose} title={modalTitle}>
      {renderModal()}
    </SnowModal>
  );
};
