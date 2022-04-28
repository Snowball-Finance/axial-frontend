import { FC } from "react";
import { Grid, styled, Typography } from "@mui/material";
import { useTranslation } from "react-i18next";

import { translations } from "locales/i18n";
import { CssVariables } from "styles/cssVariables/cssVariables";
import { PrimaryCardWrapper } from "app/components/wrappers/PrimaryCard";
import { Info } from "./Info";
import { DetailsButton } from "./DetailsButton";
import { Proposal } from "app/containers/BlockChain/Governance/types";

interface ProposalListItemProps {
  proposal: Proposal;
  short?: boolean;
}

export const ProposalListItem: FC<ProposalListItemProps> = ({
  proposal,
  short,
}) => {
  const { t } = useTranslation();

  return (
    <PrimaryCardWrapper>
      <Grid container direction="column" spacing={1}>
        <Grid item>
          <Text variant="body1">
            {t(translations.GovernancePage.ProposalNumber(), {
              number: proposal.governance_id,
            })}
          </Text>
        </Grid>

        <Grid item>
          <Grid container alignItems="flex-end" justifyContent="space-between">
            <Grid item xs={8}>
              <Grid container spacing={2}>
                <Grid item>
                  <Title variant="h2">{proposal.title}</Title>
                </Grid>
                <Grid item>
                  <Info proposal={proposal} />
                </Grid>
              </Grid>
            </Grid>

            <Grid item>
              <DetailsButton proposal={proposal} />
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </PrimaryCardWrapper>
  );
};

const Title = styled(Typography)({
  color: CssVariables.white,
  textTransform: "uppercase",
});

const Text = styled(Typography)({
  color: CssVariables.white,
});
