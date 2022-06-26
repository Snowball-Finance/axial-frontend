import { styled } from "@mui/material";
import { Web3Selectors } from "app/containers/BlockChain/Web3/selectors";
import { Web3Actions } from "app/containers/BlockChain/Web3/slice";
import { ConnectorPayload } from "app/containers/BlockChain/Web3/types";
import { GnosisSafeSelectors } from "app/containers/GnosisSafe/selectors";
import { translations } from "locales/i18n";
import React, { FC } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { mobile } from "styles/media";
import { LocalStorageKeys, storage } from "../../../../store/storage";
import { ContainedButton } from "../buttons/containedButton";
import { OutlinedButton } from "../buttons/outlinedButton";

interface WalletToggleProps {
  fullWidth?: boolean;
}

export const WalletToggle: FC<WalletToggleProps> = ({ fullWidth }) => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const isConnecting = useSelector(Web3Selectors.selectIsConnectingToWallet);
  const account = useSelector(Web3Selectors.selectAccount);
  const connectedToGnosis = useSelector(GnosisSafeSelectors.connected);

  const walletName: ConnectorPayload["walletName"] = connectedToGnosis
    ? "Gnosis Safe"
    : "MetaMask";

  const handleButtonClick = () => {
    if (account) {
      dispatch(Web3Actions.disconnectFromWallet());
      storage.delete(LocalStorageKeys.CONNECTED_TO_WALLET_ONCE);
      return;
    }
    dispatch(Web3Actions.connectToWallet({ walletName }));
  };

  return account ? (
    <OutlinedButton
      height={40.5}
      loading={isConnecting}
      onClick={handleButtonClick}
      fullWidth={fullWidth}
    >
      {account.substring(0, 5) +
        "..." +
        account.substring(account.length, account.length - 4)}
    </OutlinedButton>
  ) : (
    <StyledContainedButton
      color="primary"
      height={40.5}
      loading={isConnecting}
      onClick={handleButtonClick}
      fullWidth={fullWidth}
    >
      {t(translations.Common.ConnectToWallet())}
    </StyledContainedButton>
  );
};

const StyledContainedButton = styled(ContainedButton)({
  [mobile]: {
    fontSize: "12px",
  },
});
