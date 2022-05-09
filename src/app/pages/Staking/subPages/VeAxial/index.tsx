import { FC } from "react";
import { Grid, styled } from "@mui/material";

import { Navigation } from "../../components/Navigation";
import { Info } from "./components/Info";
import { HeaderText } from "./components/HeaderText";
import { DepositAndWithdraw } from "./components/DepositAndWithdraw";

export const VeAxialPage: FC = () => {
  return (
    <StyledCards>
      <Grid container spacing={4}>
        <Grid item xs={12}>
          <Navigation routeName="veAXIAL" />
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

const StyledCards = styled("div")({
  maxWidth: 730,
  margin: "0px auto",
});
