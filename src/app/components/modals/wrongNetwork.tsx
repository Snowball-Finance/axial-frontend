import { UnsupportedChainIdError } from "@web3-react/core";
import { Web3Selectors } from "app/containers/BlockChain/Web3/selectors";
import { translations } from "locales/i18n";
import { FC } from "react";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import { SnowModal } from "../common/modal";
import WarningRoundedIcon from "@mui/icons-material/WarningRounded";
import { styled } from "@mui/material";
import { CssVariables } from "styles/cssVariables/cssVariables";
import { ContainedButton } from "../common/buttons/containedButton";
import {
  AVALANCHE_MAINNET_PARAMS,
  gnosisSafe,
} from "app/containers/BlockChain/utils/wallet/connectors";

if (!process.env.REACT_APP_NETWORK_NAME) {
  throw new Error("REACT_APP_NETWORK_NAME is not set in .env file");
}

export const WrongNetworkModalAlert: FC = () => {
  const { t } = useTranslation();
  const error = useSelector(Web3Selectors.selectWeb3Error);
  const isOpen = error instanceof UnsupportedChainIdError;

  const handleSwitchToAvalancheClick = () => {
    gnosisSafe.getProvider().then((provider) => {
      provider
        .request({
          method: "wallet_addEthereumChain",
          params: [AVALANCHE_MAINNET_PARAMS],
        })
        .catch((error) => {
          console.log(error);
        });
    });
  };

  return (
    <SnowModal
      title={t(translations.Errors.ErrorConnectingWallet())}
      isOpen={isOpen}
    >
      <Wrapper>
        <IconWrapper>
          <WarningRoundedIcon sx={{ fontSize: 120 }} />
        </IconWrapper>
        <ErrorDescription>
          {t(translations.Errors.NotConnectedToSupportedNetwork())}
        </ErrorDescription>
        <ActionsWrapper>
          <ContainedButton onClick={handleSwitchToAvalancheClick}>
            {t(translations.Common.SwitchTo_NETWORK_NAME(), {
              networkName: process.env.REACT_APP_NETWORK_NAME,
            })}
          </ContainedButton>
        </ActionsWrapper>
      </Wrapper>
    </SnowModal>
  );
};

const Wrapper = styled("div")({
  display: "flex",
  flexDirection: "column",
  gap: "20px",
});

const ActionsWrapper = styled("div")({
  display: "flex",
  justifyContent: "flex-end",
});

const ErrorDescription = styled("div")({
  fontSize: "16px",
  fontWeight: 400,
  color: CssVariables.white,
});

const IconWrapper = styled("div")({
  display: "flex",
  justifyContent: "center",
  path: {
    fill: CssVariables.warning,
  },
});
