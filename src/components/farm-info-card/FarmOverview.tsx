import "./FarmOverview.scss"

import {
  AXIAL_MASTERCHEF_CONTRACT_ADDRESS,
  POOLS_MAP,
  PoolTypes,
  TOKENS_MAP,
} from "../../constants"
import { PoolDataType, UserShareType } from "../../hooks/usePoolData"
import React, { ReactElement } from "react"
import { formatBNToShortString, formatBNToString } from "../../libs"
import Button from "../button/Button"
import { Link } from "react-router-dom"
import { Zero } from "@ethersproject/constants"
import classNames from "classnames"
import { ethers } from "ethers"
import masterchef from "../../constants/abis/masterchef.json"
import { useActiveWeb3React } from "../../hooks"
import { useTranslation } from "react-i18next"

interface Props {
  poolRoute: string
  poolData: PoolDataType
  userShareData: UserShareType | null
  onClickMigrate?: (e: React.MouseEvent<HTMLButtonElement>) => void
}

export default function FarmOverview({
  poolData,
  poolRoute,
  userShareData,
  onClickMigrate,
}: Props): ReactElement | null {
  const { t } = useTranslation()
  const { type: poolType, isOutdated } = POOLS_MAP[poolData.name]
  const formattedDecimals = poolType === PoolTypes.USD ? 2 : 4
  const shouldMigrate = !!onClickMigrate
  const { library } = useActiveWeb3React()
  const formattedData = {
    name: poolData.name,
    myShare: formatBNToShortString(userShareData?.share || Zero, 18),
    TVL: formatBNToShortString(poolData?.totalLocked || Zero, 18),
    reserve: poolData.reserve
      ? formatBNToShortString(poolData.reserve, 18)
      : "-",
    apr: poolData.apr ? `${Number(poolData.apr).toFixed(2)}%` : "-",
    rapr: poolData.rapr ? `${Number(poolData.rapr).toFixed(2)}%` : "-",
    totalapr: poolData.rapr
      ? `${(Number(poolData.rapr) + (poolData.apr
          ? Number(poolData.apr)
          : 0)
        ).toFixed(2)}%`
      : "-",
    volume: poolData.volume ? `$${Number(poolData.volume).toFixed(2)}` : "-",
    userBalanceUSD: formatBNToShortString(
      userShareData?.masterchefBalance?.userInfo.amount || Zero,
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
  const hasShare = !!userShareData?.masterchefBalance?.userInfo.amount.gt("0")

  const masterchefContract = new ethers.Contract(
    AXIAL_MASTERCHEF_CONTRACT_ADDRESS[43114],
    masterchef,
    library?.getSigner(),
  )

  const info = [
    {
      title: "Fee APR",
      value: `$${formattedData.apr}`,
    },
    {
      title: "Total APR",
      value: `$${formattedData.totalapr}`,
    },
    {
      title: "TVL",
      value: `$${formattedData.TVL}`,
    },
  ]

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
        {hasShare && (
          <div className="balance">
            <span>{t("balance")}: </span>
            <span>{`$${formattedData.userBalanceUSD}`}</span>
          </div>
        )}
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
          {info.map((item, index) => {
            return (
              <div key={index} className="margin">
                <span className="label">{item.title}</span>
                <span>{item.value}</span>
              </div>
            )
          })}
        </div>
        <div className="buttons">
          <Button
            size="medium"
            onClick={async () => {
              const POOL = POOLS_MAP[poolData.name]
              // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
              // eslint-disable-next-line @typescript-eslint/no-unsafe-call
              await masterchefContract.withdraw(POOL.lpToken.masterchefId, 0)
            }}
            disabled={userShareData?.masterchefBalance?.pendingTokens.pendingAxial.eq(
              "0x0",
            )}
            kind="secondary"
          >
            {t("claim")}
          </Button>
          <Link to={`${poolRoute}/withdraw`}>
            <Button size="medium" kind="secondary">
              {t("withdraw")}
            </Button>
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
                size="medium"
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
