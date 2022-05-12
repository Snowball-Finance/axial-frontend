import { FC } from "react";
import { Grid, styled, Typography } from "@mui/material";
import { useSelector } from "react-redux";
import { useTranslation } from "react-i18next";

import { translations } from "locales/i18n";
import { CssVariables } from "styles/cssVariables/cssVariables";
import { PrimaryCardWrapper } from "app/components/wrappers/PrimaryCard";
import { VoteButtons } from "./VoteButtons";
import { ExecutionContext } from "./ExecutionContext";
import { GovernancePageSelectors } from "app/pages/Governance/selectors";

export const VoteOptions: FC = () => {
  const { t } = useTranslation();

  const proposal = useSelector(GovernancePageSelectors.selectedProposal);
  let isForAgainstType = true;

  if (proposal && proposal.execution_contexts.length > 1) {
    isForAgainstType = false;
  }

  return (
    <Grid container spacing={1}>
      <Grid item xs={12}>
        <Text variant="h2">{t(translations.GovernancePage.VoteOptions())}</Text>
      </Grid>

      <Grid item xs={12}>
        <PrimaryCardWrapper>
          {isForAgainstType ? <VoteButtons /> : <ExecutionContext />}
        </PrimaryCardWrapper>
      </Grid>
    </Grid>
  );
};

const Text = styled(Typography)({
  color: CssVariables.white,
  textTransform: "uppercase",
});
