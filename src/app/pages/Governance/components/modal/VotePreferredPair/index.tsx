import { FC } from "react";
import { Box, Grid, styled } from "@mui/material";

import { HeaderText } from "./HeaderText";
import { Selection } from "./Selection";
import { FitActions } from "./FitActions";
import { Message } from "./Message";
import { SubmitVoteButton } from "./SubmitVoteButton";

export const VotePreferredPairModal: FC = () => {
  return (
    <Box mt={5}>
      <StyledContainer container direction="column" spacing={2}>
        <Grid item>
          <HeaderText />
        </Grid>

        <Grid item>
          <Selection />
        </Grid>

        <Grid item alignSelf="flex-end">
          <FitActions />
        </Grid>

        <Grid item>
          <Message />
        </Grid>

        <Grid item>
          <SubmitVoteButton />
        </Grid>
      </StyledContainer>
    </Box>
  );
};

const StyledContainer = styled(Grid)({
  width: 650,
});
