import "./FarmWithdrawPage.scss"
import React, { ReactElement, useState } from "react"
import AdvancedOptions from "../advance-options/AdvancedOptions"
import { AppState } from "../../store"
import { BigNumber } from "@ethersproject/bignumber"
import Button from "../button/Button"
import ConfirmTransaction from "../confirm-transaction/ConfirmTransaction"
import Modal from "../modal/Modal"

import ReviewWithdraw from "../reviews/ReviewWithdraw"
import TokenInput from "../token-input/TokenInput"
import TopMenu from "../menu/TopMenu"
import { WithdrawFormState } from "../../hooks/useWithdrawFormState"
import { Zero } from "@ethersproject/constants"
import classNames from "classnames"
import { logEvent } from "../../libs/googleAnalytics"
import { useSelector } from "react-redux"
import { useTranslation } from "react-i18next"
import FarmInfoCard from "../farm-info-card/FarmInfoCard"
import InfoSection from "../info-section/infoSection"

export interface ReviewWithdrawData {
  withdraw: {
    name: string
    value: string
    icon: string
  }[]
  rates: {
    name: string
    value: string
    rate: string
  }[]
  slippage: string
  priceImpact: BigNumber
  txnGasCost: {
    amount: BigNumber
    valueUSD: BigNumber | null // amount * ethPriceUSD
  }
}

interface FarmUserShareData {
  name: string;
  share: BigNumber;
  dataRows: ({
    title: string;
    value: string;
    sub: string;
  } | {
    title: string;
    value: string;
  })[];
  lpTokenBalance: BigNumber;
}


/* eslint-disable @typescript-eslint/no-explicit-any */
interface Props {
  title: string
  tokensData: Array<{
    symbol: string
    name: string
    icon: string
    inputValue: string
  }>
  reviewData: ReviewWithdrawData
  selected?: { [key: string]: any }
  farmData: {
    name: string;
    tokens: {
      icon: string;
      name: string;
      symbol: string;
      value: string;
    }[];
    reserve: string;
    isPaused?: boolean
  } | null
  myShareData: FarmUserShareData | null
  formStateData: WithdrawFormState
  onWithdrawPercentChange: (percent: string) => void
  onTokenValueChange: ({ tokenValue, tokenSymbol }: { tokenValue: string, tokenSymbol: string }) => void
  onConfirmTransaction: () => Promise<void>
}
/* eslint-enable @typescript-eslint/no-explicit-any */

const FarmWithdrawPage = (props: Props): ReactElement => {
  const { t } = useTranslation()
  const {
    tokensData,
    farmData,
    myShareData,
    onTokenValueChange,
    onWithdrawPercentChange,
    formStateData,
    reviewData,
    onConfirmTransaction,
  } = props

  const { gasPriceSelected } = useSelector((state: AppState) => state.user)
  const [currentModal, setCurrentModal] = useState<string | null>(null)

  const onSubmit = (): void => {
    setCurrentModal("review")
  }
  const noShare = !myShareData || myShareData.lpTokenBalance.eq(Zero)

  return (
    <div className={"withdraw " + classNames({ noShare: noShare })}>
      <TopMenu activeTab={"farm"} />
      <div className="content">
        <div className="left">
          <div className="form">
            <h3>{t("withdraw")}</h3>
            <div className="percentage">
              <span>{`${t("withdrawPercentage")} (%):`}</span>
              <input
                placeholder="100"
                onChange={(e: React.FormEvent<HTMLInputElement>): void =>
                  onWithdrawPercentChange(
                    e.currentTarget.value,
                  )
                }
                onFocus={(e: React.ChangeEvent<HTMLInputElement>): void =>
                  e.target.select()
                }
                value={formStateData.percentage ? formStateData.percentage : ""}
              />
              {formStateData.error && (
                <div className="error">{formStateData.error.message}</div>
              )}
            </div>

            {tokensData.map((token, index) => (
              <div key={index}>
                <TokenInput
                  {...token}
                  onChange={(value): void =>
                    onTokenValueChange({
                      tokenValue: value,
                      tokenSymbol: token.symbol,
                    })
                  }
                />
                {index === tokensData.length - 1 ? (
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
            disabled={
              noShare ||
              !!formStateData.error ||
              formStateData.lpTokenAmountToSpend.isZero()
            }
            onClick={onSubmit}
          >
            {t("withdraw")}
          </Button>
        </div>
        <div className="infoPanels">
          {myShareData && <InfoSection title="My Share" rows={myShareData.dataRows} />}
          {farmData && <FarmInfoCard tokens={farmData.tokens} reserve={farmData.reserve} />}
        </div>
        <Modal
          isOpen={!!currentModal}
          onClose={(): void => setCurrentModal(null)}
        >
          {currentModal === "review" ? (
            <ReviewWithdraw
              data={reviewData}
              gas={gasPriceSelected}
              onConfirm={async (): Promise<void> => {
                setCurrentModal("confirm")
                logEvent(
                  "withdraw",
                  (farmData && { pool: farmData?.name }) || {},
                )
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

export default FarmWithdrawPage
