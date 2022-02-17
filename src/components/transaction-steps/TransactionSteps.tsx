import "./TransactionSteps.scss"

import React, { ReactElement } from "react"
import { TransactionStatusType } from "../../hooks/useApproveAndDeposit"
import { DepositTransaction } from "../../interfaces/transactions"
import { POOLS_MAP } from "../../constants"

type Props = {
  type: "deposit" | "withdraw" | undefined
  transactionData?: DepositTransaction
  transactionStatus: TransactionStatusType
}

function TransactionSteps({ type, transactionData, transactionStatus }: Props): ReactElement | null {
  if (type === "deposit") {
    return (
      <div className="oneLine">
        <div>
          <h4>Approval</h4>
          <div className="oneLine">
            {(transactionData?.from?.items || []).map((item) => (
              <div key={item.token.symbol} className="stepItem">
                <div className={transactionStatus?.approve?.[item.token.symbol] ? "dot checked" : "dot unchecked"} />
                <img src={item.token.icon} className="tokenIcon" alt="token-icon" />
                <div>{item.token.symbol}</div>
              </div>
            ))}
          </div>
        </div>
        <div className="stepItem">
          <h4>Deposit</h4>
          <div className={transactionStatus?.deposit ? "dot checked" : "dot unchecked"} />
        </div>
      </div>
    )
  } else if (type === "withdraw") {
    return (
      <div className="oneLine">
        <div>
          <h4>Approval</h4>
          <div className="oneLine">
            {Object.keys(transactionStatus?.approve || {}).map((key) => (
              <div key={key} className="stepItem">
                <div className={transactionStatus?.approve?.[key] ? "dot checked" : "dot unchecked"} />
                <img src={POOLS_MAP[key].lpToken.icon} className="tokenIcon" alt="token-icon" />
                <div>{POOLS_MAP[key].lpToken.symbol}</div>
              </div>
            ))}
          </div>
        </div>
        <div className="stepItem">
          <h4>Withdraw</h4>
          <div className={transactionStatus?.withdraw ? "dot checked" : "dot unchecked"} />
        </div>
      </div>
    )
  }
  return null
}

export default TransactionSteps
