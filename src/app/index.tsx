/**
 *
 * App
 *
 * This component is the snowball around the actual pages, and should only
 * contain code that should be seen on all pages. (e.g. navigation bar)
 */

import { Helmet } from "react-helmet-async";
import { Switch, Route } from "react-router-dom";
import { NotFoundPage } from "./pages/NotFound/Loadable";
import { useTranslation } from "react-i18next";
import { translations } from "locales/i18n";
import { BlockChain } from "./containers/BlockChain/Loadable";
import { AppPages } from "./types";
import { GovernancePage } from "./pages/Governance/Loadable";
// import { PoolsAndGauges } from "./containers/PoolsAndGauges";
// import GAUGE_PROXY_ABI from "libs/abis/gauge-proxy.json";
// import { INFO_QUERY } from "services/apollo/queries/mainTokenInfo";
import MainTokenABI from "abi/axial.json";
import GOVERNANCE_ABI from "abi/governance.json";
import GovernanceTokenABI from "abi/sAxial.json";
import FEE_DISTRIBUTOR_ABI from "libs/abis/fee-distributor.json";
import { CONTRACTS } from "config";
import { StakingPage } from "./pages/Staking";
import Layout from "./Layout";
import { RisksPage } from "./pages/Risks/Loadable";
import { LiquidityPage } from "./pages/Liquidity/Loadable";
import { RewardsPage } from "./pages/Rewards/Loadable";
import { Swap } from "./containers/Swap";
import AGGREGATOR_ABI from "abi/axialAggregator.json";

import { tokens } from "./tokens";
import { Token, TokenSymbols } from "./containers/Swap/types";
import { Rewards } from "./containers/Rewards";
import { pools } from "./pools";
import { GlobalActions, useGlobalSlice } from "store/slice";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Web3Selectors } from "./containers/BlockChain/Web3/selectors";
import { SwapPage } from "./pages/Swap";
import { GlobalModals } from "./components/modals";
import { Playground } from "./pages/playground";
import { PoolsAndGauges } from "./containers/PoolsAndGauges/Loadable";

export function App() {
  const { t } = useTranslation();

  useGlobalSlice();
  const dispatch = useDispatch();

  const account = useSelector(Web3Selectors.selectAccount);
  const library = useSelector(Web3Selectors.selectLibrary);

  useEffect(() => {
    dispatch(GlobalActions.setTokens(tokens));
    return () => {};
  }, []);

  useEffect(() => {
    dispatch(GlobalActions.getTokenPricesUSD());
    dispatch(GlobalActions.getGasPrice());
    return () => {};
  }, []);

  useEffect(() => {
    if (account && library) {
      dispatch(GlobalActions.getTokenBalances());
    }
    return () => {};
  }, [account, library]);

  return (
    <>
      <Helmet
        titleTemplate="%s - Axial"
        defaultTitle={t(translations.HomePage.home())}
      >
        <meta name="description" content="Axial" />
      </Helmet>
      <GlobalModals />
      <BlockChain
        mainTokenABI={MainTokenABI}
        governance={{
          tokenABI: GovernanceTokenABI,
          governanceABI: GOVERNANCE_ABI,
          staking: {
            feeDistributorABI: FEE_DISTRIBUTOR_ABI,
            otherDistributors: [
              {
                address: CONTRACTS.SHERPA_FEE_DISTRIBUTOR,
                name: "Sherpa",
                symbol: "SHP",
                decimals: 18,
              },
              {
                address: CONTRACTS.AXIAL_FEE_DISTRIBUTOR,
                name: "Axial",
                symbol: "AXL",
                decimals: 18,
              },
            ],
          },
        }}
      />
      <PoolsAndGauges />
      <Rewards pools={pools} />
      <Swap
        aggregatorABI={AGGREGATOR_ABI}
        aggregatorAddress={process.env.REACT_APP_AGGREGATOR_ADDRESS || ""}
        tokens={tokens as { [K in TokenSymbols]: Token }}
      />
      <Layout>
        <Switch>
          <Route exact path={AppPages.RootPage} component={SwapPage} />
          <Route path={AppPages.GovernancePage}>
            <GovernancePage />
          </Route>
          <Route path={AppPages.StakingPage}>
            <StakingPage />
          </Route>
          <Route path={AppPages.LiquidityPage} component={LiquidityPage} />
          <Route path={AppPages.RewardPage} component={RewardsPage} />
          <Route path={AppPages.RiskPage} component={RisksPage} />
          <Route path={AppPages.Playground} component={Playground} />
          <Route component={NotFoundPage} />
        </Switch>
      </Layout>
    </>
  );
}
