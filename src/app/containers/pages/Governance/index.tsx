/**
*
* Governance
*
*/

import React from 'react';
import { Helmet } from 'react-helmet-async';
import { useTranslation } from 'react-i18next';
import { useSelector, useDispatch } from 'react-redux';
import { useGovernanceSlice } from './slice';
import { selectGovernance } from './selectors';
import { selectRouter } from "app/appSelectors";
import { GovernanceSubPages } from './routes'
import { replace } from "connected-react-router";
import { AppPages } from "app/types";
import { translations } from "locales/i18n";
import { styled } from "@mui/material";
import { Route, Switch } from "react-router-dom";
import { Tabs } from "./components/tabs";
import { Proposals } from "./subPages/proposals";
import { NewProposal } from "./subPages/newProposal";

interface Props { }

const pages = ({ t }) => [{
  path: GovernanceSubPages.active,
  title: t(translations.GovernancePage.Tabs.Active()),
},
{
  path: GovernanceSubPages.all,
  title: t(translations.GovernancePage.Tabs.All()),
},
{
  path: GovernanceSubPages.newProposal,
  title: t(translations.GovernancePage.Tabs.NewProposal()),
},
]

export function Governance(props: Props) {
  useGovernanceSlice()
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const governance = useSelector(selectGovernance);
  const router = useSelector(selectRouter)
  const subPath = router.location.pathname.split(AppPages.GovernancePage + "/")[1] ?? ""
  const dispatch = useDispatch()
  const { t } = useTranslation()


  return (
    <>
      <Helmet>
        <title>{t(translations.GovernancePage.Governance())}</title>
        <meta name="description" content={`${t(translations.GovernancePage.Description())}`} />
      </Helmet>
      <PageWrapper>
        <Tabs
          activePage={subPath ?? GovernanceSubPages.active}
          pages={pages({ t })}
        />
        <Switch>
          <Route exact path={AppPages.GovernancePage} >
            <Proposals filter="active" />
          </Route>
          <Route path={`${GovernanceSubPages.active}`} >
            <Proposals filter="active" />
          </Route>
          <Route path={`${GovernanceSubPages.all}`} >
            <Proposals filter="all" />
          </Route>
          <Route path={`${GovernanceSubPages.newProposal}`} >
            <NewProposal />
          </Route>
        </Switch>
      </PageWrapper>
    </>
  );

};

const PageWrapper = styled('div')({})