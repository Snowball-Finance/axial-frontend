import { FC } from "react";
import { Grid } from "@mui/material";

import { PrimaryCardWrapper } from "app/components/wrappers/PrimaryCard";
import { DiscordProposal } from "./DiscordProposal";
import { ProposalDocument } from "./ProposalDocument";
import { Period } from "./Period";

export const DocsLinkAndPeriod: FC = () => {
  return (
    <PrimaryCardWrapper>
      <Grid container spacing={1}>
        <Grid item xs={12}>
          <DiscordProposal />
        </Grid>

        <Grid item xs={12}>
          <ProposalDocument />
        </Grid>

        <Grid item xs={12}>
          <Period />
        </Grid>
      </Grid>
    </PrimaryCardWrapper>
  );
};
