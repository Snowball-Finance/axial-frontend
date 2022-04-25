import { Route, Switch } from "react-router-dom";
import { Proposals } from "./subPages/proposals";
import { GovernanceSubPages } from "./routes";
import { AppPages } from "app/types";
import { styled } from "@mui/material";
import { ProposalDetails } from "./subPages/details";
import { NewProposalForm } from "./subPages/newProposal";

export const GovernanceBody = () => {
  return (
    <PageWrapper>
      <Switch>
        <Route exact path={AppPages.GovernancePage}>
          <Proposals />
        </Route>
        <Route exact path={GovernanceSubPages.newProposal}>
          <NewProposalForm />
        </Route>
        <Route exact path={`${GovernanceSubPages.proposals}`}>
          <Proposals />
        </Route>
        <Route path={`${GovernanceSubPages.proposal}`}>
          <ProposalDetails />
        </Route>
      </Switch>
    </PageWrapper>
  );
};

const PageWrapper = styled("div")({});
