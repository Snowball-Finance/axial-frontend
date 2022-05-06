import { FC } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useTranslation } from "react-i18next";

import { translations } from "locales/i18n";
import { SnowModal } from "app/components/common/modal";
import { VotePreferredPairModal } from "app/pages/Governance/components/modal/VotePreferredPair";
import { GovernancePageSelectors } from "app/pages/Governance/selectors";
import { GovernancePageActions } from "app/pages/Governance/slice";

export const VoteConfirmationModal: FC = () => {
  const { t } = useTranslation();

  const open = useSelector(GovernancePageSelectors.isVoteAllocationModalOpen);
  const dispatch = useDispatch();

  const handleClose = () => {
    dispatch(GovernancePageActions.setIsVoteAllocationModalOpen(false));
  };

  return (
    <SnowModal
      isOpen={open}
      onClose={handleClose}
      title={t(translations.GovernancePage.VoteAllocation.VotePreferredPair())}
    >
      <VotePreferredPairModal />
    </SnowModal>
  );
};
