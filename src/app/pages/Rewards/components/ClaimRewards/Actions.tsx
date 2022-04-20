import React, { FC } from "react";
import { useTranslation } from "react-i18next";

import { translations } from "locales/i18n";
import { ContainedButton } from "app/components/common/buttons/containedButton";
import { useDispatch } from "react-redux";
import { RewardsPageActions } from "../../slice";
import { ClaimConfirmationModal } from "./ClaimConfirmationModal";

export const Actions: FC = () => {
  const { t } = useTranslation();

  const dispatch = useDispatch();

  const handleClick = () => {
    dispatch(RewardsPageActions.setIsClaimModalOpen(true));
  };

  return (
    <>
      <ClaimConfirmationModal />
      <ContainedButton fullWidth onClick={handleClick}>
        {t(translations.RewardsPage.ActionButtons.ClaimRewards())}
      </ContainedButton>
    </>
  );
};
