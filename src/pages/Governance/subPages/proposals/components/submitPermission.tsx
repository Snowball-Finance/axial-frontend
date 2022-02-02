import { styled } from "@mui/material";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import { selectGovernanceTokenBalance } from "../../../../../containers/BlockChain/Governance/selectors";
import { selectAccount } from "../../../../../containers/BlockChain/Web3/selectors";
import { env } from "../../../../../environment";
import { CssVariables } from "../../../../../styles/cssVariables/cssVariables";
import { mobile } from "../../../../../styles/media";
import { formatNumber } from "../../../../../utils/format";
import React from 'react'

export const SubmitPermission = () => {
  const governanceTokenBalance = useSelector(selectGovernanceTokenBalance);
  const account = useSelector(selectAccount);
  const minimum = Number(env.MINIMUM_TOKEN_FOR_VOTING);
  const { t } = useTranslation();
  let message = "";
  if (!account) {
    message = t("ConnectToWallet");
  }
  if (governanceTokenBalance && account) {
    if (governanceTokenBalance.toNumber() < minimum) {
      message = t(
        "MinGovernanceTokenToSubmitError",
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
