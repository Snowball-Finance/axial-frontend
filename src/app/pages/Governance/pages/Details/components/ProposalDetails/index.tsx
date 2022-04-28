import { FC } from "react";
import { Grid, styled, Typography } from "@mui/material";
import { useTranslation } from "react-i18next";

import { translations } from "locales/i18n";
import { CssVariables } from "styles/cssVariables/cssVariables";
import { Info } from "./Info";
import { VoteStatus } from "./VoteStatus";
import { Proposal } from "app/containers/BlockChain/Governance/types";

interface Props {
  proposal: Proposal;
}

export const ProposalDetails: FC<Props> = ({ proposal }) => {
  const { t } = useTranslation();

  return (
    <StyledPoolCard>
      <Grid container spacing={1}>
        <Grid item xs={12}>
          <Text variant="body1">
            {t(translations.GovernancePage.ProposalNumber(), {
              number: proposal.governance_id,
            })}
          </Text>
        </Grid>

        <Grid item xs={10}>
          <Title variant="h2">{proposal.title}</Title>
        </Grid>

        <Grid item xs={8}>
          <Grid container spacing={2}>
            <Grid item xs={6}>
              <Info proposal={proposal} />
            </Grid>

            <Grid item xs={6}>
              <VoteStatus proposal={proposal} />
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </StyledPoolCard>
  );
};

const StyledPoolCard = styled("div")({
  backgroundColor: CssVariables.poolCardBackground,
  border: `4px solid ${CssVariables.cardBorder}`,
  borderRadius: "20px",
  padding: "20px",
});

const Title = styled(Typography)({
  color: CssVariables.white,
  textTransform: "uppercase",
});

const Text = styled(Typography)({
  color: CssVariables.white,
});
