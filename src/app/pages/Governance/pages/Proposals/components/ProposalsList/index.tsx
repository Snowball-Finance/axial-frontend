import { FC } from "react";
import { Grid } from "@mui/material";
import { ProposalListItem } from "./ProposalListItem";

export const ProposalsList: FC = () => {
  return (
    <Grid container spacing={2} direction="column">
      <Grid item>
        <ProposalListItem />
      </Grid>

      <Grid item>
        <ProposalListItem />
      </Grid>
    </Grid>
  );
};
