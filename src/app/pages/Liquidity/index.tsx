/**
 *
 * Liquidity Page
 *
 */

import React, { FC } from "react";
import { Helmet } from "react-helmet-async";
import { useTranslation } from "react-i18next";

import { translations } from "locales/i18n";
import { LiquidityBody } from "./body";
import { useLiquidityPageSlice } from "./slice";
import { TokenInQueueToApprove } from "app/components/modals/tokensInQueueToApprove";

export const LiquidityPage: FC = () => {
  useLiquidityPageSlice();

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

      <LiquidityBody />
      <TokenInQueueToApprove />
    </>
  );
};
