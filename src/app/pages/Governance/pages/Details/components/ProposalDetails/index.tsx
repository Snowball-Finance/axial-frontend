import { FC } from "react";
import { Grid, styled, Typography } from "@mui/material";

import { CssVariables } from "styles/cssVariables/cssVariables";
import { Info } from "./Info";
import { VoteStatus } from "./VoteStatus";

export const ProposalDetails: FC = () => {
  return (
    <StyledPoolCard>
      <Grid container spacing={1}>
        <Grid item xs={12}>
          <Text variant="body1">Proposal #3</Text>
        </Grid>

        <Grid item xs={10}>
          <Title variant="h2">
            Execute xSNOB Proposal Requirement Reduction to 50k
          </Title>
        </Grid>

        <Grid item xs={8}>
          <Grid container spacing={2}>
            <Grid item xs={6}>
              <Info />
            </Grid>

            <Grid item xs={6}>
              <VoteStatus />
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </StyledPoolCard>
  );
};

const StyledPoolCard = styled("div")({
  backgroundColor: CssVariables.poolCardBackground,
  border: `4px solid ${CssVariables.cardBorder}`,
  borderRadius: "20px",
  padding: "20px",
});

const Title = styled(Typography)({
  color: CssVariables.white,
  textTransform: "uppercase",
});

const Text = styled(Typography)({
  color: CssVariables.white,
});
