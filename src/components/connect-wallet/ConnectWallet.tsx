import "./ConnectWallet.scss"

import React, { ReactElement } from "react"
import { UnsupportedChainIdError, useWeb3React } from "@web3-react/core"
import { SUPPORTED_WALLETS, WalletInfo } from "../../constants"
import { map } from "lodash"
import { useTranslation } from "react-i18next"
import { useAnalytics } from "../../utils/analytics"

interface Props {
  onClose: () => void
}

function ConnectWallet({ onClose }: Props): ReactElement {
  const { t } = useTranslation()
  const { activate } = useWeb3React()
  const { trackEvent } = useAnalytics()

  const handleWalletSelect = (wallet: WalletInfo) => {
    activate(wallet.connector, undefined, true).catch((error) => {
      if (error instanceof UnsupportedChainIdError) {
        void activate(wallet.connector) // a little janky...can't use setError because the connector isn't set
      } else {
        // TODO: handle error
      }
    })
    onClose()
    trackEvent({
      category: "Wallet",
      action: "Connect",
      name: wallet.name,
    })
  }


  return (
    <div className="connectWallet">
      <h3>{t("connectWallet")}</h3>
      <div className="walletList">
        {map(SUPPORTED_WALLETS, (wallet, index) => (
          <button
            key={index}
            onClick={(): void => {
              handleWalletSelect(wallet)
            }}
          >
            <span>{wallet.name}</span>
            <img src={wallet.icon} alt="icon" className="icon" />
          </button>
        ))}
      </div>
      <p>
        {t("dontHaveWallet") + " "}
        <a href="https://ethereum.org/en/wallets/" target="blank">
          {t("getWallet")}
        </a>
      </p>
    </div>
  )
}

export default ConnectWallet
