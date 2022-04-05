import { FC } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useTranslation } from "react-i18next";

import { translations } from "locales/i18n";
import { ReviewModal } from "app/pages/Swap/components/modal/Review";
import { SwapPageSelectors } from "app/pages/Swap/selectors";
import { SwapPageActions } from "app/pages/Swap/slice";
import { SnowModal } from "app/components/common/modal";
import { SwapSelectors } from "app/containers/Swap/selectors";
import { globalSelectors } from "app/appSelectors";
import { TransactionSuccess } from "./modal/components/TransactionSuccess";
import { Approving } from "./modal/components/Approving";
import { GlobalActions } from "store/slice";

export const ReviewConfirmationModal: FC = () => {
  const { t } = useTranslation();

  const data = useSelector(SwapPageSelectors.reviewSwapConfirmationData);
  const isApproving = useSelector(SwapSelectors.selectIsApproving);
  const transactionSuccessId = useSelector(
    globalSelectors.transactionSuccessId
  );

  const dispatch = useDispatch();

  const handleClose = () => {
    if (transactionSuccessId) {
      dispatch(GlobalActions.setTransactionSuccessId(undefined));
    } else {
      dispatch(SwapPageActions.setReviewSwapConfirmationData(undefined));
    }
  };

  const modalTitle = transactionSuccessId
    ? t(translations.SwapPage.ReviewSwap.TransactionStatus())
    : isApproving
    ? t(translations.SwapPage.ReviewSwap.Approving())
    : t(translations.SwapPage.ReviewSwap.Title());

  const renderModal = () => {
    if (transactionSuccessId) {
      return <TransactionSuccess />;
    } else if (isApproving) {
      return <Approving />;
    } else {
      return <ReviewModal />;
    }
  };

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
