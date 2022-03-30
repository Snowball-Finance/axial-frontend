import { SnowModal } from "app/components/common/modal";
import { DepositModal } from "app/pages/Liquidity/components/modal/Deposit";
import { LiquidityPageSelectors } from "app/pages/Liquidity/selectors";
import { LiquidityPageActions } from "app/pages/Liquidity/slice";
import { FC } from "react";
import { useDispatch, useSelector } from "react-redux";

export const DepositConfirmationModal: FC = () => {
  const dispatch = useDispatch();
  const data = useSelector(LiquidityPageSelectors.depositTransactionData);
  const handleClose = () => {
    dispatch(LiquidityPageActions.setDepositTransactionData(undefined));
  };
  return (
    <SnowModal isOpen={data !== undefined} onClose={handleClose}>
      <DepositModal />
    </SnowModal>
  );
};
