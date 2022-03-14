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
import { NoEthereumProviderError } from "@web3-react/injected-connector";

export const NoProviderAlert: FC = () => {
  const { t } = useTranslation();
  const error = useSelector(Web3Selectors.selectWeb3Error);
  const isOpen = error instanceof NoEthereumProviderError;

  const handleDownloadProvider = () => {
    window.open("https://metamask.io/download", "_blank");
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
          {t(translations.Errors.NoProvider())}
        </ErrorDescription>
        <ActionsWrapper>
          <ContainedButton onClick={handleDownloadProvider}>
            {t(translations.Common.DownloadMetamask())}
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
