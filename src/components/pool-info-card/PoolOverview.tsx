import "./PoolOverview.scss"
import { POOLS_MAP, PoolTypes, TOKENS_MAP } from "../../constants"
import { PoolDataType, UserShareType } from "../../hooks/usePoolData"
import React, { ReactElement } from "react"
import { formatBNToShortString, formatBNToString } from "../../libs"
import Button from "../button/Button"
import { Link } from "react-router-dom"
import { Zero } from "@ethersproject/constants"
import classNames from "classnames"
import { useTranslation } from "react-i18next"

interface Props {
  poolRoute: string
  poolData: PoolDataType
  userShareData: UserShareType | null
  onClickMigrate?: (e: React.MouseEvent<HTMLButtonElement>) => void
}

export default function PoolOverview({
  poolData,
  poolRoute,
  userShareData,
  onClickMigrate,
}: Props): ReactElement | null {
  const { t } = useTranslation()
  const { type: poolType, isOutdated } = POOLS_MAP[poolData.name]
  const formattedDecimals = poolType === PoolTypes.USD ? 2 : 4
  const shouldMigrate = !!onClickMigrate
  const formattedData = {
    name: poolData.name,
    reserve: poolData.reserve
      ? formatBNToShortString(poolData.reserve, 18)
      : "-",
    apr: poolData.apr ? `${Number(poolData.apr).toFixed(2)}%` : "-",
    volume: poolData.volume ? `$${Number(poolData.volume).toFixed(2)}` : "-",
    userBalanceUSD: formatBNToShortString(
      userShareData?.usdBalance || Zero,
      18,
    ),
    tokens: poolData.tokens.map((coin) => {
      const token = TOKENS_MAP[coin.symbol]
      return {
        symbol: token.symbol,
        name: token.name,
        icon: token.icon,
        value: formatBNToString(coin.value, token.decimals, formattedDecimals),
      }
    }),
  }
  const hasShare = !!userShareData?.usdBalance.gt("0")

  return (
    <div
      className={classNames("poolOverview", {
        outdated: isOutdated || shouldMigrate,
      })}
    >
      <div className="left">
        <div className="titleAndTag">
          <h4 className="title">{formattedData.name}</h4>
          {(shouldMigrate || isOutdated) && <Tag kind="warning">OUTDATED</Tag>}
          {poolData.isPaused && <Tag kind="error">PAUSED</Tag>}
        </div>
        <div className="tokens">
          <span style={{ marginRight: "8px" }}>[</span>
          {formattedData.tokens.map(({ symbol, icon }) => (
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
          {hasShare && (
            <div className="margin">
              <span className="label">{`${t("balance")}`}</span>
              <span>{formattedData.userBalanceUSD}</span>
            </div>
          )}
          {formattedData.apr && (
            <div className="margin">
              <span className="label">{`${t("apr")}`}</span>
              <span>{formattedData.apr}</span>
            </div>
          )}
          <div className="margin">
            <span className="label">TVL</span>
            <span>{`$${formattedData.reserve}`}</span>
          </div>
          {formattedData.volume && (
            <div>
              <span className="label">{`${t("24HrVolume")}`}</span>
              <span>{formattedData.volume}</span>
            </div>
          )}
        </div>
        <div className="buttons">
          <Link to={`${poolRoute}/withdraw`}>
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
            <Link to={`${poolRoute}/deposit`}>
              <Button
                kind="primary"
                disabled={poolData?.isPaused || isOutdated}
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
