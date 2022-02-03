import React, { useEffect } from "react"
import { useTranslation } from "react-i18next"
import { useDispatch, useSelector } from "react-redux"
import {
  selectAccount,
  selectIsConnectingToWallet,
} from "../../../../containers/BlockChain/Web3/selectors"
import { Web3Actions } from "../../../../containers/BlockChain/Web3/slice"
import { ConnectorPayload } from "../../../../containers/BlockChain/Web3/types"
import { LocalStorageKeys, storage } from "../../../../store/storage"
import { ContainedButton } from "../buttons/containedButton"

export const WalletToggle = () => {
  const { t } = useTranslation()
  const dispatch = useDispatch()
  const isConnecting = useSelector(selectIsConnectingToWallet)
  const account = useSelector(selectAccount)
  const walletName: ConnectorPayload["walletName"] = "MetaMask"

  const handleButtonClick = () => {
    if (account) {
      dispatch(Web3Actions.disconnectFromWallet())
      storage.delete(LocalStorageKeys.CONNECTED_TO_WALLET_ONCE)
      return
    }
    dispatch(Web3Actions.connectToWallet({ walletName }))
  }

  useEffect(() => {
    if (storage.read(LocalStorageKeys.CONNECTED_TO_WALLET_ONCE)) {
      setTimeout(() => {
        dispatch(Web3Actions.connectToWallet({ walletName }))
      }, 200)
    }
  }, [])

  return (
    <ContainedButton
      color="primary"
      height={36}
      width={220}
      loading={isConnecting}
      onClick={handleButtonClick}
    >
      {account
        ? t("DisconnectFromWallet") + ":" + account.substring(0, 5)
        : t("ConnectToWallet")}
    </ContainedButton>
  )
}
