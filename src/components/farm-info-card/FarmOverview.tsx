import "./FarmOverview.scss"

import {
  AXIAL_JLP_POOL_NAME,
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
import avaxIcon from "../../assets/icons/AVAX.png"
import axialLogo from "../../assets/icons/logo_icon.svg" // this needs a smaller icon logo(24)
import { LoadingWrapper } from "../shimmer"
import { analytics } from "../../utils/analytics"
import { BigNumber } from "ethers"
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
    axialPending: formatBNToShortString(
      userShareData?.masterchefBalance?.pendingTokens.pendingAxial || Zero,
      18,
    ),
    avaxPending: formatBNToShortString(
      userShareData?.masterchefBalance?.pendingTokens.pendingBonusToken || Zero,
      18,
    ),
    reserve: poolData.reserve
      ? formatBNToShortString(poolData.reserve, 18)
      : "-",
    apr: poolData.apr
      ? `${Number(poolData.apr).toFixed(2)}%`
      : poolData.apr === 0
      ? "0%"
      : "-",
    rapr: poolData.rapr
      ? `${Number(poolData.rapr).toFixed(2)}%`
      : poolData.rapr === 0
      ? "0%"
      : "-",
    extraapr: poolData.extraapr
      ? `${Number(poolData.extraapr).toFixed(2)}%`
      : null,
    totalapr: Number(poolData.rapr)
      ? (
          Number(poolData.rapr) +
          (poolData.apr ? Number(poolData.apr) : 0) +
          (poolData.extraapr ? Number(poolData.extraapr) : 0)
        ).toFixed(2) + "%"
      : poolData.rapr === 0
      ? "0%"
      : "-",
    volume: poolData.volume ? `$${Number(poolData.volume).toFixed(2)}` : "-",
    userBalanceUSD: userShareData
      ? formatBNToShortString(
          poolType === PoolTypes.LP
            ? userShareData.usdBalance
            : userShareData.masterchefBalance?.userInfo.amount || Zero,
          18,
        )
      : "",
    tokens: poolData.tokens.map((coin) => {
      const token = TOKENS_MAP[coin.symbol]
      return {
        symbol: token.symbol,
        name: token.name,
        icon: token.icon,
        value: formatBNToString(coin.value, token.decimals, formattedDecimals),
      }
    }),
    ammTokens:
      poolData.name === AXIAL_JLP_POOL_NAME //add other amm's if needed
        ? [
            {
              icon: avaxIcon,
              name: "Wrapped AVAX",
              symbol: "AVAX",
              value: "0",
            },
            {
              icon: axialLogo,
              name: "AxialToken",
              symbol: "AXIAL",
              value: "0",
            },
          ]
        : [],
  }
  const hasShare = !!userShareData?.masterchefBalance?.userInfo.amount.gt("0")

  const masterchefContract = new ethers.Contract(
    AXIAL_MASTERCHEF_CONTRACT_ADDRESS[43114],
    masterchef,
    library?.getSigner(),
  )
  let info = []

  if (hasShare) {
    info.push(
      {
        title: "Balance",
        value: `$${formattedData.userBalanceUSD}`,
      },
      {
        title: "Claimable",
        value: `${formattedData.axialPending}`,
      },
    )
  }

  if (poolType !== PoolTypes.LP) {
    info.push({
      title: "Rewards APR",
      value: `${formattedData.rapr}${
        formattedData.extraapr ? " + " + formattedData.extraapr : ""
      }`,
    })
  }

  info = info.concat([
    {
      title: "Total APR",
      value: `${formattedData.totalapr}`,
    },
    {
      title: "TVL",
      value: `$${formattedData.TVL}`,
    },
  ])

  if (poolData.name === "JLP AVAX-AXIAL") {
    poolData.tokens = [
      {
        percent: "24.19%",
        symbol: "TSD",
        value: BigNumber.from("0x012410c9d8d3e7774b6dfb"),
      },
    ]
  }

  const handleClaimClick = async () => {
    const POOL = POOLS_MAP[poolData.name]
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    // eslint-disable-next-line @typescript-eslint/no-unsafe-call
    await masterchefContract.withdraw(POOL.lpToken.masterchefId, 0)
    analytics.trackEvent({
      category: "Farm",
      action: "Claim",
      name: poolData.name,
    })
  }

  return (
    <div
      className={classNames("poolOverview", {
        outdated: isOutdated || shouldMigrate,
      })}
    >
      <div className="left">
        <div className="titleAndTag">
          {poolData.name === "JLP AVAX-AXIAL" ? (
            <a href="https://traderjoexyz.com/#/pool/0xB31f66AA3C1e785363F0875A1B74E27b85FD66c7/0xcf8419a615c57511807236751c0af38db4ba3351">
              <h4 className="title">{formattedData.name}</h4>
            </a>
          ) : (
            <h4 className="title">{formattedData.name}</h4>
          )}
          {(shouldMigrate || isOutdated) && <Tag kind="warning">OUTDATED</Tag>}
          {poolData.isPaused && <Tag kind="error">PAUSED</Tag>}
        </div>
        {
          //use local tokens if it's a native pool or amm if it's imported
          (formattedData.tokens.length > 0 ||
            formattedData.ammTokens.length > 0) && (
            <div className="tokens">
              <span>[</span>
              {(formattedData.ammTokens.length > 0
                ? formattedData.ammTokens
                : formattedData.tokens
              ).map(({ symbol, icon }) => (
                <div className="token" key={symbol}>
                  <img alt="icon" src={icon} />
                  <span>{symbol}</span>
                </div>
              ))}
              <span>]</span>
            </div>
          )
        }
      </div>

      <div className="right">
        <div className="poolInfo">
          {info.map((item, index) => {
            return (
              <div key={index} className="margin">
                <span className="label">{item.title}</span>
                <LoadingWrapper
                  height={19}
                  width={50}
                  isLoading={item.value === "-" || item.value === "$0.0"}
                >
                  <span>{item.value}</span>
                </LoadingWrapper>
              </div>
            )
          })}
        </div>
        <div className="buttons">
          <Button
            size="medium"
            onClick={handleClaimClick}
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
