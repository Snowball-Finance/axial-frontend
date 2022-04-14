import { useDispatch, useSelector } from "react-redux";
import { SnowModal } from "app/components/common/modal";
import { DepositModal } from "app/pages/Liquidity/components/modal/Deposit";
import { LiquidityPageSelectors } from "app/pages/Liquidity/selectors";
import { LiquidityPageActions } from "app/pages/Liquidity/slice";
import { FC } from "react";
import { useTranslation } from "react-i18next";
import { translations } from "locales/i18n";
import { Approving } from "app/components/common/Approving";
import { Depositing } from "app/components/common/Depositing";
import { globalSelectors } from "app/appSelectors";
import { GlobalActions } from "store/slice";
import { TransactionSuccess } from "app/components/common/TransactionStatus";
import { RewardsSelectors } from "app/containers/Rewards/selectors";

export const DepositConfirmationModal: FC = () => {
  const { t } = useTranslation();

  const dispatch = useDispatch();
  const data = useSelector(LiquidityPageSelectors.depositTransactionData);
  const isApprovingTokens = useSelector(
    LiquidityPageSelectors.isApprovingTokens
  );
  const isDepositing = useSelector(RewardsSelectors.isDepositing);
  const transactionSuccessId = useSelector(
    globalSelectors.transactionSuccessId
  );

  const handleClose = () => {
    if (transactionSuccessId) {
      dispatch(GlobalActions.setTransactionSuccessId(undefined));
    }
    dispatch(LiquidityPageActions.setDepositTransactionData(undefined));
  };

  const renderModal = () => {
    if (transactionSuccessId) {
      return <TransactionSuccess />;
    } else if (isDepositing) {
      return <Depositing />;
    } else if (isApprovingTokens) {
      return <Approving />;
    } else {
      return <DepositModal />;
    }
  };

  const modalTitle = transactionSuccessId
    ? t(translations.SwapPage.ReviewSwap.TransactionStatus())
    : isDepositing
    ? t(translations.Common.Depositing())
    : isApprovingTokens
    ? t(translations.Common.Approving())
    : t(translations.LiquidityPage.Modal.ReviewDeposit());

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
