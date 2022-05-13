import { FC } from "react";
import { styled, Typography } from "@mui/material";
import { useSelector } from "react-redux";
import { useTranslation } from "react-i18next";

import { translations } from "locales/i18n";
import { CssVariables } from "styles/cssVariables/cssVariables";
import { Web3Selectors } from "app/containers/BlockChain/Web3/selectors";
import { env } from "environment";
import { formatNumber } from "common/format";
import { GovernanceSelectors } from "app/containers/BlockChain/Governance/selectors";

export const Message: FC = () => {
  const { t } = useTranslation();
  const account = useSelector(Web3Selectors.selectAccount);
  const minimum = useSelector(
    GovernanceSelectors.minimumTokenRequiredForNewProposal
  );
  const canAddNewProposal = useSelector(GovernanceSelectors.canAddNewProposal);

  let message = "";
  if (!account) {
    message = t(translations.Common.ConnectToWallet());
  } else {
    message = t(translations.GovernancePage.MinGovernanceTokenToSubmitError(), {
      amount: formatNumber(minimum, 2).toString(),
      name: env.GOVERNANCE_TOKEN_NAME,
    });
  }

  return !canAddNewProposal && minimum ? (
    <Text variant="body1">* {message}</Text>
  ) : (
    <></>
  );
};

const Text = styled(Typography)({
  color: CssVariables.error,
});
