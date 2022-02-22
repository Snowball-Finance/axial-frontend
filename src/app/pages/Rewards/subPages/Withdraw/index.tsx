import React, { FC } from "react";
import { Grid, styled } from "@mui/material";

import { CurrencyReserve } from "../../components/CurrencyReserve";
import { WithdrawInput } from "./components/Input";

export const Withdraw: FC = () => {
  return (
    <PageWrapper>
      <Grid container spacing={4}>
        <Grid item>
          <WithdrawInput />
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
