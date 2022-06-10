import { FC } from "react";
import { Grid, styled, Typography } from "@mui/material";
import { useSelector } from "react-redux";
import { useTranslation } from "react-i18next";

import { translations } from "locales/i18n";
import { CssVariables } from "styles/cssVariables/cssVariables";
import { Info } from "./Info";
import { GovernancePageSelectors } from "app/pages/Governance/selectors";
import { PrimaryCardWrapper } from "app/components/wrappers/PrimaryCard";
import { VoteOptionsStatus } from "./VoteStatus";

export const ProposalDetails: FC = () => {
  const { t } = useTranslation();

  const proposal = useSelector(GovernancePageSelectors.selectedProposal);

  return (
    <PrimaryCardWrapper>
      <Grid container spacing={1}>
        <Grid item xs={12}>
          <Text variant="body1">
            {t(translations.GovernancePage.ProposalNumber(), {
              number: proposal?.governance_id,
            })}
          </Text>
        </Grid>

        <Grid item xs={12} xl={10}>
          <Title variant="h2">{proposal?.title}</Title>
        </Grid>

        <Grid item xs={12} xl={8}>
          <Grid container spacing={2}>
            <Grid item xs={12} xl={6}>
              <Info />
            </Grid>
            <Grid item xs={12} xl={6}>
              <VoteOptionsStatus />
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
