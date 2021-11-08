import "./MyShareCard.scss"

import { POOLS_MAP, PoolTypes, TOKENS_MAP } from "../../constants"
import React, { ReactElement } from "react"
import { formatBNToPercentString, formatBNToString } from "../../libs"
import { UserShareType } from "../../hooks/usePoolData"
import { commify } from "@ethersproject/units"
import { useTranslation } from "react-i18next"

interface Props {
  data: UserShareType | null
}

function MyShareCard({ data }: Props): ReactElement | null {
  const { t } = useTranslation()

  if (!data) return null
  const { type: poolType } = POOLS_MAP[data.name]
  const formattedDecimals = poolType === PoolTypes.USD ? 2 : 4

  const formattedData = {
    share: formatBNToPercentString(data.share, 18),
    usdBalance: commify(formatBNToString(data.usdBalance, 18, 2)),
    amount: commify(
      formatBNToString(data.underlyingTokensAmount, 18, formattedDecimals),
    ),
    tokens: data.tokens.map((coin) => {
      const token = TOKENS_MAP[coin.symbol]
      return {
        symbol: token.symbol,
        name: token.name,
        value: commify(formatBNToString(coin.value, 18, formattedDecimals)),
      }
    }),
  }

  return (
    <div className="myShareCard">
      <h4>{t("myShare")}</h4>
      <div className="info">
        <div className="poolShare">
          <span>
            {formattedData.share} {t("ofPool")}
          </span>
        </div>
        <div className="infoItem">
          <span className="bold">{`${t("usdBalance")}: `}</span>
          <span className="value">{`$${formattedData.usdBalance}`}</span>
        </div>
        <div className="infoItem">
          <span className="bold">{`${t("totalAmount")}: `}</span>
          <span className="value">{formattedData.amount}</span>
        </div>
      </div>
      <div className="currency">
        {/*formattedData.tokens.map((coin) => (
          <div key={coin.symbol}>
            <span className="tokenName">{coin.symbol}</span>
            <span className="tokenValue">{coin.value}</span>
          </div>
        ))*/}
      </div>
    </div>
  )
}

export default MyShareCard
