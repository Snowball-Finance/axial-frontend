import { FC } from "react";
import { Grid, styled } from "@mui/material";

import { Max1040 } from "app/components/wrappers/max1040";
import { VotingPowerInfo } from "../../components/VotingPowerInfo";
import { Filter } from "./components/Filter";
import { Message } from "./components/Message";
import { ProposalsList } from "./components/ProposalsList";
import { NewProposalButton } from "./components/NewProposalButton";
import { Navigation } from "./components/Navigation";

export const Proposals: FC = () => {
  return (
    <StyledMax1040>
      <Grid container spacing={2} direction="column">
        <Grid item>
          <Navigation />
        </Grid>

        <Grid item>
          <VotingPowerInfo />
        </Grid>

        <Grid item>
          <Grid container justifyContent="space-between" alignItems="center">
            <Grid item>
              <Filter />
            </Grid>

            <Grid item>
              <NewProposalButton />
            </Grid>
          </Grid>
        </Grid>

        <Grid item alignSelf="flex-end">
          <Message />
        </Grid>

        <Grid item>
          <ProposalsList />
        </Grid>
      </Grid>
    </StyledMax1040>
  );
};

const StyledMax1040 = styled(Max1040)(() => ({
  margin: "0 auto",
}));
