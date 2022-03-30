import { useDispatch, useSelector } from "react-redux";

import { SnowModal } from "app/components/common/modal";
import { WithdrawModal } from "app/pages/Liquidity/components/modal/Withdraw";
import { LiquidityPageSelectors } from "app/pages/Liquidity/selectors";
import { LiquidityPageActions } from "app/pages/Liquidity/slice";

export const WithdrawConfirmation = () => {
  const dispatch = useDispatch();

  const data = useSelector(LiquidityPageSelectors.withdrawReviewData);

  const handleClose = () => {
    dispatch(LiquidityPageActions.setWithdrawReviewData(undefined));
  };

  return (
    <SnowModal isOpen={data !== undefined} onClose={handleClose}>
      <WithdrawModal />
    </SnowModal>
  );
};
