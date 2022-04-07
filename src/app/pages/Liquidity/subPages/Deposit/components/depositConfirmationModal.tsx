import { useDispatch, useSelector } from "react-redux";
import { SnowModal } from "app/components/common/modal";
import { DepositModal } from "app/pages/Liquidity/components/modal/Deposit";
import { LiquidityPageSelectors } from "app/pages/Liquidity/selectors";
import { LiquidityPageActions } from "app/pages/Liquidity/slice";
import { FC } from "react";
import { useTranslation } from "react-i18next";
import { translations } from "locales/i18n";

export const DepositConfirmationModal: FC = () => {
  const { t } = useTranslation();

  const dispatch = useDispatch();
  const data = useSelector(LiquidityPageSelectors.depositTransactionData);
  const handleClose = () => {
    dispatch(LiquidityPageActions.setDepositTransactionData(undefined));
  };
  return (
    <SnowModal
      isOpen={data !== undefined}
      onClose={handleClose}
      title={t(translations.LiquidityPage.Modal.ReviewDeposit())}
    >
      <DepositModal />
    </SnowModal>
  );
};
