import { FC } from "react";
import { Grid, styled, Typography } from "@mui/material";

import { CssVariables } from "styles/cssVariables/cssVariables";
import { ContainedButton } from "app/components/common/buttons/containedButton";

export const VoteOptions: FC = () => {
  return (
    <Grid container spacing={1} direction="column">
      <Grid item>
        <Text variant="h2">VOTE OPTIONS</Text>
      </Grid>

      <Grid item>
        <StyledPoolCard>
          <Grid container spacing={2} direction="column">
            <Grid item>
              <VoteFor fullWidth>Vote For</VoteFor>
            </Grid>

            <Grid item>
              <VoteAgainst fullWidth>Vote Against</VoteAgainst>
            </Grid>
          </Grid>
        </StyledPoolCard>
      </Grid>
    </Grid>
  );
};

const StyledPoolCard = styled("div")({
  backgroundColor: CssVariables.poolCardBackground,
  border: `4px solid ${CssVariables.cardBorder}`,
  borderRadius: "20px",
  padding: "20px",
});

const Text = styled(Typography)({
  color: CssVariables.white,
  textTransform: "uppercase",
});

const VoteFor = styled(ContainedButton)({
  backgroundColor: CssVariables.green,
});

const VoteAgainst = styled(ContainedButton)({
  backgroundColor: CssVariables.error,
});
