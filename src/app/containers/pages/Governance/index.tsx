/**
*
* Governance
*
*/

import React from 'react';
import { Helmet } from 'react-helmet-async';
import { useTranslation } from 'react-i18next';
import { useGovernanceSlice } from './slice';
import { translations } from "locales/i18n";
import { Box } from "@mui/material";
import { PageHead } from "./components/pageHead";
import { GovernanceBody } from "./body";

export function Governance() {
  useGovernanceSlice()
  const { t } = useTranslation()
  return (
    <>
      <Helmet>
        <title>{t(translations.GovernancePage.Governance())}</title>
        <meta name="description" content={`${t(translations.GovernancePage.Description())}`} />
      </Helmet>
      <PageHead
        title={t(translations.GovernancePage.Governance())}
        description={t(translations.GovernancePage.Description())}
      />
      <Box mb={2} />
      <GovernanceBody />
    </>
  );

};

