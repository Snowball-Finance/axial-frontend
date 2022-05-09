import { FC } from "react";
import { Grid, styled } from "@mui/material";

import { Max1040 } from "app/components/wrappers/max1040";
import { VotingPowerInfo } from "../../components/VotingPowerInfo";
import { Filter } from "./components/Filter";
import { Message } from "./components/Message";
import { ProposalsList } from "./components/ProposalsList";
import { NewProposalButton } from "./components/NewProposalButton";
import { NavigationHead } from "../../components/Navigation/NavigationHead";
import { mobile } from "styles/media";

export const Proposals: FC = () => {
  return (
    <StyledMax1040>
      <Grid container spacing={4} direction="column">
        <Grid item>
          <NavigationHead />
        </Grid>

        <Grid item>
          <VotingPowerInfo />
        </Grid>

        <Grid item>
          <StyledContainer container>
            <StyledFullContainer item>
              <Filter />
            </StyledFullContainer>

            <StyledFullContainer item>
              <NewProposalButton />
            </StyledFullContainer>
          </StyledContainer>
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

const StyledContainer = styled(Grid)(() => ({
  flexDirection: "row",
  justifyContent: "space-between",
  alignItems: "center",

  [mobile]: {
    flexDirection: "column",
    rowGap: 10,
  },
}));

const StyledFullContainer = styled(Grid)(() => ({
  [mobile]: {
    width: "100%",
  },
}));
