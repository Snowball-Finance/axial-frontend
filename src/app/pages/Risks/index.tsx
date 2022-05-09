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
import { mobile } from "styles/media";
import { Max1040 } from "app/components/wrappers/max1040";

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

const StyledSwapCard = styled(Max1040)({
  margin: "0px auto",
  backgroundColor: CssVariables.poolCardBackground,
  border: `4px solid ${CssVariables.cardBorder}`,
  borderRadius: "20px",
  padding: "26px 36px",

  [mobile]: {
    width: "100%",
    padding: 15,
  },
});
