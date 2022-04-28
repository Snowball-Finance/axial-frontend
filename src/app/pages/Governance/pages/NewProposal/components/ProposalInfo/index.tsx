import { FC } from "react";
import { Grid } from "@mui/material";

import { PrimaryCardWrapper } from "app/components/wrappers/PrimaryCard";
import { Title } from "./Title";
import { Description } from "./Description";
import { Execution } from "../Execution";
import { ExecutionList } from "../ExecutionList";
import { SubmitButton } from "../SubmitButton";
import { Message } from "../Message";

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

        <Grid item>
          <Grid container spacing={2} alignItems="center">
            <Grid item>
              <SubmitButton />
            </Grid>

            <Grid item>
              <Message />
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </PrimaryCardWrapper>
  );
};
