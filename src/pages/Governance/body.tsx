import { Route, Switch } from "react-router-dom";
import { Proposals } from "./subPages/proposals";
import { GovernanceSubPages } from "./routes";
import { styled } from "@mui/material";
import { ProposalDetails } from "./subPages/details";
import React from 'react';


export const GovernanceBody = () => {
  return (
    <PageWrapper>
      <Switch>
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
