import { FC } from "react";
import { Grid, styled } from "@mui/material";

import { Max1040 } from "app/components/wrappers/max1040";
import { VoteForPair } from "./components/VoteForPair";
import { RewardAllocation } from "./components/RewardAllocation";
import { NavigationHead } from "../../components/Navigation/NavigationHead";

export const Allocations: FC = () => {
  return (
    <StyledMax1040>
      <Grid container direction="column" spacing={4}>
        <Grid item>
          <NavigationHead />
        </Grid>

        <Grid item>
          <VoteForPair />
        </Grid>

        <Grid item>
          <RewardAllocation />
        </Grid>
      </Grid>
    </StyledMax1040>
  );
};

const StyledMax1040 = styled(Max1040)(() => ({
  margin: "0 auto",
}));
