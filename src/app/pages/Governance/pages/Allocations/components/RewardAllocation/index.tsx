import { FC } from "react";
import { Grid, styled, Typography } from "@mui/material";

import { PrimaryCardWrapper } from "app/components/wrappers/PrimaryCard";
import { CssVariables } from "styles/cssVariables/cssVariables";
import { AllocationTable } from "./AllocationTable";

export const RewardAllocation: FC = () => {
  return (
    <PrimaryCardWrapper>
      <Grid container direction="column" spacing={2}>
        <Grid item>
          <HeaderText variant="h2">Axial Reward Allocations</HeaderText>
        </Grid>

        <Grid item>
          <Text variant="body2">
            This chart shows the current Axial reward allocations per pool
            (updated daily).
          </Text>
        </Grid>

        <Grid item>
          <AllocationTable />
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
