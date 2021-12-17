import "./ConfirmTransaction.scss"

import React, { ReactElement } from "react"
import axialLogo from "../../assets/icons/logo_icon.svg"
import loadingGif from "../../assets/loading.gif"
import { useTranslation } from "react-i18next"
import TransactionSteps from "../transaction-steps/TransactionSteps"
import { DepositTransaction } from "../../interfaces/transactions"
import { TransactionStatusType } from '../../hooks/useApproveAndDeposit'

type Props = {
  transactionStatus?: TransactionStatusType
  type?: 'deposit' | 'withdraw' | undefined
  transactionData?: DepositTransaction
}

function ConfirmTransaction({ transactionStatus, type, transactionData }: Props): ReactElement {
  const { t } = useTranslation()

  return (
    <div className="confirmTransaction">
      <img src={axialLogo} />
      <h3>{t("confirmTransaction")}</h3>
      <img src={loadingGif} alt="loading..." className="loadingGif" />
      {transactionStatus &&
        <TransactionSteps
          type={type}
          transactionData={transactionData}
          transactionStatus={transactionStatus} />
      }
    </div>
  )
}

export default ConfirmTransaction
