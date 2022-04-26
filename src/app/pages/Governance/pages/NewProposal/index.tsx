import { FC } from "react";
import { styled, Grid } from "@mui/material";

import { Max1040 } from "app/components/wrappers/max1040";
import { VotingPowerInfo } from "../Proposals/components/VotingPowerInfo";
import { DocsLinkAndPeriod } from "./components/DocsLinkAndPeriod";
import { ProposalInfo } from "./components/ProposalInfo";
import { Actions } from "./components/Actions";
import { Message } from "./components/Message";

export const NewProposal: FC = () => {
  return (
    <StyledMax1040>
      <Grid container spacing={4} direction="column">
        <Grid item>
          <VotingPowerInfo />
        </Grid>

        <Grid item>
          <DocsLinkAndPeriod />
        </Grid>

        <Grid item>
          <ProposalInfo />
        </Grid>

        <Grid item>
          <Grid container spacing={2} alignItems="center">
            <Grid item>
              <Actions />
            </Grid>

            <Grid item>
              <Message />
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </StyledMax1040>
  );
};

const StyledMax1040 = styled(Max1040)(() => ({
  margin: "0 auto",
}));
