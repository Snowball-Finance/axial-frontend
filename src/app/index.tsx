/**
 *
 * App
 *
 * This component is the skeleton around the actual pages, and should only
 * contain code that should be seen on all pages. (e.g. navigation bar)
 */

import { Helmet } from 'react-helmet-async';
import { Switch, Route, useLocation } from 'react-router-dom';

import { HomePage } from './containers/pages/Home/Loadable';
import { NotFoundPage } from './containers/pages/NotFound/Loadable';

import { useTranslation } from 'react-i18next';
import { translations } from 'locales/i18n';
import { BlockChain } from "./containers/BlockChain/Loadable";
import { useEffect } from "react";
import { AppPages } from "./types";
import {analytics} from '@snowball-finance/snowball-analytics'
import { Governance } from "./containers/pages/Governance/Loadable";
import Layout from './Layout';
import { Liquidity } from './containers/pages/Liquidity/Loadable';
import { Rewards } from './containers/pages/Rewards/Loadable';

export function App() {
  const { t } = useTranslation();
  const location = useLocation()

  useEffect(() => {
    analytics.trackPageView({
      href: location.pathname,
    })
  }, [location]);


  return (
    <>
      <BlockChain />
      <Helmet
        titleTemplate="%s - Axial"
        defaultTitle={t(translations.HomePage.home())}
      >
        <meta name="description" content="Axial" />
      </Helmet>
      <Layout>
        <Switch>
          <Route exact path={AppPages.RootPage} component={HomePage} />
          <Route path={AppPages.GovernancePage} component={Governance} />
          <Route path={AppPages.LiquidityPage} component={Liquidity} />
          <Route path={AppPages.RewardPage} component={Rewards} />
          <Route component={NotFoundPage} />
        </Switch>
      </Layout>
    </>
  );
}
