import { FC } from "react";
import { Grid } from "@mui/material";

import { PrimaryCardWrapper } from "app/components/wrappers/PrimaryCard";
import { Title } from "./Title";
import { Description } from "./Description";
import { Execution } from "../Execution";
import { ExecutionList } from "../ExecutionList";

export const ProposalInfo: FC = () => {
  return (
    <PrimaryCardWrapper>
      <Grid container spacing={2} direction="column">
        <Grid item>
          <Title />
        </Grid>

        <Grid item>
          <Description />
        </Grid>

        <Grid item>
          <ExecutionList />
        </Grid>

        <Grid item>
          <Execution />
        </Grid>
      </Grid>
    </PrimaryCardWrapper>
  );
};
