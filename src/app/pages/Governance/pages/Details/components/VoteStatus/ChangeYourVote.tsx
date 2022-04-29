import { FC } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useTranslation } from "react-i18next";

import { translations } from "locales/i18n";
import { ContainedButton } from "app/components/common/buttons/containedButton";
import { GovernanceActions } from "app/containers/BlockChain/Governance/slice";
import { GovernanceSelectors } from "app/containers/BlockChain/Governance/selectors";
import {
  Proposal,
  ProposalState,
} from "app/containers/BlockChain/Governance/types";

interface Props {
  proposal: Proposal;
}

export const ChangeYourVote: FC<Props> = ({ proposal }) => {
  const { t } = useTranslation();
  const receipt = useSelector(GovernanceSelectors.receipt);
  const isVotingFor = useSelector(GovernanceSelectors.isVotingFor);

  const dispatch = useDispatch();
  const isFor = receipt?.support || false;
  const hasVoted = receipt?.hasVoted || false;

  const handleSwitchClick = () => {
    dispatch(GovernanceActions.vote({ proposal, voteFor: isFor ? 0 : 1 }));
  };

  const isActive = proposal.proposal_state === ProposalState.Active;

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
