import { useDispatch, useSelector } from "react-redux";

import { SnowModal } from "app/components/common/modal";
import { WithdrawModal } from "app/pages/Rewards/components/modal/Withdraw";
import { RewardsPageSelectors } from "app/pages/Rewards/selectors";
import { RewardsPageActions } from "app/pages/Rewards/slice";
import { globalSelectors } from "app/appSelectors";

export const WithdrawConfirmationModal = () => {
  const dispatch = useDispatch();

  const withdrawConfirmationOpen = useSelector(
    RewardsPageSelectors.withdrawConfirmationOpen
  );
  const tokensInQueue = useSelector(globalSelectors.tokensInQueueToApprove);

  const handleClose = () => {
    dispatch(RewardsPageActions.setWithdrawConfirmationOpen(false));
  };

  const isModalOpen =
    withdrawConfirmationOpen && Object.keys(tokensInQueue).length > 0;

  return (
    <SnowModal isOpen={isModalOpen} onClose={handleClose}>
      <WithdrawModal />
    </SnowModal>
  );
};
