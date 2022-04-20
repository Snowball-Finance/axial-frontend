import { FC } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useTranslation } from "react-i18next";

import { translations } from "locales/i18n";
import { SnowModal } from "app/components/common/modal";
import { ClaimRewardsModal } from "../modal/ClaimRewards";
import { RewardsPageSelectors } from "../../selectors";
import { RewardsPageActions } from "../../slice";

export const ClaimConfirmationModal: FC = () => {
  const { t } = useTranslation();

  const dispatch = useDispatch();
  const open = useSelector(RewardsPageSelectors.isClaimModalOpen);

  const handleClose = () => {
    dispatch(RewardsPageActions.setIsClaimModalOpen(false));
  };

  return (
    <SnowModal
      isOpen={open}
      onClose={handleClose}
      title={t(translations.RewardsPage.Modal.ClaimableTokens())}
    >
      <ClaimRewardsModal />
    </SnowModal>
  );
};
