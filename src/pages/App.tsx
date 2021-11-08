import "../styles/global.scss"
import "../styles/NotifyStyle.scss"

import { BLOCK_TIME, POOLS_MAP } from "../constants"
import React, { ReactElement, Suspense, useCallback } from "react"
import { Route, Switch } from "react-router-dom"
import { AppDispatch } from "../store"

import Deposit from "./deposit/Deposit"
import Pools from "./pools/Pools"
import Risk from "./risk/Risk"
import Swap from "./swap/Swap"
import Version from "../components/version/Version"
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

export default function App(): ReactElement {
  return (
    <Suspense fallback={null}>
      <Web3ReactManager>
        <GasAndTokenPrices>
          <Switch>
            <Route exact path="/" component={Swap} />
            <Route exact path="/pools" component={Pools} />
            <Route exact path="/farms" component={Farm} />
            {Object.values(POOLS_MAP).map(({ name, route }) => (
              <Route
                exact
                path={`/farms/${route}/withdraw`}
                render={(props) => <FarmWithdraw {...props} poolName={name} />}
                key={`${name}-farmswithdraw`}
              />
            ))}
            {Object.values(POOLS_MAP).map(({ name, route }) => (
              <Route
                exact
                path={`/farms/${route}/deposit`}
                render={(props) => <FarmDeposit {...props} poolName={name} />}
                key={`${name}-farmsdeposit`}
              />
            ))}
            {Object.values(POOLS_MAP).map(({ name, route }) => (
              <Route
                exact
                path={`/pools/${route}/deposit`}
                render={(props) => <Deposit {...props} poolName={name} />}
                key={`${name}-deposit`}
              />
            ))}
            {Object.values(POOLS_MAP).map(({ name, route }) => (
              <Route
                exact
                path={`/pools/${route}/withdraw`}
                render={(props) => <Withdraw {...props} poolName={name} />}
                key={`${name}-withdraw`}
              />
            ))}
            <Route exact path="/risk" component={Risk} />
          </Switch>
          <Version />
        </GasAndTokenPrices>
      </Web3ReactManager>
    </Suspense>
  )
}

function GasAndTokenPrices({
  children,
}: React.PropsWithChildren<unknown>): ReactElement {
  const dispatch = useDispatch<AppDispatch>()
  //const { library } = useActiveWeb3React()

  const fetchAndUpdateGasPrice = useCallback(() => {
    void fetchGasPrices(dispatch)
  }, [dispatch])

  const fetchAndUpdateTokensPrice = useCallback(() => {
    fetchTokenPricesUSD(dispatch)
  }, [dispatch])

  //this one still needs api work
  const fetchAndUpdateSwapStats = useCallback(() => {
    void fetchSwapStats(dispatch)
  }, [dispatch])

  usePoller(fetchAndUpdateGasPrice, 5 * 1000)
  usePoller(fetchAndUpdateTokensPrice, BLOCK_TIME * 120)
  usePoller(fetchAndUpdateSwapStats, BLOCK_TIME * 2 * 60 * 60) // ~ 1hr

  return <>{children}</>
}
