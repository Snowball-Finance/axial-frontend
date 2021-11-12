import "./SwapPage.scss"
import React, { ReactElement, useMemo, useState } from "react"
import { SWAP_TYPES, getIsVirtualSwap } from "../../constants"
import { formatBNToPercentString, formatBNToString } from "../../libs"
import AdvancedOptions from "../../components/advance-options/AdvancedOptions"
import { AppState } from "../../store/index"
import { BigNumber } from "@ethersproject/bignumber"
import Button from "../../components/button/Button"
import ConfirmTransaction from "../../components/confirm-transaction/ConfirmTransaction"
import { ReactComponent as InfoIcon } from "../../assets/icons/info.svg"
import Modal from "../../components/modal/Modal"
import ReviewSwap from "../../components/reviews/ReviewSwap"
import { Slippages } from "../../store/module/user"
import SwapInput from "../../components/swap-input/SwapInput"
import type { TokenOption } from "../../pages/swap/Swap"
import { Zero } from "@ethersproject/constants"
import classNames from "classnames"
import { commify } from "../../libs"
import { isHighPriceImpact } from "../../libs/priceImpact"
import { logEvent } from "../../libs/googleAnalytics"
import { useActiveWeb3React } from "../../hooks"
import { useSelector } from "react-redux"
import { useTranslation } from "react-i18next"

interface Props {
  tokenOptions: {
    from: TokenOption[]
    to: TokenOption[]
  }
  exchangeRateInfo: {
    pair: string
    exchangeRate: BigNumber
    priceImpact: BigNumber
    route: string[]
  }
  txnGasCost: {
    amount: BigNumber
    valueUSD: BigNumber | null // amount * ethPriceUSD
  }
  error: string | null
  swapType: SWAP_TYPES
  fromState: { symbol: string; value: string; valueUSD: BigNumber }
  toState: { symbol: string; value: string; valueUSD: BigNumber }
  onChangeFromToken: (tokenSymbol: string) => void
  onChangeFromAmount: (amount: string) => void
  onChangeToToken: (tokenSymbol: string) => void
  onConfirmTransaction: () => Promise<void>
  onClickReverseExchangeDirection: () => void
}

const SwapPage = (props: Props): ReactElement => {
  const { t } = useTranslation()
  const { account } = useActiveWeb3React()
  const {
    tokenOptions,
    exchangeRateInfo,
    txnGasCost,
    error,
    fromState,
    toState,
    swapType,
    onChangeFromToken,
    onChangeFromAmount,
    onChangeToToken,
    onConfirmTransaction,
    onClickReverseExchangeDirection,
  } = props

  const [currentModal, setCurrentModal] = useState<string | null>(null)

  const { slippageCustom, slippageSelected } = useSelector(
    (state: AppState) => state.user,
  )

  const fromToken = useMemo(() => {
    return tokenOptions.from.find(({ symbol }) => symbol === fromState.symbol)
  }, [tokenOptions.from, fromState.symbol])

  const formattedPriceImpact = commify(
    formatBNToPercentString(exchangeRateInfo.priceImpact, 18),
  )
  const formattedExchangeRate = commify(
    formatBNToString(exchangeRateInfo.exchangeRate, 18, 6),
  )
  const formattedRoute = exchangeRateInfo.route.join(" > ")
  const formattedBalance = commify(
    formatBNToString(fromToken?.amount || Zero, fromToken?.decimals || 0, 6),
  )
  const isVirtualSwap = getIsVirtualSwap(swapType)
  const isHighSlippage =
    slippageSelected === Slippages.OneTenth ||
    (slippageSelected === Slippages.Custom &&
      parseFloat(slippageCustom?.valueRaw || "0") < 0.5)

  const modalData = {
    from: fromState,
    to: toState,
    exchangeRateInfo,
    txnGasCost,
    swapType,
  }

  return (
    <div className="swapPage">
      <div className="content">
        <div className="swapForm">
          <div className="row">
            <h3 className="swapTitle">{t("from")}</h3>
            <div className="balanceContainer">
              <span>{t("balance")}:</span>
              &nbsp;
              <a
                onClick={() => {
                  if (fromToken == null) return
                  const amtStr = formatBNToString(
                    fromToken.amount,
                    fromToken.decimals || 0,
                  )
                  onChangeFromAmount(amtStr)
                }}
              >
                {formattedBalance}
              </a>
            </div>
          </div>
          <div className="row">
            <SwapInput
              tokens={tokenOptions.from.filter(
                ({ symbol }) => symbol !== toState.symbol,
              )}
              onSelect={onChangeFromToken}
              onChangeAmount={onChangeFromAmount}
              selected={fromState.symbol}
              inputValue={fromState.value}
              inputValueUSD={fromState.valueUSD}
              isSwapFrom
            />
          </div>
          <div style={{ height: "48px" }}></div>
          <div className="row">
            <h3 className="swapTitle">{t("to")}</h3>
          </div>
          <div className="row">
            <SwapInput
              tokens={tokenOptions.to.filter(
                ({ symbol }) => symbol !== fromState.symbol,
              )}
              onSelect={onChangeToToken}
              selected={toState.symbol}
              inputValue={toState.value}
              inputValueUSD={toState.valueUSD}
              isSwapFrom={false}
            />
          </div>
          <div style={{ height: "24px" }}></div>
          {fromState.symbol && toState.symbol && (
            <div className="row">
              <div>
                <span>{t("rate")}</span>
                &nbsp;
                <span>{exchangeRateInfo.pair}</span>
                &nbsp;
                <button
                  className="exchange"
                  onClick={onClickReverseExchangeDirection}
                >
                  <svg
                    width="24"
                    height="20"
                    viewBox="0 0 24 20"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M17.4011 12.4196C17.4011 13.7551 16.5999 13.8505 16.4472 13.8505H6.62679L9.14986 11.3274L8.47736 10.6501L5.13869 13.9888C5.04986 14.0782 5 14.1991 5 14.3251C5 14.4511 5.04986 14.572 5.13869 14.6613L8.47736 18L9.14986 17.3275L6.62679 14.8044H16.4472C17.1054 14.8044 18.355 14.3274 18.355 12.4196V10.9888H17.4011V12.4196Z"
                      fill="#3800D6"
                    />
                    <path
                      d="M5.9539 7.58511C5.9539 6.24965 6.75519 6.15426 6.90781 6.15426H16.7283L14.2052 8.67733L14.8777 9.34984L18.2164 6.01117C18.3052 5.92181 18.355 5.80092 18.355 5.67492C18.355 5.54891 18.3052 5.42803 18.2164 5.33867L14.8777 2L14.2004 2.67727L16.7283 5.20035H6.90781C6.24962 5.20035 5 5.6773 5 7.58511V9.01597H5.9539V7.58511Z"
                      fill="#3800D6"
                    />
                  </svg>
                </button>
              </div>
              <span className="exchRate">{formattedExchangeRate}</span>
            </div>
          )}
          <div className="row">
            <span>{t("priceImpact")}</span>
            <span>{formattedPriceImpact}</span>
          </div>
          {formattedRoute && (
            <>
              <div className="row">
                <span>{t("route")}</span>
                <span>{formattedRoute}</span>
              </div>
              {isVirtualSwap && (
                <div className="row">
                  <span></span>
                  <span>
                    <a
                      href="#"
                      style={{ textDecoration: "underline" }}
                      target="_blank"
                      rel="noreferrer"
                    >
                      ({t("virtualSwap")})
                    </a>
                  </span>
                </div>
              )}
              {isVirtualSwap && isHighSlippage && (
                <div className="exchangeWarning">
                  {t("lowSlippageVirtualSwapWarning")}
                </div>
              )}
            </>
          )}
        </div>
        {account && isHighPriceImpact(exchangeRateInfo.priceImpact) && (
          <div className="exchangeWarning">
            {t("highPriceImpact", {
              rate: formattedPriceImpact,
            })}
          </div>
        )}
        {isVirtualSwap && (
          <div className="virtualSwapInfoBubble">
            <InfoIcon />
            {t("crossAssetSwapsUseVirtualSwaps")} {"<"}
            <a href="#" target="_blank" rel="noreferrer">
              {t("learnMore")}
            </a>
            {">"}
          </div>
        )}
        <AdvancedOptions noApprovalCheckbox={false}  noSlippageCheckbox={false}/>
        <Button
          kind="primary"
          onClick={(): void => {
            setCurrentModal("review")
          }}
          disabled={!!error || +toState.value <= 0}
        >
          {t("swap")}
        </Button>
        <div className={classNames({ showError: !!error }, "error")}>
          {error}
        </div>
        <Modal
          isOpen={!!currentModal}
          onClose={(): void => setCurrentModal(null)}
        >
          {currentModal === "review" && (
            <ReviewSwap
              onClose={(): void => setCurrentModal(null)}
              onConfirm={async (): Promise<void> => {
                setCurrentModal("confirm")
                logEvent("swap", {
                  from: fromState.symbol,
                  to: toState.symbol,
                })
                await onConfirmTransaction?.()
                setCurrentModal(null)
              }}
              data={modalData}
            />
          )}
          {currentModal === "confirm" && <ConfirmTransaction />}
        </Modal>
      </div>
    </div>
  )
}

export default SwapPage
