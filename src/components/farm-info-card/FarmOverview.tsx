import "./FarmOverview.scss"

import Button, { MdButton } from "../button/Button"
import React, { ReactElement } from "react"
import { Link } from "react-router-dom"
import classNames from "classnames"
import { BigNumber } from "ethers"

import { useTranslation } from "react-i18next"

interface Props {
  feeAPR: string,
  totalAPR: string,
  tvl: string,
  myTVL: string,
  farmName: string,
  shouldMigrate: boolean,
  isOutdated: boolean,
  isPaused: boolean,
  hasShare: boolean,
  userBalanceUSD: string,
  farmRoute: string,
  onClickMigrate: () => void,
  reserve: string,
  tokens: {
    symbol: string;
    name: string;
    icon: string;
    value: string;
  }[]

}

export default function FarmOverview({
  feeAPR,
  totalAPR,
  tvl,
  myTVL,
  farmName,
  shouldMigrate,
  isPaused,
  isOutdated,
  hasShare,
  userBalanceUSD,
  tokens,
  farmRoute,
  onClickMigrate,
}: Props): ReactElement | null {
  const { t } = useTranslation()



  const onClickWithdraw = () => {
    console.log("withdraw")
    // eslint-disable-next-line @typescript-eslint/no-unsafe-call
    // await masterchefContract.withdrawAll()
  }

  const onClickDeposit = () => {
    console.log("deposit")
    // eslint-disable-next-line @typescript-eslint/no-unsafe-call
    // await masterchefContract.depositAll()
  }

  const onClickClaim = () => {
    console.log("claim")
    // eslint-disable-next-line @typescript-eslint/no-unsafe-call
    // await masterchefContract.claim()
  }

  return (
    <div
      className={classNames("poolOverview",
        // {
        //   outdated: isOutdated || shouldMigrate,
        // }
      )}
    >
      <div className="left">
        <div className="titleAndTag">
          <h4 className="title">{farmName}</h4>
          {(shouldMigrate || isOutdated) && <Tag kind="warning">OUTDATED</Tag>}
          {isPaused && <Tag kind="error">PAUSED</Tag>}
        </div>
        {hasShare && (
          <div className="balance">
            <span>{t("balance")}: </span>
            <span>{`$${userBalanceUSD}`}</span>
          </div>
        )}
        <div className="tokens">
          <span style={{ marginRight: "8px" }}>[</span>
          {tokens.map(({ symbol, icon }) => (
            <div className="token" key={symbol}>
              <img alt="icon" src={icon} />
              <span>{symbol}</span>
            </div>
          ))}
          <span style={{ marginLeft: "-8px" }}>]</span>
        </div>
      </div>

      <div className="right">
        <div className="poolInfo">

          <div className="margin">
            <span className="label">fee APR</span>
            <span>{feeAPR}</span>
          </div>
          <div className="margin">
            <span className="label">total APR</span>
            <span>{totalAPR}</span>
          </div>

          <div className="margin">
            <span className="label">TVL</span>
            <span>{tvl}</span>
          </div>
          {myTVL && <div className="margin">
            <span className="label">my TVL</span>
            <span>{myTVL}</span>
          </div>}

        </div>
        <div className="buttons">
          <Link to={`${farmRoute}/withdraw`}>
            <Button kind="secondary">{t("withdraw")}</Button>
          </Link>
          {shouldMigrate ? (
            <Button
              kind="temporary"
              onClick={onClickMigrate}
              disabled={!hasShare}
            >
              {t("migrate")}
            </Button>
          ) : (
            <Link to={`${farmRoute}/deposit`}>
              <Button
                kind="primary"
                disabled={isPaused || isOutdated}
              >
                {t("deposit")}
              </Button>
            </Link>
          )}
        </div>

      </div>
    </div>
  )
}

function Tag(props: {
  children?: React.ReactNode
  kind?: "warning" | "error"
}) {
  const { kind = "warning", ...tagProps } = props
  return <span className={classNames("tag", kind)} {...tagProps} />
}
