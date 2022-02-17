import "../styles/global.scss"
import "../styles/NotifyStyle.scss"

import { BLOCK_TIME, POOLS_MAP } from "../constants"
import React, { ReactElement, Suspense, useCallback, useEffect } from "react"
import { Route, Switch, useLocation } from "react-router-dom"
import { AppDispatch } from "../store"
import Layout from "../hoc/Layout"
import Deposit from "./deposit/Deposit"
import Pools from "./pools/Pools"
import Risk from "./risk/Risk"
import Swap from "./swap/Swap"
import Web3ReactManager from "../components/Web3ReactManager"
import Withdraw from "./withdraw/Withdraw"
import fetchGasPrices from "../libs/updateGasPrices"
import fetchSwapStats from "../libs/getSwapStats"
import fetchTokenPricesUSD from "../libs/updateTokenPrices"
import { useDispatch } from "react-redux"
import usePoller from "../hooks/usePoller"
import Farm from "./farm/Farm"
import FarmDeposit from "./farmDeposit/farmDeposit"
import FarmWithdraw from "./farmWithdraw/farmWithdraw"
import fetchAprStats from "../libs/getMasterchefApy"
import { analytics } from "../utils/analytics"

const App = (): ReactElement => {
  const location = useLocation()

  useEffect(() => {
    analytics.trackPageView({
      href: location.pathname,
    })
  }, [location])

  return (
    <Suspense fallback={null}>
      <Web3ReactManager>
        <GasAndTokenPrices>
          <Switch>
            <Layout>
              <Route exact path="/" component={Swap} />
              <Route exact path="/pools" component={Pools} />
              <Route exact path="/rewards" component={Farm} />
              {Object.values(POOLS_MAP).map(({ name, route }) => (
                <Route
                  exact
                  path={`/rewards/${route}/withdraw`}
                  render={(props: any) => <FarmWithdraw {...props} poolName={name} />}
                  key={`${name}-farmswithdraw`}
                />
              ))}
              {Object.values(POOLS_MAP).map(({ name, route }) => (
                <Route
                  exact
                  path={`/rewards/${route}/deposit`}
                  render={(props: any) => <FarmDeposit {...props} poolName={name} />}
                  key={`${name}-farmsdeposit`}
                />
              ))}
              {Object.values(POOLS_MAP).map(({ name, route }) => (
                <Route
                  exact
                  path={`/pools/${route}/deposit`}
                  render={(props: any) => <Deposit {...props} poolName={name} />}
                  key={`${name}-deposit`}
                />
              ))}
              {Object.values(POOLS_MAP).map(({ name, route }) => (
                <Route
                  exact
                  path={`/pools/${route}/withdraw`}
                  render={(props: any) => <Withdraw {...props} poolName={name} />}
                  key={`${name}-withdraw`}
                />
              ))}
              <Route exact path="/risk" component={Risk} />
            </Layout>
          </Switch>
        </GasAndTokenPrices>
      </Web3ReactManager>
    </Suspense>
  )
}

// eslint-disable-next-line @typescript-eslint/no-unsafe-call
export default App

function GasAndTokenPrices({ children }: React.PropsWithChildren<unknown>): ReactElement {
  const dispatch = useDispatch<AppDispatch>()
  //const { library } = useActiveWeb3React()

  const fetchAndUpdateGasPrice = useCallback(() => {
    void fetchGasPrices(dispatch)
  }, [dispatch])

  const fetchAndUpdateTokensPrice = useCallback(() => {
    fetchTokenPricesUSD(dispatch)
  }, [dispatch])

  const fetchAndUpdateSwapStats = useCallback(() => {
    void fetchSwapStats(dispatch)
  }, [dispatch])

  const fetchAndUpdateMasterchefApy = useCallback(() => {
    void fetchAprStats(dispatch)
  }, [dispatch])

  usePoller(fetchAndUpdateTokensPrice, BLOCK_TIME * 120)
  usePoller(fetchAndUpdateGasPrice, BLOCK_TIME * 2 * 60 * 60) // ~ 1hr, we don't use manual gas for now
  usePoller(fetchAndUpdateSwapStats, BLOCK_TIME * 2 * 60 * 60) // ~ 1hr
  usePoller(fetchAndUpdateMasterchefApy, BLOCK_TIME * 2 * 60 * 60) // ~ 1hr

  return <>{children}</>
}
