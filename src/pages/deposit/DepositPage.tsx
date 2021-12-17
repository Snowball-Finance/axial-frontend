import "./DepositPage.scss"

import { PoolDataType, UserShareType } from "../../hooks/usePoolData"
import React, { ReactElement, useState, useMemo } from "react"
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
import ToolTip from "../../components/tool-tip/ToolTip"
import { formatBNToPercentString } from "../../libs"
//import { logEvent } from "../../libs/googleAnalytics"
import { useTranslation } from "react-i18next"
import { PoolName } from "../../constants"
import { TransactionStatusType } from '../../hooks/useApproveAndDeposit'

/* eslint-disable @typescript-eslint/no-explicit-any */
interface Props {
  title: PoolName
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
  transactionStatus?: TransactionStatusType
}

/* eslint-enable @typescript-eslint/no-explicit-any */
const DepositPage = (props: Props): ReactElement => {
  const { t } = useTranslation()
  const {
    tokens,
    exceedsWallet,
    poolData,
    myShareData,
    transactionData,
    transactionStatus,
    shouldDepositWrapped,
    onChangeTokenInputValue,
    onConfirmTransaction,
    onToggleDepositWrapped,
  } = props


  const [currentModal, setCurrentModal] = useState<string | null>(null)

  const validDepositAmount = transactionData.to.totalAmount.gt(0)
  const shouldDisplayWrappedOption = false

  const isBalancedPool = useMemo(() => {
    const tokenCount = poolData?.tokens?.length || 0
    if (tokenCount > 2) {
      const threshold = tokenCount === 3 ? 25: tokenCount === 4 ? 20: 100 / (tokenCount + 1);
      for (const token of poolData?.tokens || []) {
        const percentValue = parseFloat(token.percent.replace('%', '')) || 0
        if (percentValue < threshold) {
          return false
        }
      }
    } else {
      return null
    }
    return true
  }, [poolData?.tokens])

  return (
    <div className="deposit">
      <div className="content">
        <div className="left">
          <div className="form">
            <h3>{t("addLiquidity")}</h3>
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
            <div className={"transactionInfoContainer"}>
              <div className="transactionInfo">
                <div className="transactionInfoItem">
                  {transactionData.priceImpact.gte(0) ? (
                    <span className="bonus">{`${t("bonus")}: `}</span>
                  ) : (
                    <span className="slippage">{t("priceImpact")}</span>
                  )}
                  <span
                    className={
                      "value " +
                      (transactionData.priceImpact.gte(0)
                        ? "bonus"
                        : "slippage")
                    }
                  >
                    {" "}
                    {formatBNToPercentString(
                      transactionData.priceImpact,
                      18,
                      4,
                    )}
                  </span>
                </div>
              </div>
            </div>
          </div>
          <AdvancedOptions noApprovalCheckbox={false} noSlippageCheckbox={false}/>
          {(isBalancedPool !== null && !isBalancedPool) && <div className="warning">
            <ToolTip content={t("unbalancedPoolTooltip")}>
              <h4>
                {t("unbalancedPool")}
              </h4>
            </ToolTip>
          </div>}
          <Button
            kind="primary"
            onClick={(): void => {
              setCurrentModal("review")
            }}
            disabled={!validDepositAmount || poolData?.isPaused || exceedsWallet}
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
          <PoolInfoCard data={poolData} />
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
          {currentModal === "confirm" &&
            <ConfirmTransaction
              transactionStatus={transactionStatus}
              type='deposit'
              transactionData={transactionData} />
          }
        </Modal>
      </div>
    </div>
  )
}

export default DepositPage
