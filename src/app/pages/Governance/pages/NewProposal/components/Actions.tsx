import { FC } from "react";
import { useDispatch, useSelector } from "react-redux";
// import { useTranslation } from "react-i18next";

// import { translations } from "locales/i18n";
import { GovernanceSelectors } from "app/containers/BlockChain/Governance/selectors";
import { ContainedButton } from "app/components/common/buttons/containedButton";
import { GovernancePageSelectors } from "app/pages/Governance/selectors";
import { GovernancePageActions } from "app/pages/Governance/slice";

export const Actions: FC = () => {
  //   const { t } = useTranslation();
  
  const dispatch = useDispatch();
  const fields = useSelector(GovernancePageSelectors.selectNewProposalFields);
  const isLoading = useSelector(GovernanceSelectors.isSubmittingNewProposal);

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
      onClick={handleSubmitButton}
    >
      Submit proposal
    </ContainedButton>
  );
};
