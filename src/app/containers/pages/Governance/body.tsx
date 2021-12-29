import { Route, Switch } from "react-router-dom";
import { NavigationTabs } from "./components/navigationTabs";
import { Proposals } from "./subPages/proposals";
import { NewProposal } from "./subPages/newProposal";
import { replace } from "connected-react-router";
import { GovernanceSubPages } from "./routes";
import { translations } from "locales/i18n";
import { useDispatch } from "react-redux";
import { useTranslation } from "react-i18next";
import { AppPages } from "app/types";
import { styled } from "@mui/material";

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

export const GovernanceBody=()=>{

  const dispatch = useDispatch()
  const path = window.location.pathname
  const { t } = useTranslation()
  const handleTabChange = (page: string) => {
    dispatch(replace(page))
  }

  return (
    <PageWrapper>
        <NavigationTabs
          onTabChange={handleTabChange}
          activePage={path!==AppPages.GovernancePage ? path : GovernanceSubPages.active}
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
  )
}

const PageWrapper = styled('div')({})