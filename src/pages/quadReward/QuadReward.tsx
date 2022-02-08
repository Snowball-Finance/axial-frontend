import "./QuadReward.scss"

import React, { ReactElement, useState } from "react"
import classNames from "classnames"
import Button from "../../components/button/Button"
import axialLogo from "../../assets/icons/logo_icon.svg"
import arrowDownIcon from "../../assets/icons/arrowDown.svg"
import usdcLogo from "../../assets/icons/usdc.svg"
import avaxLogo from "../../assets/icons/AVAX.png"
import tsdLogo from "../../assets/icons/tsd.svg"

export default function QuadReward(): ReactElement {
  const [tab, setTab] = useState<string>("withdraw")

  const handleTabChange = (value: string) => {
    setTab(value)
  }

  return (
    <div className="quadReward">
      <div className="content">
        <div className="left">
          <div className="tabs">
            <ul className="nav">
              <li
                onClick={() => handleTabChange("deposit")}
                className={classNames({ active: tab === "deposit" })}
              >
                Deposit
              </li>
              <li
                onClick={() => handleTabChange("withdraw")}
                className={classNames({ active: tab === "withdraw" })}
              >
                Withdraw
              </li>
            </ul>
          </div>
          <div className="tabScreen">
            <h3>Withdraw AM3D</h3>
            <div className="balance">
              <p>Balance:100</p>
            </div>
            <div className="tokenInputContainer" id="tokenInput">
              <img alt="icon" src={axialLogo} />
              <div className="tokenSymbolAndName">
                <p className="boldText">AM3D USD</p>
                <p className="smallText">AM3D MIM/USDC.e/DAI.e</p>
              </div>
              <div className="inputGroup">
                <input
                  autoComplete="off"
                  autoCorrect="off"
                  type="text"
                  placeholder="0.0"
                  spellCheck="false"
                  onFocus={(e: React.ChangeEvent<HTMLInputElement>): void =>
                    e.target.select()
                  }
                />
              </div>
            </div>
          </div>

          <Button kind="primary" size="full">
            Withdraw
          </Button>
        </div>
        <div className="right">
          <div>
            <p>Axial rewards</p>
            <h1>AM3D LP Tokens</h1>
            <div className="contract">
              <p>Contract AM3D Liquidity Pool</p>
              <img alt="link" src={arrowDownIcon} />
            </div>
          </div>

          <div className="aprInfo">
            <div className="aprContent">
              <h6 className="title">Total APR</h6>
              <p>11.57%</p>
            </div>
            <div className="aprContent">
              <h6 className="title">Fee APR</h6>
              <p>0.78%</p>
            </div>
            <div className="aprContent">
              <h6 className="title">Rewards APR</h6>
              <p>10.78%</p>
            </div>
          </div>
          <div className="share">
            <div className="shareContent">
              <h4>My share</h4>
              <p className="highlightText">0.01 % of pool</p>
            </div>
            <div className="shareContent">
              <h6>USD Balance</h6>
              <p>$00.0</p>
            </div>
            <div className="shareContent">
              <h6>Total Amount</h6>
              <p>$00.0</p>
            </div>
            <div className="shareContent">
              <h6>Rewards</h6>
              <p className="highlightText">$100.0 in total</p>
            </div>
          </div>
          <div className="rewardsCoin">
            <div className="coinContent">
              <h4 className="title">AXIAL</h4>
              <img alt="icon" src={axialLogo} />
              <p>100.00</p>
              <p>$60.00</p>
            </div>
            <div className="coinContent">
              <h4 className="title">USDC</h4>
              <img alt="icon" src={usdcLogo} />
              <p>100.00</p>
              <p>$60.00</p>
            </div>
            <div className="coinContent">
              <h4 className="title">AVAX</h4>
              <img alt="icon" src={avaxLogo} />
              <p>100.00</p>
              <p>$60.00</p>
            </div>
            <div className="coinContent">
              <h4 className="title">TSD</h4>
              <img alt="icon" src={tsdLogo} />
              <p>100.00</p>
              <p>$60.00</p>
            </div>
          </div>
          <div>
            <Button kind="primary" size="full">
              Claim
            </Button>
          </div>
          <div className="currency">
            <h4>Currency reserves</h4>
            <p className="highlightText">$18,621,906.59 in total</p>
          </div>
          <div className="currencyDetails">
            <div className="outer">
              <div className="inner">
                <img alt="icon" src="/static/media/mim.e2ff368f.svg" />
                <p>MIM</p>
                <p className="highlightText">32.42%</p>
              </div>
              <div>
                <p>6,018,173.01</p>
              </div>
            </div>
            <div className="outer">
              <div className="inner">
                <img alt="icon" src="/static/media/usdc.1fa5e7f4.svg" />
                <p>USDC.e</p>
                <p className="highlightText">33.80%</p>
              </div>
              <div>
                <p>6,268,801.06</p>
              </div>
            </div>
            <div className="outer">
              <div className="inner">
                <img alt="icon" src="/static/media/dai.664df0db.svg" />
                <p>DAI.e</p>
                <p className="highlightText">33.77%</p>
              </div>
              <div>
                <p>6,274,541.46</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
