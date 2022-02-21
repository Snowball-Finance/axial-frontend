/**
 *
 * Risks Page
 *
 */

import React, { FC } from "react";
import { Helmet } from "react-helmet-async";
import { useTranslation } from "react-i18next";
import { styled } from "@mui/material";

import { translations } from "locales/i18n";
import { CssVariables } from "styles/cssVariables/cssVariables";
import { Content } from "./components/Content";

export const RisksPage: FC = () => {
  const { t } = useTranslation();

  return (
    <>
      <Helmet>
        <title>{t(translations.RisksPage.Risks())}</title>
        <meta
          name="description"
          content={`${t(translations.RisksPage.Description())}`}
        />
      </Helmet>

      <StyledSwapCard>
        <Content />
      </StyledSwapCard>
    </>
  );
};

const StyledSwapCard = styled("div")({
  width: 700,
  margin: "auto",
  backgroundColor: CssVariables.poolCardBackground,
  border: `4px solid ${CssVariables.poolCardBorder}`,
  borderRadius: "20px",
  paddingBottom: "40px",
});
