/**
 *
 * Governance
 *
 */

import { Helmet } from "react-helmet-async";
import { useTranslation } from "react-i18next";
import { translations } from "locales/i18n";
import { Box } from "@mui/material";
import { GovernanceBody } from "./body";
import { useGovernancePageSlice } from "./slice";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { GovernanceActions } from "app/containers/BlockChain/Governance/slice";
import { Web3Selectors } from "app/containers/BlockChain/Web3/selectors";

export function GovernancePage() {
  useGovernancePageSlice();
  const account = useSelector(Web3Selectors.selectAccount);
  const { t } = useTranslation();
  const dispatch = useDispatch();

  useEffect(() => {
    if (account) {
      dispatch(GovernanceActions.getGovernanceTokenBalance());
    }
    dispatch(GovernanceActions.setSyncedProposalsWithBlockchain(false));
    return () => {};
  }, [account]);
  return (
    <>
      <Helmet>
        <title>{t(translations.GovernancePage.Governance())}</title>
        <meta
          name="description"
          content={`${t(translations.GovernancePage.Description())}`}
        />
      </Helmet>
      <Box mb={4} />
      <GovernanceBody />
    </>
  );
}
