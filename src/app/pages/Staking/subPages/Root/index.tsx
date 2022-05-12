import { FC } from "react";
import { Grid, styled } from "@mui/material";

import { HeaderText } from "./components/HeaderText";
import { SAxialItem } from "./components/SAxialItem";
import { VeAxialItem } from "./components/VeAxialItem";
import { Max1040 } from "app/components/wrappers/max1040";

export const StakingRoot: FC = () => {
  return (
    <StyledCards>
      <Grid container spacing={4}>
        <Grid item xs={12}>
          <HeaderText />
        </Grid>

        <Grid item xs={12}>
          <SAxialItem />
        </Grid>

        <Grid item xs={12}>
          <VeAxialItem />
        </Grid>
      </Grid>
    </StyledCards>
  );
};

const StyledCards = styled(Max1040)({
  margin: "0px auto",
});
