import { FC } from "react";
import { Grid } from "@mui/material";

import { LockAmount } from "./LockAmount";
import { LockPeriod } from "./LockPeriod";
import { LockPeriodSlider } from "./Slider";
import { Actions } from "./Actions";
import { DepositConfirmationModal } from "./DepositConfirmationModal";
import { DepositYouWillGet } from "./DepositYouWillGet";

export const Deposit: FC = () => {
  return (
    <>
      <DepositConfirmationModal />

      <Grid container spacing={4}>
        <Grid item xs={12}>
          <LockAmount />
        </Grid>

        <Grid item xs={12}>
          <LockPeriod />
        </Grid>

        <Grid item xs={12}>
          <LockPeriodSlider />
        </Grid>

        <Grid item xs={12}>
          <Actions />
        </Grid>

        <Grid item xs={12}>
          <DepositYouWillGet />
        </Grid>
      </Grid>
    </>
  );
};
