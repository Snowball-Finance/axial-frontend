import React, { FC } from "react";
import { useTranslation } from "react-i18next";

import { translations } from "locales/i18n";
import { ContainedButton } from "app/components/common/buttons/containedButton";
import { useDispatch, useSelector } from "react-redux";
import { RewardsPageActions } from "../../slice";
import { ClaimConfirmationModal } from "./ClaimConfirmationModal";
import { PoolsAndGaugesSelectors } from "app/containers/PoolsAndGauges/selectors";
import { RewardsPageSelectors } from "../../selectors";

export const Actions: FC = () => {
  const { t } = useTranslation();
  const pool = useSelector(RewardsPageSelectors.selectedPool);
  const key = pool?.key;
  const harvestables = useSelector(
    PoolsAndGaugesSelectors.harvestableTokensOfPool(key)
  );

  const dispatch = useDispatch();

  const handleClick = () => {
    dispatch(RewardsPageActions.setTokensToClaim(harvestables));
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
