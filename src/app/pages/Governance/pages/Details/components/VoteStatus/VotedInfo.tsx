import { FC } from "react";
import { useSelector } from "react-redux";
import { styled, Typography } from "@mui/material";
import { useTranslation } from "react-i18next";

import { translations } from "locales/i18n";
import { CssVariables } from "styles/cssVariables/cssVariables";
import { GovernanceSelectors } from "app/containers/BlockChain/Governance/selectors";
import {
  Proposal,
  ProposalState,
} from "app/containers/BlockChain/Governance/types";
import { formatNumber } from "common/format";
import { env } from "environment";

interface Props {
  proposal: Proposal;
}

export const VotedInfo: FC<Props> = ({ proposal }) => {
  const { t } = useTranslation();

  const receipt = useSelector(GovernanceSelectors.receipt);

  const isFor = receipt?.support || false;
  const hasVoted = receipt?.hasVoted || false;
  const bg = !hasVoted
    ? CssVariables.mildYellow
    : isFor
    ? CssVariables.green
    : CssVariables.red;
  const longMessage = t(
    translations.GovernancePage.youVotedForAgainstThisProposalWithAmountGovernanceToken(),
    {
      forAgainst: isFor
        ? t(translations.GovernancePage.For())
        : t(translations.GovernancePage.Against()),
      amount: formatNumber(Number(receipt?.votes) || 0, 2),
      name: env.GOVERNANCE_TOKEN_NAME,
    }
  );
  const message = hasVoted
    ? longMessage
    : proposal.proposal_state === ProposalState.Active
    ? t(translations.GovernancePage.YouHaventVotedOnThisProposalYet())
    : t(translations.GovernancePage.YouDidntVoteOnThisProposal());

  return (
    <StyledContainer {...{ bg }}>
      <Text variant="body1" align="center">
        {message}
      </Text>
    </StyledContainer>
  );
};

const StyledContainer = styled("div")<{
  bg: CssVariables;
}>(({ bg }) => ({
  backgroundColor: bg,
  width: "100%",
  padding: "14px 36px",
  borderRadius: "20px",
}));

const Text = styled(Typography)({
  color: CssVariables.white,
});
