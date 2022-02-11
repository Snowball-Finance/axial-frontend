/**
 *
 * Governance
 *
 */

import React from "react";
import { Helmet } from "react-helmet-async";
import { useTranslation } from "react-i18next";
import { translations } from "locales/i18n";
import { Box } from "@mui/material";
import { PageHead } from "./components/pageHead";
import { GovernanceBody } from "./body";
import { WalletToggle } from "app/components/common/walletToggle";
import { useGovernancePageSlice } from "./slice";

export function GovernancePage() {
  useGovernancePageSlice();
  const { t } = useTranslation();
  return (
    <>
      <Helmet>
        <title>{t(translations.GovernancePage.Governance())}</title>
        <meta
          name="description"
          content={`${t(translations.GovernancePage.Description())}`}
        />
      </Helmet>
      <WalletToggle />
      {/* <NavigationTabs /> */}
      <Box mb={4} />
      <PageHead
        title={t(translations.GovernancePage.Governance())}
        description={t(translations.GovernancePage.Description())}
      />
      <Box mb={4} />
      <GovernanceBody />
    </>
  );
}
