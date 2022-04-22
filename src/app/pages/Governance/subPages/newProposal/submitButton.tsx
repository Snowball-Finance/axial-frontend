import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import React from "react";
import { GovernanceSelectors } from "app/containers/BlockChain/Governance/selectors";
import { ContainedButton } from "app/components/common/buttons/containedButton";
import { translations } from "locales/i18n";
import { GovernancePageSelectors } from "../../selectors";
import { GovernancePageActions } from "../../slice";

export const NewProposalSubmitButton = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const fields = useSelector(GovernancePageSelectors.selectNewProposalFields);
  const isLoading = useSelector(
    GovernanceSelectors.selectIsSubmittingNewProposal
  );

  const handleSubmitButton = () => {
    dispatch(GovernancePageActions.submitNewProposal());
  };

  const { title, votingPeriod, description } = fields;
  const disabled = !title || !votingPeriod || !description;
  return (
    <ContainedButton
      loading={isLoading}
      disabled={disabled}
      height={48}
      width={85}
      onClick={handleSubmitButton}
    >
      {t(translations.Common.Submit())}
    </ContainedButton>
  );
};
