import { FC } from "react";
import { Grid, styled } from "@mui/material";

import { PrimaryCardWrapper } from "app/components/wrappers/PrimaryCard";
import { Title } from "./Title";
import { Description } from "./Description";
import { Execution } from "../Execution";
import { ExecutionList } from "../ExecutionList";
import { SubmitButton } from "../SubmitButton";
import { mobile } from "styles/media";

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
          <StyledContainer container spacing={2}>
            <StyledFullContainer item>
              <SubmitButton />
            </StyledFullContainer>

            <StyledFullContainer item></StyledFullContainer>
          </StyledContainer>
        </Grid>
      </Grid>
    </PrimaryCardWrapper>
  );
};

const StyledContainer = styled(Grid)(() => ({
  alignItems: "center",

  [mobile]: {
    flexDirection: "column",
  },
}));

const StyledFullContainer = styled(Grid)(() => ({
  [mobile]: {
    width: "100%",
  },
}));
