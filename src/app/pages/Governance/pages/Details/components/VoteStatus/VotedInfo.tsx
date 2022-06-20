import { FC } from "react";
import { useSelector } from "react-redux";
import { styled, Typography } from "@mui/material";
import { useTranslation } from "react-i18next";

import { translations } from "locales/i18n";
import { CssVariables } from "styles/cssVariables/cssVariables";
import { GovernanceSelectors } from "app/containers/BlockChain/Governance/selectors";
import { ProposalState } from "app/containers/BlockChain/Governance/types";
import { GovernancePageSelectors } from "app/pages/Governance/selectors";

export const VotedInfo: FC = () => {
  const { t } = useTranslation();

  const receipt = useSelector(GovernanceSelectors.receipt);
  const proposal = useSelector(GovernancePageSelectors.selectedProposal);

  const supportingOption = receipt?.support;
  const hasVoted = receipt?.hasVoted || false;
  const bg = !hasVoted
    ? CssVariables.secondary
    : supportingOption
    ? CssVariables.green
    : CssVariables.red;
  const longMessage = t(
    translations.GovernancePage.youVotedForAgainstThisProposalWithAmountGovernanceToken(),
    {
      forAgainst: supportingOption
        ? t(translations.GovernancePage.Yes())
        : t(translations.GovernancePage.No()),
    }
  );
  const message = hasVoted
    ? longMessage
    : proposal?.proposal_state === ProposalState.Active
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
