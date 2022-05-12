import React, { FC } from "react";
import { Grid, styled } from "@mui/material";

import { WithdrawInput } from "./components/WithdrawInput";
import { CurrencyInfo } from "../../components/CurrencyInfo";
import { WithdrawConfirmation } from "./components/withdrawConfirmationModal";
import { mobile } from "styles/media";

export const Withdraw: FC = () => {
  return (
    <>
      <WithdrawConfirmation />
      <PageWrapper>
        <Grid container spacing={4}>
          <Grid item>
            <WithdrawInput />
          </Grid>
          <Grid item>
            <CurrencyInfo />
          </Grid>
        </Grid>
      </PageWrapper>
    </>
  );
};

const PageWrapper = styled("div")({
  width: 650,
  margin: "0 auto",

  [mobile]: {
    width: "100%",
  },
});
