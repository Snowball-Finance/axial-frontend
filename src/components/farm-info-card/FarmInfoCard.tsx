import "./FarmInfoCard.scss"

import {
  POOLS_MAP,
  POOL_FEE_PRECISION,
  PoolTypes,
  TOKENS_MAP,
} from "../../constants"
import React, { ReactElement } from "react"
import { formatBNToPercentString, formatBNToString } from "../../libs"

import { PoolDataType } from "../../hooks/usePoolData"
import ToolTip from "../tool-tip/ToolTip"
import { commify } from "@ethersproject/units"
import { useTranslation } from "react-i18next"
import { LoadingWrapper } from "../shimmer"

interface Props {
  data: PoolDataType | null
}

function FarmInfoCard({ data }: Props): ReactElement | null {
  const { t } = useTranslation()
  if (data == null) return null
  const { type: poolType, underlyingPool } = POOLS_MAP[data?.name]
  const formattedDecimals = poolType === PoolTypes.USD ? 2 : 4
  const swapFee = data?.swapFee
    ? formatBNToPercentString(data.swapFee, POOL_FEE_PRECISION)
    : null
  const adminFee = data?.adminFee
    ? formatBNToPercentString(data.adminFee, POOL_FEE_PRECISION)
    : null
  const formattedData = {
    name: data?.name,
    swapFee,
    aParameter: data?.aParameter
      ? commify(formatBNToString(data.aParameter, 0, 0))
      : "-",
    virtualPrice: data?.virtualPrice
      ? commify(formatBNToString(data.virtualPrice, 18, 5))
      : "-",
    utilization: data?.utilization
      ? formatBNToPercentString(data.utilization, 18, 0)
      : "-",
    reserve: data?.reserve
      ? commify(formatBNToString(data.reserve, 18, 2))
      : "-",
    adminFee: swapFee && adminFee ? `${adminFee} of ${swapFee}` : null,
    volume: data?.volume ? commify(data.volume) : "-",
    tokens:
      data?.tokens.map((coin) => {
        const token = TOKENS_MAP[coin.symbol]
        return {
          symbol: token.symbol,
          name: token.name,
          icon: token.icon,
          percent: coin.percent,
          value: commify(formatBNToString(coin.value, 18, formattedDecimals)),
        }
      }) || [],
  }

  return (
    <div className="poolInfoCard">
      {underlyingPool ? (
        <ToolTip content={t("metapool")}>
          <h4 className="underline">{formattedData.name}</h4>
        </ToolTip>
      ) : (
        ''
      )}
      <div className="info">

      </div>
      <div className="bottom">
        <h4>{t("currencyReserves")}</h4>
        <LoadingWrapper width={130} isLoading={formattedData.reserve === '-'}>
          <span>{`$${formattedData.reserve} ${t("inTotal")}`}</span>
        </LoadingWrapper>
        <div className="tokenList">
          {formattedData.tokens.map((token, index) => (
            <div className="token" key={index}>
              <img alt="icon" src={token.icon} />
              <span className="bold">{`${token.symbol} ${token.percent}`}</span>
              <span className="tokenValue">{token.value}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default FarmInfoCard
