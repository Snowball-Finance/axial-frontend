import { FC } from "react";
import { Grid, styled, Typography } from "@mui/material";
import { useTranslation } from "react-i18next";

import { translations } from "locales/i18n";
import { CssVariables } from "styles/cssVariables/cssVariables";
import {
  Proposal,
  ProposalState,
} from "app/containers/BlockChain/Governance/types";
import { dateFormat } from "app/pages/Governance/utils/date";
interface Props {
  proposal: Proposal;
}

export const Info: FC<Props> = ({ proposal }) => {
  const { t } = useTranslation();

  return (
    <Grid container>
      <Grid item container justifyContent="space-between" alignItems="center">
        <Grid item>
          <Text variant="body1">{t(translations.GovernancePage.Status())}</Text>
        </Grid>

        <Grid item>
          {proposal.proposal_state !== undefined && (
            <Text variant="body2">
              {proposal.proposal_state === ProposalState.PendingExecution
                ? ProposalState.ReadyForExecution.toString()
                : proposal.proposal_state.toString()}
            </Text>
          )}
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
          <Text variant="body2">{dateFormat(proposal.start_date)}</Text>
        </Grid>
      </Grid>
    </Grid>
  );
};

const Text = styled(Typography)({
  color: CssVariables.white,
});
