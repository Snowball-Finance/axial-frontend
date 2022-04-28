import { FC } from "react";
import { Grid, styled, Typography } from "@mui/material";

import { PrimaryCardWrapper } from "app/components/wrappers/PrimaryCard";
import { CssVariables } from "styles/cssVariables/cssVariables";
import { VoteButton } from "./VoteButton";

export const VoteForPair: FC = () => {
  return (
    <PrimaryCardWrapper>
      <Grid container direction="column" spacing={2}>
        <Grid item>
          <HeaderText variant="h2">Vote for preferred pair</HeaderText>
        </Grid>

        <Grid item>
          <Text variant="body2">
            Once voted, your vote will rollover to the following week. There is
            no need to vote more than once, unless you would like to make
            changes to your original vote.
          </Text>
        </Grid>

        <Grid item>
          <VoteButton />
        </Grid>
      </Grid>
    </PrimaryCardWrapper>
  );
};

const HeaderText = styled(Typography)({
  color: CssVariables.white,
  textTransform: "uppercase",
});

const Text = styled(Typography)({
  color: CssVariables.white,
});
