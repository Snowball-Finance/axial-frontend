import "./farmDepositPage.scss"

import React, { ReactElement, useState } from "react"
import AdvancedOptions from "../../components/advance-options/AdvancedOptions"
import Button from "../../components/button/Button"

import ConfirmTransaction from "../../components/confirm-transaction/ConfirmTransaction"
import Modal from "../../components/modal/Modal"
import TokenInput from "../../components/token-input/TokenInput"
import TopMenu from "../../components/menu/TopMenu"
//import { logEvent } from "../../libs/googleAnalytics"
import { useTranslation } from "react-i18next"
import FarmInfoCard from "../../components/farm-info-card/FarmInfoCard"
import { BigNumber } from "ethers"
import InfoSection from "../../components/info-section/infoSection"
import { FarmDataRowType } from "../../components/farmWithdrawPage/types"

interface FarmDataType {

  reserve: string
  tokens: {
    icon: string,
    name?: string,
    symbol: string,
    percent?: string,
    value: string
  }[]

  isPaused: boolean

}


/* eslint-disable @typescript-eslint/no-explicit-any */
interface Props {
  title: string
  onConfirmTransaction: () => Promise<void>
  onChangeTokenInputValue: (tokenSymbol: string, value: string) => void
  onToggleDepositWrapped: () => void
  tokens: Array<{
    symbol: string
    name: string
    icon: string
    max: string
    inputValue: string
  }>
  myShareDataRows: FarmDataRowType[]
  stats: FarmDataRowType[],
  farmData: FarmDataType | null

}

/* eslint-enable @typescript-eslint/no-explicit-any */
const FarmDepositPage = (props: Props): ReactElement => {
  const { t } = useTranslation()
  const {
    tokens,
    farmData,
    myShareDataRows,
    stats,
    onChangeTokenInputValue,
  } = props

  const [currentModal, setCurrentModal] = useState<string | null>(null)

  return (
    <div className="deposit">
      <TopMenu activeTab={"farm"} />
      <div className="content">
        <div className="left">
          <div className="form">
            <h3>{t("addLiquidity")}</h3>
            {tokens.map((token, index) => (
              <div key={index}>
                <TokenInput
                  {...token}
                  disabled={farmData?.isPaused}
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
          </div>
          <AdvancedOptions />
          <Button
            kind="primary"
            onClick={(): void => {
              setCurrentModal("review")
            }}
          // disabled={!validDepositAmount || poolData?.isPaused}
          >
            {t("deposit")}
          </Button>
        </div>
        <div className="infoPanels">
          <InfoSection title="My Share" rows={
            myShareDataRows
          }
            withDivider
          />
          <InfoSection title="Stats" rows={
            stats
          }
            withDivider
          />

          {farmData && <FarmInfoCard tokens={farmData.tokens} reserve={farmData.reserve} />}
        </div>
        <Modal
          isOpen={!!currentModal}
          onClose={(): void => setCurrentModal(null)}
        >
          {/* {currentModal === "review" ? (
            <ReviewDeposit
              transactionData={transactionData}
              onConfirm={async (): Promise<void> => {
                setCurrentModal("confirm")
                await onConfirmTransaction?.()
                setCurrentModal(null)
              }}
              onClose={(): void => setCurrentModal(null)}
            />
          ) : null} */}
          {currentModal === "confirm" ? <ConfirmTransaction /> : null}
        </Modal>
      </div>
    </div>
  )
}

export default FarmDepositPage
