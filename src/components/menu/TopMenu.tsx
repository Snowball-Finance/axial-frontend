import "./TopMenu.scss"

import React, { ReactElement } from "react"

import { Link } from "react-router-dom"
import Web3Status from "../web3-status/Web3Status"
import classNames from "classnames"
import logo from "../../assets/icons/logo.svg"
import { useTranslation } from "react-i18next"

interface Props {
  activeTab: string
}

function TopMenu({ activeTab }: Props): ReactElement {
  const { t } = useTranslation()

  return (
    <header className="top">
      <h1>
        <Link to="/">
          <img className="logo" alt="logo" src={logo} />
        </Link>
      </h1>

      <ul className="nav">
        <li>
          <Link to="/" className={classNames({ active: activeTab === "swap" })}>
            {t("swap")}
          </Link>
        </li>
        <li>
          <Link
            to="/pools"
            className={classNames({
              active:
                activeTab === "pools" ||
                activeTab === "deposit" ||
                activeTab === "withdraw",
            })}
          >
            {t("liquidity")}
          </Link>
        </li>
        <li>
          <Link
            to="/farms"
            className={classNames({
              active:
                activeTab === "farms"
            })}
          >
            {t("rewards")}
          </Link>
        </li>
        <li>
          <Link
            to="/risk"
            className={classNames({ active: activeTab === "risk" })}
          >
            {t("risk")}
          </Link>
        </li>
      </ul>
      <Web3Status />
    </header>
  )
}

export default TopMenu
