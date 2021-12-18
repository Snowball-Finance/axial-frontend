import "./MyShareCard.scss"

import { FXS, ORCA, POOLS_MAP, PoolTypes, TEDDY, TOKENS_MAP, WAVAX } from "../../constants"
import React, { ReactElement } from "react"
import { formatBNToPercentString, formatBNToString } from "../../libs"
import { UserShareType } from "../../hooks/usePoolData"
import { commify } from "@ethersproject/units"
import { useTranslation } from "react-i18next"
import { BigNumber } from "@ethersproject/bignumber"

interface Props {
  data: UserShareType | null
  useUsd?: boolean | null
  usePercent?: boolean | null
  useMasterchefAmount?: boolean | null
  usePendingMasterchef?: boolean | null
}

function MyShareCard({
  data,
  useUsd = true,
  usePercent = true,
  useMasterchefAmount = false,
  usePendingMasterchef = false,
}: Props): ReactElement | null {
  const { t } = useTranslation()

  if (!data) return null
  const { type: poolType } = POOLS_MAP[data.name]
  const formattedDecimals = poolType === PoolTypes.USD ? 2 : 4
  let hasAVAX = false, hasFXS = false, hasTEDDY = false,
    hasORCA = false; 

  if(data.masterchefBalance){
    hasAVAX = 
      data.masterchefBalance?.pendingTokens?.bonusTokenAddress?.toLowerCase() 
      === WAVAX.addresses[43114].toLowerCase()

    hasFXS = 
      data.masterchefBalance?.pendingTokens?.bonusTokenAddress?.toLowerCase() 
      === FXS.addresses[43114].toLowerCase()

    hasTEDDY = 
      data.masterchefBalance?.pendingTokens?.bonusTokenAddress?.toLowerCase() 
      === TEDDY.addresses[43114].toLowerCase()
    
    hasORCA = 
      data.masterchefBalance?.pendingTokens?.bonusTokenAddress?.toLowerCase() 
      === ORCA.addresses[43114].toLowerCase()
  }

  const formattedData = {
    share: formatBNToPercentString(data.share, 18),
    usdBalance: commify(formatBNToString(data.usdBalance, 18, 2)),
    amount: commify(
      formatBNToString(
        useMasterchefAmount && data.masterchefBalance?.userInfo.amount
          ? data.masterchefBalance?.userInfo.amount
          : useMasterchefAmount
          ? BigNumber.from("0")
          : data.underlyingTokensAmount,
        18,
        formattedDecimals,
      ),
    ),
    tokens: data.tokens.map((coin) => {
      const token = TOKENS_MAP[coin.symbol]
      return {
        symbol: token.symbol,
        name: token.name,
        value: commify(formatBNToString(coin.value, 18, formattedDecimals)),
      }
    }),
    rewards: {
      avaxRewards: commify(
        formatBNToString(
          data.masterchefBalance?.pendingTokens && hasAVAX
            ? data.masterchefBalance?.pendingTokens?.pendingBonusToken
            : BigNumber.from("0"),
          18,
          formattedDecimals,
        ),
      ),
      teddyRewards: commify(
        formatBNToString(
          data.masterchefBalance?.pendingTokens && hasTEDDY
            ? data.masterchefBalance?.pendingTokens?.pendingBonusToken
            : BigNumber.from("0"),
          18,
          formattedDecimals,
        ),
      ),
      fxsRewards: commify(
        formatBNToString(
          data.masterchefBalance?.pendingTokens && hasFXS
            ? data.masterchefBalance?.pendingTokens?.pendingBonusToken
            : BigNumber.from("0"),
          18,
          formattedDecimals,
        ),
      ),
      orcaRewards: commify(
        formatBNToString(
          data.masterchefBalance?.pendingTokens && hasORCA
            ? data.masterchefBalance?.pendingTokens?.pendingBonusToken
            : BigNumber.from("0"),
          18,
          formattedDecimals,
        ),
      ),
      axialRewards: commify(
        formatBNToString(
          data.masterchefBalance?.pendingTokens?.pendingAxial
            ? data.masterchefBalance?.pendingTokens?.pendingAxial
            : BigNumber.from("0"),
          18,
          formattedDecimals,
        ),
      ),
    },
  }

  return (
    <div className="myShareCard">
      <h4>{t("myShare")}</h4>
      <div className="info">
        {usePercent ? (
          <div className="poolShare">
            <span>
              {formattedData.share} {t("ofPool")}
            </span>
          </div>
        ) : null}
        {useUsd ? (
          <div className="infoItem">
            <span className="bold">{`${t("usdBalance")}: `}</span>
            <span className="value">{`$${formattedData.usdBalance}`}</span>
          </div>
        ) : null}
        <div className="infoItem">
          <span className="bold">{`${t("totalAmount")}: `}</span>
          <span className="value">{formattedData.amount}</span>
        </div>
        {usePendingMasterchef ? (
          <div className="infoItem">
            <span className="bold">{`${t("axialRewards")}: `}</span>
            <span className="value">{formattedData.rewards.axialRewards}</span>
          </div>
        ) : null}
        {usePendingMasterchef && hasAVAX ? (
          <div className="infoItem">
            <span className="bold">{`${t("avaxRewards")}: `}</span>
            <span className="value">{formattedData.rewards.avaxRewards}</span>
          </div>
        ) : null}
      {usePendingMasterchef && hasTEDDY ? (
          <div className="infoItem">
            <span className="bold">{`${t("teddyRewards")}: `}</span>
            <span className="value">{formattedData.rewards.teddyRewards}</span>
          </div>
        ) : null}
      {usePendingMasterchef && hasFXS ? (
          <div className="infoItem">
            <span className="bold">{`${t("fraxRewards")}: `}</span>
            <span className="value">{formattedData.rewards.fxsRewards}</span>
          </div>
        ) : null}
      {usePendingMasterchef && hasORCA ? (
          <div className="infoItem">
            <span className="bold">{`${t("orcaRewards")}: `}</span>
            <span className="value">{formattedData.rewards.orcaRewards}</span>
          </div>
        ) : null}
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
