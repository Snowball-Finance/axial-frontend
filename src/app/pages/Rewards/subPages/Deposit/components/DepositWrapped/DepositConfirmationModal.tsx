import { useDispatch, useSelector } from "react-redux";

import { SnowModal } from "app/components/common/modal";
import { DepositModal } from "app/pages/Rewards/components/modal/Deposit";
import { RewardsPageActions } from "app/pages/Rewards/slice";
import { RewardsPageSelectors } from "app/pages/Rewards/selectors";
import { globalSelectors } from "app/appSelectors";

export const DepositConfirmationModal = () => {
  const dispatch = useDispatch();

  const depositConfirmationOpen = useSelector(
    RewardsPageSelectors.depositConfirmationOpen
  );
  const tokensInQueue = useSelector(globalSelectors.tokensInQueueToApprove);

  const handleClose = () => {
    dispatch(RewardsPageActions.setDepositConfirmationOpen(false));
  };

  const isModalOpen =
    depositConfirmationOpen && Object.keys(tokensInQueue).length > 0;

  return (
    <SnowModal isOpen={isModalOpen} onClose={handleClose}>
      <DepositModal />
    </SnowModal>
  );
};
