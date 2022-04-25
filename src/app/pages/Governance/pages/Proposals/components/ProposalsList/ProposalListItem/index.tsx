import { FC } from "react";
import { Grid, styled, Typography } from "@mui/material";

import { CssVariables } from "styles/cssVariables/cssVariables";
import { Info } from "./Info";
import { Actions } from "./Actions";

export const ProposalListItem: FC = () => {
  return (
    <StyledPoolCard>
      <Grid container direction="column" spacing={1}>
        <Grid item>
          <Text variant="body1">Proposal #3</Text>
        </Grid>

        <Grid item>
          <Grid container alignItems="flex-end" justifyContent="space-between">
            <Grid item xs={8}>
              <Grid container spacing={2}>
                <Grid item>
                  <Title variant="h2">
                    Execute xSNOB Proposal Requirement Reduction to 50k
                  </Title>
                </Grid>
                <Grid item>
                  <Info />
                </Grid>
              </Grid>
            </Grid>

            <Grid item>
              <Actions />
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
