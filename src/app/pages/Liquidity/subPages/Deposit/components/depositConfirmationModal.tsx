import { SnowModal } from "app/components/common/modal";
import { DepositModal } from "app/pages/Liquidity/components/modal/Deposit";
import { LiquidityPageSelectors } from "app/pages/Liquidity/selectors";
import { LiquidityPageActions } from "app/pages/Liquidity/slice";
import { FC } from "react";
import { useDispatch, useSelector } from "react-redux";

export const DepositConfirmationModal: FC = () => {
  const dispatch = useDispatch();
  const open = useSelector(LiquidityPageSelectors.depositConfirmationData);
  const handleClose = () => {
    dispatch(LiquidityPageActions.setDepositConfirmationData(undefined));
  };
  return (
    <SnowModal isOpen={open} onClose={handleClose}>
      <DepositModal />
    </SnowModal>
  );
};
