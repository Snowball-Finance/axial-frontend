import { Web3Selectors } from "app/containers/BlockChain/Web3/selectors";
import { Web3Actions } from "app/containers/BlockChain/Web3/slice";
import { ConnectorPayload } from "app/containers/BlockChain/Web3/types";
import { translations } from "locales/i18n";
import React, { FC, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { LocalStorageKeys, storage } from "../../../../store/storage";
import { ContainedButton } from "../buttons/containedButton";

interface WalletToggleProps {
  fullWidth?: boolean;
}

export const WalletToggle: FC<WalletToggleProps> = ({ fullWidth }) => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const isConnecting = useSelector(Web3Selectors.selectIsConnectingToWallet);
  const account = useSelector(Web3Selectors.selectAccount);
  const walletName: ConnectorPayload["walletName"] = "MetaMask";

  const handleButtonClick = () => {
    if (account) {
      dispatch(Web3Actions.disconnectFromWallet());
      storage.delete(LocalStorageKeys.CONNECTED_TO_WALLET_ONCE);
      return;
    }
    dispatch(Web3Actions.connectToWallet({ walletName }));
  };

  useEffect(() => {
    if (storage.read(LocalStorageKeys.CONNECTED_TO_WALLET_ONCE)) {
      setTimeout(() => {
        dispatch(Web3Actions.connectToWallet({ walletName }));
      }, 200);
    }
  }, []);

  return (
    <ContainedButton
      color="primary"
      height={40.5}
      loading={isConnecting}
      onClick={handleButtonClick}
    >
      {account
        ? t(translations.Common.DisconnectFromWallet()) +
          ":" +
          account.substring(0, 5)
        : t(translations.Common.ConnectToWallet())}
    </ContainedButton>
  );
};
