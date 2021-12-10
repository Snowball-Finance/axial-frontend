import "./farmDepositPage.scss"

import { PoolDataType, UserShareType } from "../../hooks/usePoolData"
import React, { ReactElement, useState } from "react"
import AdvancedOptions from "../../components/advance-options/AdvancedOptions"
import Button from "../../components/button/Button"

import CheckboxInput from "../../components/checkbox-input/CheckboxInput"
import ConfirmTransaction from "../../components/confirm-transaction/ConfirmTransaction"
import { DepositTransaction } from "../../interfaces/transactions"
import Modal from "../../components/modal/Modal"
import MyShareCard from "../../components/my-share-card/MyShareCard"
import ReviewDeposit from "../../components/reviews/ReviewDeposit"
import TokenInput from "../../components/token-input/TokenInput"
//import { logEvent } from "../../libs/googleAnalytics"
import { useTranslation } from "react-i18next"
import InfoSection, {
  InfoSectionProps,
} from "../../components/info-section/infoSection"
import FarmInfoCard from "../../components/farm-info-card/FarmInfoCard"
import { POOLS_MAP, PoolTypes } from "../../constants"
import { useAnalytics } from "../../utils/analytics"
interface Props {
  title: string
  onConfirmTransaction: () => Promise<void>
  onChangeTokenInputValue: (tokenSymbol: string, value: string) => void
  onToggleDepositWrapped: () => void
  shouldDepositWrapped: boolean
  tokens: Array<{
    symbol: string
    name: string
    icon: string
    max: string
    inputValue: string
  }>
  exceedsWallet: boolean
  poolData: PoolDataType | null
  myShareData: UserShareType | null
  transactionData: DepositTransaction
}

/* eslint-enable @typescript-eslint/no-explicit-any */
const FarmDepositPage = (props: Props): ReactElement => {
  const { t } = useTranslation()

  const { trackEvent } = useAnalytics()

  const {
    tokens,
    exceedsWallet,
    poolData,
    myShareData,
    transactionData,
    shouldDepositWrapped,
    onChangeTokenInputValue,
    onConfirmTransaction,
    onToggleDepositWrapped,
  } = props

  const [currentModal, setCurrentModal] = useState<string | null>(null)

  const validDepositAmount = true
  const shouldDisplayWrappedOption = false

  let poolType = PoolTypes.USD
  if (poolData) {
    const POOL = POOLS_MAP[poolData?.name]
    poolType = POOL.type
  }

  const statsDataRows: InfoSectionProps["rows"] = [
    {
      title: "Total APR",
      value: poolData?.rapr
        ? `${(
          Number(poolData?.rapr) +
          (poolData.apr ? Number(poolData?.apr) : 0) +
          (poolData.extraapr ? Number(poolData?.extraapr) : 0)
        ).toFixed(2)}%`
        : poolData?.rapr === 0 ? "0%" : "-",
    },
  ]

  if (poolType !== PoolTypes.LP) {
    statsDataRows.push(
      {
        title: "Fee APR",
        value: poolData?.apr ? `${Number(poolData?.apr).toFixed(2)}%` : poolData?.rapr === 0 ? "0%" : "-",
      },
      {
        title: "Rewards APR",
        value: poolData?.rapr ? `${Number(poolData?.rapr).toFixed(2)}%` +
          (poolData?.extraapr ? ` + ${Number(poolData?.extraapr).toFixed(2)}%` : "")
          : poolData?.rapr === 0 ? "0%" : "-",
      },
    )
  }

  return (
    <div className="deposit">
      <div className="content">
        <div className="left">
          <div className="form">
            <h3>{t("depositWrapped")}</h3>
            {exceedsWallet ? (
              <div className="error">{t("depositBalanceExceeded")}</div>
            ) : null}
            {tokens.map((token, index) => (
              <div key={index}>
                <TokenInput
                  {...token}
                  disabled={poolData?.isPaused}
                  onChange={(value): void =>
                    onChangeTokenInputValue(token.symbol, value)
                  }
                />
                {index === tokens.length - 1 ? (
                  ""
                ) : (
                  <div className="formSpace"></div>
                )}
              </div>
            ))}
            {shouldDisplayWrappedOption && (
              <div className="wrappedDeposit">
                <CheckboxInput
                  onChange={onToggleDepositWrapped}
                  checked={shouldDepositWrapped}
                />
                <span>{t("depositWrapped")}</span>
              </div>
            )}
          </div>
          <AdvancedOptions
            noApprovalCheckbox={false}
            noSlippageCheckbox={true}
          />
          <Button
            kind="primary"
            onClick={async () => {
              setCurrentModal("confirm")
              await onConfirmTransaction?.()
              setCurrentModal(null)
              trackEvent({
                category: "Deposit",
                action: "Deposit",
                name: "Confirm",
              })
              //setCurrentModal("review")
            }}
            disabled={!validDepositAmount || poolData?.isPaused}
          >
            {t("deposit")}
          </Button>
          <p>or</p>
          <a
            target="_blank"
            rel="noreferrer"
            href="https://app.snowball.network/compound-and-earn"
          >
            <Button kind="primary">{t("Compound with Snowball")}</Button>
          </a>{" "}
        </div>
        <div className="infoPanels">
          <MyShareCard
            data={myShareData}
            usePendingMasterchef={true}
            useMasterchefAmount={true}
          />
          <div
            style={{
              display: myShareData ? "block" : "none",
            }}
            className="divider"
          ></div>
          <InfoSection title="Stats" withDivider rows={statsDataRows} />

          {poolType !== PoolTypes.LP && <FarmInfoCard data={poolData} />}
        </div>
        <Modal
          isOpen={!!currentModal}
          onClose={(): void => setCurrentModal(null)}
        >
          {currentModal === "review" ? (
            <ReviewDeposit
              transactionData={transactionData}
              onConfirm={async (): Promise<void> => {
                setCurrentModal("confirm")
                await onConfirmTransaction?.()
                setCurrentModal(null)
              }}
              onClose={(): void => setCurrentModal(null)}
            />
          ) : null}
          {currentModal === "confirm" ? <ConfirmTransaction /> : null}
        </Modal>
      </div>
    </div>
  )
}

export default FarmDepositPage
