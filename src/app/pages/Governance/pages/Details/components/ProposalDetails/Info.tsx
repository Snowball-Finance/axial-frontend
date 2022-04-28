import { FC } from "react";
import { Grid, styled, Typography } from "@mui/material";
import { useTranslation } from "react-i18next";

import { translations } from "locales/i18n";
import { CssVariables } from "styles/cssVariables/cssVariables";
import {
  Proposal,
  ProposalState,
} from "app/containers/BlockChain/Governance/types";

interface Props {
  proposal: Proposal;
}

export const Info: FC<Props> = ({ proposal }) => {
  const { t } = useTranslation();

  return (
    <Grid container>
      <Grid item>
        <TextUnderline variant="body1">Proposal information</TextUnderline>
      </Grid>

      <Grid item container justifyContent="space-between" alignItems="center">
        <Grid item>
          <Text variant="body1">{t(translations.GovernancePage.Status())}</Text>
        </Grid>

        <Grid item>
          <Text variant="body2">
            {proposal.proposal_state !== undefined && (
              <Text variant="body2">
                {proposal.proposal_state === ProposalState.PendingExecution
                  ? ProposalState.ReadyForExecution.toString()
                  : proposal.proposal_state.toString()}
              </Text>
            )}
          </Text>
        </Grid>
      </Grid>

      <Grid item container justifyContent="space-between" alignItems="center">
        <Grid item>
          <Text variant="body1">
            {t(translations.GovernancePage.Proposedby())}
          </Text>
        </Grid>

        <Grid item>
          <Text variant="body2">
            {proposal.proposer.substring(0, 6) +
              "..." +
              proposal.proposer.substring(
                proposal.proposer.length - 4,
                proposal.proposer.length
              )}
          </Text>
        </Grid>
      </Grid>

      <Grid item container justifyContent="space-between" alignItems="center">
        <Grid item>
          <Text variant="body1">{t(translations.GovernancePage.Date())}</Text>
        </Grid>

        <Grid item>
          <Text variant="body2">
            {new Date(proposal.start_date).toLocaleString()}
          </Text>
        </Grid>
      </Grid>
    </Grid>
  );
};

const Text = styled(Typography)({
  color: CssVariables.white,
});

const TextUnderline = styled(Typography)({
  color: CssVariables.white,
  textDecoration: "underline",
});
