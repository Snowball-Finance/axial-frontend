import { Route, Switch } from "react-router-dom";
import { styled } from "@mui/material";

import { AppPages } from "app/types";
import { RewardSubPages } from "./routes";
import { PoolCards } from "./subPages/Pools";
import { Deposit } from "./subPages/Deposit";
import { Withdraw } from "./subPages/Withdraw";

export const RewardsBody = () => {
  return (
    <PageWrapper>
      <Switch>
        <Route exact path={AppPages.RewardPage}>
          <PoolCards />
        </Route>
        <Route exact path={`${RewardSubPages.deposit}`}>
          <Deposit />
        </Route>
        <Route exact path={`${RewardSubPages.withdraw}`}>
          <Withdraw />
        </Route>
      </Switch>
    </PageWrapper>
  );
};

const PageWrapper = styled("div")({});
