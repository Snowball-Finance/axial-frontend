import styles from "./PoolOverview.module.scss"

import { POOLS_MAP, PoolTypes, TOKENS_MAP } from "../../constants"
import { PoolDataType, UserShareType } from "../../hooks/usePoolData"
import React, { ReactElement } from "react"
import { formatBNToShortString, formatBNToString, commify } from "../../libs"
import Button from "../button/Button"
import { Link } from "react-router-dom"
import { Zero } from "@ethersproject/constants"
import classNames from "classnames"
import { useTranslation } from "react-i18next"
import { LoadingWrapper } from "../shimmer"

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
      : "",
    apr: poolData.apr
      ? `${Number(poolData.apr).toFixed(2)}%`
      : poolData.apr === 0
      ? " - "
      : "-",
    volume: poolData.volume
      ? `$${commify(Number(poolData.volume).toFixed(2))}`
      : poolData.volume === 0
      ? " - "
      : "-",
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
      className={classNames([styles.poolOverview], {
        outdated: isOutdated || shouldMigrate,
      })}
    >
      <div className={styles.left}>
        <div className={styles.titleAndTag}>
          <h4 className={styles.title}>{formattedData.name}</h4>
          {(shouldMigrate || isOutdated) && <Tag kind="warning">OUTDATED</Tag>}
          {poolData.isPaused && <Tag kind="error">PAUSED</Tag>}
        </div>
        <div className={styles.tokens}>
          <LoadingWrapper
            height={19}
            width={140}
            isLoading={formattedData.tokens.length === 0}
          >
            <>
              {formattedData.tokens.map(({ symbol, icon }) => (
                <div className={styles.token} key={symbol}>
                  <img alt="icon" src={icon} />
                  <span>{symbol}</span>
                </div>
              ))}
            </>
          </LoadingWrapper>
        </div>
      </div>

      <div className={styles.right}>
        <div className={styles.poolInfo}>
          {hasShare && (
            <div className={styles.margin}>
              <div className={styles.label}>{`${t("balance")}`}</div>
              <span>{formattedData.userBalanceUSD}</span>
            </div>
          )}
          {formattedData.apr && (
            <div className={styles.margin}>
              <div className={styles.label}>{`${t("apr")}`}</div>
              <LoadingWrapper
                height={19}
                width={90}
                isLoading={formattedData.apr === "-"}
              >
                <span>{formattedData.apr}</span>
              </LoadingWrapper>
            </div>
          )}
          <div className={styles.margin}>
            <div className={styles.label}>TVL</div>
            <LoadingWrapper
              height={19}
              width={55}
              isLoading={!formattedData.reserve}
            >
              <span> {`$${formattedData.reserve}`}</span>
            </LoadingWrapper>
          </div>
          {formattedData.volume && (
            <div className={styles.margin}>
              <div className={styles.label}>{`${t("24HrVolume")}`}</div>
              <LoadingWrapper
                height={19}
                width={90}
                isLoading={formattedData.volume === "-"}
              >
                <span>{formattedData.volume}</span>
              </LoadingWrapper>
            </div>
          )}
        </div>
        <div className={styles.buttons}>
          <Link to={`${poolRoute}/withdraw`}>
            <Button kind="secondary-new" size="medium">
              {t("withdraw")}
            </Button>
          </Link>
          {shouldMigrate ? (
            <Button
              kind="temporary"
              size="medium"
              onClick={onClickMigrate}
              disabled={!hasShare}
            >
              {t("migrate")}
            </Button>
          ) : (
            <Link to={`${poolRoute}/deposit`}>
              <Button
                kind="primary-new"
                size="medium"
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
  return <span className={classNames([styles.tag], kind)} {...tagProps} />
}
