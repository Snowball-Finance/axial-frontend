import { Grid, styled } from "@mui/material";
import { Max1040 } from "app/components/wrappers/max1040";
import { FC } from "react";
import { VotingPowerInfo } from "../Proposals/components/VotingPowerInfo";
import { DocLinksAndInfo } from "./components/DocLinksAndInfo";
import { ProposalDescription } from "./components/ProposalDescription";
import { ProposalDetails } from "./components/ProposalDetails";
import { VoteOptions } from "./components/VoteOptions";

export const Details: FC = () => {
  return (
    <StyledMax1040>
      <Grid container direction="column" spacing={4}>
        <Grid item>
          <ProposalDetails />
        </Grid>

        <Grid item>
          <VotingPowerInfo />
        </Grid>

        <Grid item>
          <VoteOptions />
        </Grid>

        <Grid item>
          <DocLinksAndInfo />
        </Grid>

        <Grid item>
          <ProposalDescription />
        </Grid>
      </Grid>
    </StyledMax1040>
  );
};

const StyledMax1040 = styled(Max1040)(() => ({
  margin: "0 auto",
}));
