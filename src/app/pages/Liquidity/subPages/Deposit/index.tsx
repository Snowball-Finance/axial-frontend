import React, { FC } from "react";
import { Grid, styled } from "@mui/material";

import { AddLiquidity } from "./components/AddLiquidity";
import { CurrencyReserve } from "./components/CurrencyReserve";

export const Deposit: FC = () => {
  return (
    <PageWrapper>
      <Grid container spacing={4}>
        <Grid item>
          <AddLiquidity />
        </Grid>

        <Grid item>
          <CurrencyReserve />
        </Grid>
      </Grid>
    </PageWrapper>
  );
};

const PageWrapper = styled("div")({
  width: 650,
  margin: "0 auto",
});
