import React, { FC } from "react";
import { Grid, styled } from "@mui/material";

export const Withdraw: FC = () => {
  return (
    <PageWrapper>
      <Grid container spacing={4}>
        <Grid item></Grid>

        <Grid item></Grid>
      </Grid>
    </PageWrapper>
  );
};

const PageWrapper = styled("div")({
  width: 650,
  margin: "0 auto",
});
