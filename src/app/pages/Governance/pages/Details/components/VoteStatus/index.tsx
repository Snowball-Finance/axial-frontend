import { FC } from "react";
import { Grid } from "@mui/material";

import { VotedInfo } from "./VotedInfo";
import { ChangeYourVote } from "./ChangeYourVote";

export const VoteStatus: FC = () => {
  return (
    <Grid container direction="column" spacing={2}>
      <Grid item>
        <VotedInfo />
      </Grid>

      <Grid item>
        <ChangeYourVote />
      </Grid>
    </Grid>
  );
};
