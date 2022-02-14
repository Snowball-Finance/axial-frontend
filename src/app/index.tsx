/**
 *
 * App
 *
 * This component is the snowball around the actual pages, and should only
 * contain code that should be seen on all pages. (e.g. navigation bar)
 */

import { Helmet } from "react-helmet-async";
import { Switch, Route } from "react-router-dom";
import { HomePage } from "./pages/Home/Loadable";
import { NotFoundPage } from "./pages/NotFound/Loadable";
import { useTranslation } from "react-i18next";
import { translations } from "locales/i18n";
import { BlockChain } from "./containers/BlockChain/Loadable";
import { AppPages } from "./types";
import Layout from './Layout';
import { GovernancePage } from "./pages/Governance/Loadable";
// import { PoolsAndGauges } from "./containers/PoolsAndGauges";
// import GAUGE_PROXY_ABI from "libs/abis/gauge-proxy.json";
// import { INFO_QUERY } from "services/apollo/queries/mainTokenInfo";
import { PROPOSAL_QUERY } from "services/apollo/queries/proposalList";
import SNOWBALL_ABI from "libs/abis/snowball.json";
import GOVERNANCE_ABI from "libs/abis/vote-governance.json";
import SNOWCONE_ABI from "libs/abis/snowcone.json";
import FEE_DISTRIBUTOR_ABI from "libs/abis/fee-distributor.json";
import { CONTRACTS } from "config";
import { StakingPage } from "./pages/StakingPage";

export function App() {
  const { t } = useTranslation();
  return (
    <>
      <Helmet
        titleTemplate="%s - Snowball"
        defaultTitle={t(translations.HomePage.home())}
      >
        <meta name="description" content="Snowball" />
      </Helmet>
      <Switch>
        <Route exact path={AppPages.RootPage} component={HomePage} />
        <Route path={AppPages.GovernancePage} component={GovernancePage} />
        <Route component={NotFoundPage} />
      </Switch>
    </>
  );
}
