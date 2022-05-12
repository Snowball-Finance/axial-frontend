import { FC } from "react";
import { Grid, styled } from "@mui/material";

import { Navigation } from "../../components/Navigation";
import { Info } from "./components/Info";
import { HeaderText } from "./components/HeaderText";
import { DepositAndWithdraw } from "./components/DepositAndWithdraw";
import { Max1040 } from "app/components/wrappers/max1040";

export const SAxialPage: FC = () => {
  return (
    <StyledCards>
      <Grid container spacing={4}>
        <Grid item xs={12}>
          <Navigation routeName="sAXIAL" />
        </Grid>

        <Grid item xs={12}>
          <Info />
        </Grid>

        <Grid item xs={12}>
          <HeaderText />
        </Grid>

        <Grid item xs={12}>
          <DepositAndWithdraw />
        </Grid>
      </Grid>
    </StyledCards>
  );
};

const StyledCards = styled(Max1040)({
  margin: "0px auto",
});
