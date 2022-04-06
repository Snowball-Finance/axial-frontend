import { FC } from "react";
import { Grid } from "@mui/material";

import { CardWrapper } from "app/components/wrappers/Card";
import { Route } from "../../info/Route";
import { PriceImpact } from "../../info/PriceImpact";
import { Rate } from "../../info/Rate";
import { Gas } from "../../info/Gas";
import { Slippage } from "../../info/Slippage";
import { TxnDeadline } from "../../info/TxnDeadline";

export const TokenInfo: FC = () => {
  return (
    <CardWrapper>
      <Grid container direction="column" spacing={1}>
        <Grid item>
          <Rate />
        </Grid>

        <Grid item>
          <PriceImpact />
        </Grid>

        <Grid item>
          <Route />
        </Grid>

        <Grid item>
          <Gas />
        </Grid>

        <Grid item>
          <Slippage />
        </Grid>

        <Grid item>
          <TxnDeadline />
        </Grid>
      </Grid>
    </CardWrapper>
  );
};
