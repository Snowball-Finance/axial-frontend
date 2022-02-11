import "./TopMenu.scss"

import React, { ReactElement } from "react"

import { Link } from "react-router-dom"
import Web3Status from "../web3-status/Web3Status"
import logo from "../../assets/icons/logo.svg"


function TopMenu(): ReactElement {
  return (
    <header className="top">
      <h1>
        <Link to="/">
          <img className="logo" alt="logo" src={logo} />
        </Link>
      </h1>
      <Web3Status />
    </header>
  )
}

export default TopMenu
