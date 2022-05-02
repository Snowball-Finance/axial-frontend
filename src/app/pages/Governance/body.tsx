import { Route, Switch } from "react-router-dom";
import { Proposals } from "./pages/Proposals";
import { GovernanceSubPages } from "./routes";
import { AppPages } from "app/types";
import { styled } from "@mui/material";
import { Details } from "./pages/Details";
import { NewProposal } from "./pages/NewProposal";
import { Allocations } from "./pages/Allocations";

export const GovernanceBody = () => {
  return (
    <PageWrapper>
      <Switch>
        <Route exact path={AppPages.GovernancePage}>
          <Proposals />
        </Route>
        <Route exact path={GovernanceSubPages.newProposal}>
          <NewProposal />
        </Route>
        <Route exact path={`${GovernanceSubPages.proposals}`}>
          <Proposals />
        </Route>
        <Route path={`${GovernanceSubPages.proposal}`}>
          <Details />
        </Route>
        <Route path={`${GovernanceSubPages.allocations}`}>
          <Allocations />
        </Route>
      </Switch>
    </PageWrapper>
  );
};

const PageWrapper = styled("div")({});
