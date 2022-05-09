import { FC } from "react";
import { Grid } from "@mui/material";
import { Actions } from "./Actions";
import { LockAmount } from "./LockAmount";
import { DepositConfirmationModal } from "./DepositConfirmationModal";

export const Deposit: FC = () => {
  return (
    <>
      <DepositConfirmationModal />
      <Grid container spacing={4}>
        <Grid item xs={12}>
          <LockAmount />
        </Grid>

        <Grid item xs={12}>
          <Actions />
        </Grid>
      </Grid>
    </>
  );
};
