import { Route, Switch } from "react-router-dom";
import { styled } from "@mui/material";

import { AppPages } from "app/types";
import { LiquiditySubPages } from "./routes";
import { PoolCards } from "./subPages/Pools";
import { Deposit } from "./subPages/Deposit";
import { Withdraw } from "./subPages/Withdraw";

export const LiquidityBody = () => {
  return (
    <PageWrapper>
      <Switch>
        <Route exact path={AppPages.LiquidityPage}>
          <PoolCards />
        </Route>
        <Route exact path={`${LiquiditySubPages.deposit}`}>
          <Deposit />
        </Route>
        <Route exact path={`${LiquiditySubPages.withdraw}`}>
          <Withdraw />
        </Route>
      </Switch>
    </PageWrapper>
  );
};

const PageWrapper = styled("div")({});
