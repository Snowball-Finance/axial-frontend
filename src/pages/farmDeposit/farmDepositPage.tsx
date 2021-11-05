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
import InfoCard from "../../components/info-card/infoCard"

interface FarmDataType {
  adminFee: BigNumber
  aParameter: BigNumber
  apy: number | null
  rapy: number | null
  name: string
  reserve: BigNumber | null
  swapFee: BigNumber
  tokens: {
    symbol: string,
    percent: string,
    value: BigNumber
  }[]
  totalLocked: BigNumber
  utilization: BigNumber | null
  virtualPrice: BigNumber
  volume: number | null
  isPaused: boolean
  lpTokenPriceUSD: BigNumber
  lpToken: string
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
  exceedsWallet: boolean
  selected?: { [key: string]: any }
  farmData: FarmDataType | null | any

}

/* eslint-enable @typescript-eslint/no-explicit-any */
const FarmDepositPage = (props: Props): ReactElement => {
  const { t } = useTranslation()
  const {
    tokens,
    farmData,
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
          <InfoCard title="My Share" rows={
            [
              {
                title: "my TVL",
                value: "2523($2523)",
                sub: "0.0% of pool"
              },
              {
                title: 'axial Rewards',
                value: '2211($1212)'
              },
              {
                title: 'AVAX Rewards',
                value: '2211($1212)'
              },
            ]
          }
            withDivider
          />
          <InfoCard title="Stats" rows={
            [
              {
                title: "fee APR",
                value: "2523($2523)",

              },
              {
                title: 'Revard APR',
                value: '2211($1212)'
              },
              {
                title: 'total APR',
                value: '2211($1212)'
              },
            ]
          }
            withDivider
          />

          <FarmInfoCard tokens={farmData.tokens} reserve={farmData.reserve} />
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
