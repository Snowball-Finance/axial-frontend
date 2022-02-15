/**
 *
 * Liquidity Page
 *
 */

import React, { FC } from "react";
import { Helmet } from "react-helmet-async";
import { useTranslation } from "react-i18next";

import { translations } from "locales/i18n";
import { PoolCards } from "./components/PoolCards";

export const LiquidityPage: FC = () => {
  const { t } = useTranslation();

  return (
    <>
      <Helmet>
        <title>{t(translations.LiquidityPage.Liquidity())}</title>
        <meta
          name="description"
          content={`${t(translations.LiquidityPage.Description())}`}
        />
      </Helmet>
      
      <PoolCards />
    </>
  );
};
