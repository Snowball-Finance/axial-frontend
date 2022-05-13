import { FC } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useTranslation } from "react-i18next";

import { translations } from "locales/i18n";
import { SnowModal } from "app/components/common/modal";
import { ClaimRewardsModal } from "../modal/ClaimRewards";
import { RewardsPageSelectors } from "../../selectors";
import { RewardsPageActions } from "../../slice";
import { Pool } from "app/containers/Rewards/types";

interface Props {
  pool?: Pool;
}

export const ClaimConfirmationModal: FC<Props> = ({ pool }) => {
  const { t } = useTranslation();

  const dispatch = useDispatch();
  const open = useSelector(RewardsPageSelectors.tokensToClaim).length > 0;

  const handleClose = () => {
    dispatch(RewardsPageActions.setTokensToClaim([]));
  };

  return (
    <SnowModal
      isOpen={open}
      onClose={handleClose}
      title={t(translations.RewardsPage.Modal.ClaimableTokens())}
    >
      <ClaimRewardsModal pool={pool} />
    </SnowModal>
  );
};
