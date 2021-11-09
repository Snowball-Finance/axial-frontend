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
import PoolInfoCard from "../../components/pool-info-card/PoolInfoCard"
import ReviewDeposit from "../../components/reviews/ReviewDeposit"
import TokenInput from "../../components/token-input/TokenInput"
import TopMenu from "../../components/menu/TopMenu"
import { formatBNToPercentString } from "../../libs"
//import { logEvent } from "../../libs/googleAnalytics"
import { useTranslation } from "react-i18next"
import InfoSection, { InfoSectionProps } from "../../components/info-section/infoSection"
import FarmInfoCard from "../../components/farm-info-card/FarmInfoCard"
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
  selected?: { [key: string]: any }
  poolData: PoolDataType | null
  myShareData: UserShareType | null
  transactionData: DepositTransaction
}

/* eslint-enable @typescript-eslint/no-explicit-any */
const FarmDepositPage = (props: Props): ReactElement => {
  const { t } = useTranslation()
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


  const statsDataRows: InfoSectionProps['rows'] = [
    {
      title: "Fee APR",
      value: '-'
    },
    {
      title: "Rewards APR",
      value: '-'
    },
    {
      title: "Total APR",
      value: '-'
    },
  ]

  console.log({ exceedsWallet, poolData })


  return (
    <div className="deposit">
      <TopMenu activeTab={"farms"} />

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
          <AdvancedOptions noApprovalCheckbox={false} noSlippageCheckbox={true} />
          <Button
            kind="primary"
            onClick={async () => {
              setCurrentModal("confirm")
              await onConfirmTransaction?.()
              setCurrentModal(null)
              //setCurrentModal("review")
            }}
            disabled={!validDepositAmount || poolData?.isPaused}
          >
            {t("deposit")}
          </Button>
        </div>
        <div className="infoPanels">
          <MyShareCard data={myShareData} />
          <div
            style={{
              display: myShareData ? "block" : "none",
            }}
            className="divider"
          ></div>
          <InfoSection title="Stats" withDivider rows={statsDataRows} />

          <FarmInfoCard data={poolData} />
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
