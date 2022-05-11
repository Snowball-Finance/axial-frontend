import { FC } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useTranslation } from "react-i18next";

import { translations } from "locales/i18n";
import { ContainedButton } from "app/components/common/buttons/containedButton";
import { GovernanceActions } from "app/containers/BlockChain/Governance/slice";
import { GovernanceSelectors } from "app/containers/BlockChain/Governance/selectors";
import { ProposalState } from "app/containers/BlockChain/Governance/types";
import { GovernancePageSelectors } from "app/pages/Governance/selectors";
import { GovernancePageActions } from "app/pages/Governance/slice";

export const ChangeYourVote: FC = () => {
  const { t } = useTranslation();
  const receipt = useSelector(GovernanceSelectors.receipt);
  const isVotingFor = useSelector(GovernanceSelectors.isVotingFor);
  const proposal = useSelector(GovernancePageSelectors.selectedProposal);

  const dispatch = useDispatch();
  const supportingOption = receipt?.support;
  const hasVoted = receipt?.hasVoted || false;

  const handleSwitchClick = () => {
    if (proposal) {
      dispatch(GovernancePageActions.setIsModalOpen(true));
      dispatch(
        GovernanceActions.vote({ proposal, voteFor: supportingOption ? 0 : 1 })
      );
    }
  };

  const isActive = proposal?.proposal_state === ProposalState.Active;

  if (!(isActive && hasVoted)) {
    return <></>;
  }

  return (
    <ContainedButton
      loading={isVotingFor !== -1}
      onClick={handleSwitchClick}
      fullWidth
    >
      {t(translations.GovernancePage.SwitchVote())}
    </ContainedButton>
  );
};
