import { FC } from "react";
import { useSelector } from "react-redux";

import { GovernanceSelectors } from "app/containers/BlockChain/Governance/selectors";
import { GovernancePageSelectors } from "app/pages/Governance/selectors";
import { ProposalState } from "app/containers/BlockChain/Governance/types";
import { VoteStatus } from "./VoteStatus";
import { VoteOptions } from "./VoteOptions";

export const ConditionalVoting: FC = () => {
  const receipt = useSelector(GovernanceSelectors.receipt);
  const proposal = useSelector(GovernancePageSelectors.selectedProposal);

  const multiOptional = proposal && proposal?.execution_contexts.length > 1;
  const hasVoted = receipt?.hasVoted;
  const isActive = proposal?.proposal_state === ProposalState.Active;

  return isActive ? (
    hasVoted && !multiOptional ? (
      <VoteStatus />
    ) : (
      <VoteOptions />
    )
  ) : (
    <VoteStatus />
  );
};
