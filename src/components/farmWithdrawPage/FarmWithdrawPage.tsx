import "./FarmWithdrawPage.scss"
import { PoolDataType, UserShareType } from "../../hooks/usePoolData"
import React, { ReactElement, useState } from "react"

import AdvancedOptions from "../advance-options/AdvancedOptions"
import { AppState } from "../../store"
import { BigNumber } from "@ethersproject/bignumber"
import Button from "../button/Button"
import ConfirmTransaction from "../confirm-transaction/ConfirmTransaction"
import Modal from "../modal/Modal"
import MyShareCard from "../my-share-card/MyShareCard"
import PoolInfoCard from "../pool-info-card/PoolInfoCard"
import ReviewWithdraw from "../reviews/ReviewWithdraw"
import TokenInput from "../token-input/TokenInput"
import { WithdrawFormState } from "../../hooks/useFarmWithdrawFormState"
import classNames from "classnames"
import { useSelector } from "react-redux"
import { useTranslation } from "react-i18next"
import { POOLS_MAP, PoolTypes } from "../../constants"
import { analytics } from "../../utils/analytics"
import { TransactionStatusType } from "../../hooks/useApproveAndDeposit"
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
  poolData: PoolDataType | null
  myShareData: UserShareType | null
  formStateData: WithdrawFormState
  onFormChange: (action: any) => void
  onConfirmTransaction: () => Promise<void>
  transactionStatus: TransactionStatusType
}
/* eslint-enable @typescript-eslint/no-explicit-any */

const FarmWithdrawPage = (props: Props): ReactElement => {
  const { t } = useTranslation()

  const {
    tokensData,
    poolData,
    myShareData,
    onFormChange,
    formStateData,
    reviewData,
    onConfirmTransaction,
    transactionStatus,
  } = props

  let poolType = PoolTypes.USD
  if (poolData) {
    const POOL = POOLS_MAP[poolData?.name]
    poolType = POOL.type
  }

  const { gasPriceSelected } = useSelector((state: AppState) => state.user)
  const [currentModal, setCurrentModal] = useState<string | null>(null)

  /* eslint-disable @typescript-eslint/no-unsafe-call */
  const noShare =
    !myShareData || myShareData.masterchefBalance?.userInfo.amount.eq("0x0")

  const handleWithdrawClick = async () => {
    //onSubmit
    setCurrentModal("confirm")
    await onConfirmTransaction?.()
    setCurrentModal(null)
    analytics.trackEvent({
      category: "withdraw",
      action: "withdraw",
      name: poolData?.name,
    })
  }

  return (
    <div className={"withdraw " + classNames({ noShare: noShare })}>
      <div className="content">
        <div className="left">
          <div className="form">
            <h3>{t("withdraw")}</h3>
            <div className="rangeSelector">
              <input
                type="range"
                min="0"
                max="100"
                step="5"
                onChange={(e: React.FormEvent<HTMLInputElement>): void =>
                  onFormChange({
                    fieldName: "percentage",
                    value: e.currentTarget.value,
                  })
                }
                onFocus={(e: React.ChangeEvent<HTMLInputElement>): void =>
                  e.target.select()
                }
                value={formStateData.percentage ? formStateData.percentage : 0}
              />
            </div>

            <div className="percentage">
              <span>{`${t("withdrawPercentage")} (%):`}</span>
              <input
                placeholder="100"
                onChange={(e: React.FormEvent<HTMLInputElement>): void =>
                  onFormChange({
                    fieldName: "percentage",
                    value: e.currentTarget.value,
                  })
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
                  // inputValue={parseFloat(token.inputValue).toFixed(5)}
                  onChange={(value): void =>
                    onFormChange({
                      fieldName: "tokenInputs",
                      value: value,
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
            <AdvancedOptions
              noApprovalCheckbox={true}
              noSlippageCheckbox={true}
            />
            <Button
              kind="primary"
              size="full"
            
              onClick={handleWithdrawClick}
            >
              {t("withdraw")}
            </Button>
          </div>
        </div>
        <div className="infoPanels">
          <div className="poolName">
            <p>{t("withdraw")}</p>
            <h1>{props.title}</h1>
          </div>
          <MyShareCard
            data={myShareData}
            useMasterchefAmount={true}
            usePendingMasterchef={true}
          />
          {poolType !== PoolTypes.LP && <PoolInfoCard data={poolData} />}
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
                analytics.trackEvent({
                  category: "withdraw",
                  action: "confirm",
                  name: poolData?.name,
                })
                await onConfirmTransaction?.()
                setCurrentModal(null)
              }}
              onClose={(): void => setCurrentModal(null)}
            />
          ) : null}
          {currentModal === "confirm" && (
            <ConfirmTransaction
              type="withdraw"
              transactionStatus={transactionStatus}
            />
          )}
        </Modal>
      </div>
    </div>
  )
}

export default FarmWithdrawPage
