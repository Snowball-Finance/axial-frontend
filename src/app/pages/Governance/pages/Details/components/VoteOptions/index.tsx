import { FC } from "react";
import { Grid, styled, Typography } from "@mui/material";
import { useTranslation } from "react-i18next";

import { translations } from "locales/i18n";
import { CssVariables } from "styles/cssVariables/cssVariables";
import { PrimaryCardWrapper } from "app/components/wrappers/PrimaryCard";
import { VoteButtons } from "./VoteButtons";
import { ExecutionContext } from "./ExecutionContext";
import { Proposal } from "app/containers/BlockChain/Governance/types";

interface Props {
  proposal: Proposal;
}

export const VoteOptions: FC<Props> = ({ proposal }) => {
  const { t } = useTranslation();
  let isForAgainstType = true;

  if (proposal?.execution_contexts.length > 1) {
    isForAgainstType = false;
  }

  return (
    <Grid container spacing={1} direction="column">
      <Grid item>
        <Text variant="h2">{t(translations.GovernancePage.VoteOptions())}</Text>
      </Grid>

      <Grid item>
        <PrimaryCardWrapper>
          {isForAgainstType ? (
            <VoteButtons proposal={proposal} />
          ) : (
            <ExecutionContext />
          )}
        </PrimaryCardWrapper>
      </Grid>
    </Grid>
  );
};

const Text = styled(Typography)({
  color: CssVariables.white,
  textTransform: "uppercase",
});
