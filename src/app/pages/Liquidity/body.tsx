import { Route, Switch } from "react-router-dom";
import { styled } from "@mui/material";

import { AppPages } from "app/types";
import { LiquiditySubPages } from "./routes";
import { PoolCards } from "./subPages/Pools";
import { Deposit } from "./subPages/Deposit";

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
      </Switch>
    </PageWrapper>
  );
};

const PageWrapper = styled("div")({});
