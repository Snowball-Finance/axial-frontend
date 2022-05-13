import { styled } from "@mui/material";
import { GovernanceSelectors } from "app/containers/BlockChain/Governance/selectors";
import { Web3Selectors } from "app/containers/BlockChain/Web3/selectors";
import { formatNumber } from "common/format";
import { env } from "environment";
import { translations } from "locales/i18n";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import { CssVariables } from "styles/cssVariables/cssVariables";
import { mobile } from "styles/media";

export const SubmitPermission = () => {
  const governanceTokenBalance = useSelector(
    GovernanceSelectors.floatedGovernanceTokenBalance
  );
  const account = useSelector(Web3Selectors.selectAccount);
  const minimum = useSelector(
    GovernanceSelectors.minimumTokenRequiredForNewProposal
  );
  const { t } = useTranslation();
  let message = "";
  if (!account) {
    message = t(translations.Common.ConnectToWallet());
  }
  if (governanceTokenBalance && account) {
    if (Number(governanceTokenBalance.toString()) < minimum) {
      message = t(
        translations.GovernancePage.MinGovernanceTokenToSubmitError(),
        {
          amount: formatNumber(minimum, 2).toString(),
          name: env.GOVERNANCE_TOKEN_NAME,
        }
      );
    }
  }
  return <Wrapper>{message}</Wrapper>;
};
const Wrapper = styled("div")({
  color: CssVariables.error,
  fontSize: "16px",
  [mobile]: {
    fontSize: "15px",
    marginBottom: "12px",
  },
});
