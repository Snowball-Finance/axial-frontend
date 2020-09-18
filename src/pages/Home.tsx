import * as React from "react"

import "./Home.scss"
import TopMenu from "../components/TopMenu"
import AssetButton from "../components/AssetButton"

function Home() {
  return (
    <div className="homepage">
      <TopMenu activeTab={"swap"} />
      <div className="content">
        <h3>Choose Asset</h3>
        <div className="button_group">
          <div className="button_usd">
            <AssetButton
              title="USD"
              to="/swap/usd"
              icon={require("../assets/icons/icon_usd.svg")}
            />
          </div>
          <div className="button_btc">
            <AssetButton
              title="BTC"
              to="/swap/btc"
              icon={require("../assets/icons/icon_btc.svg")}
            />
          </div>
        </div>
      </div>
    </div>
  )
}

export default Home