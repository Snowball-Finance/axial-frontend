/**
 *
 * StakingPage
 *
 */
import { useStakingPageSlice } from "./slice";
import { Route, Switch } from "react-router-dom";
import { AppPages } from "app/types";
import { StakingRoot } from "./pages/root";
import { StakingSubPages } from "./routes";
import { SAxialPage } from "./pages/sAxial";
import { VeAxialPage } from "./pages/veAxial";

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
