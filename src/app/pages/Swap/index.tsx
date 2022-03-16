/**
 *
 * Swap Page
 *
 */

import React, { FC } from "react";
import { Helmet } from "react-helmet-async";
import { useTranslation } from "react-i18next";
import { styled, Grid } from "@mui/material";

import { translations } from "locales/i18n";
import { CssVariables } from "styles/cssVariables/cssVariables";
import { useSwapPageSlice } from "./slice";
import { AdvanceOption } from "./components/AdvanceOption";
import { FromToken } from "./components/FromToken";
import { ToToken } from "./components/ToToken";
import { BestPath } from "./components/BestPath";
import { ReverseSwap } from "./components/ReverseSwap";
import { Actions } from "./components/Actions";

export const SwapPage: FC = () => {
  useSwapPageSlice();

  const { t } = useTranslation();

  return (
    <>
      <Helmet>
        <title>{t(translations.SwapPage.Swap())}</title>
        <meta
          name="description"
          content={`${t(translations.SwapPage.Description())}`}
        />
      </Helmet>

      <StyledSwapCard>
        <StyledContainer
          container
          direction="column"
          justifyContent="center"
          alignItems="center"
          spacing={2}
        >
          <FromToken />

          <ReverseSwap />

          <ToToken />

          <BestPath />

          <AdvanceOption />

          <Actions />
        </StyledContainer>
      </StyledSwapCard>
    </>
  );
};

const StyledSwapCard = styled("div")({
  width: 650,
  margin: "0px auto",
  backgroundColor: CssVariables.poolCardBackground,
  border: `4px solid ${CssVariables.cardBorder}`,
  borderRadius: "20px",
  padding: "20px",
});

const StyledContainer = styled(Grid)({
  width: 550,
  margin: "auto",
});
