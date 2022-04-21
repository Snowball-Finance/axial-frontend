/**
 *
 * StakingPage
 *
 */
import { useStakingPageSlice } from "./slice";
import { Route, Switch } from "react-router-dom";
import { AppPages } from "app/types";
import { StakingSubPages } from "./routes";
import { StakingRoot } from "./subPages/Root";
import { SAxialPage } from "./subPages/SAxial";
import { VeAxialPage } from "./subPages/VeAxial";

interface Props {}
export function StakingPage(props: Props) {
  useStakingPageSlice();

  return (
    <Switch>
      <Route exact path={AppPages.StakingPage}>
        <StakingRoot />
      </Route>
      <Route exact path={`${StakingSubPages.sAxial}`}>
        <SAxialPage />
      </Route>
      <Route path={`${StakingSubPages.veAxial}`}>
        <VeAxialPage />
      </Route>
    </Switch>
  );
}
