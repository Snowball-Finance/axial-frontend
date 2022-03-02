/**
 *
 * Swap Page
 *
 */

import React, { FC } from "react";
import { Helmet } from "react-helmet-async";
import { useTranslation } from "react-i18next";
import { styled, Grid, Typography } from "@mui/material";

import { translations } from "locales/i18n";
import { CssVariables } from "styles/cssVariables/cssVariables";
import { ContainedButton } from "app/components/common/buttons/containedButton";
import { TextButton } from "app/components/common/buttons/textButton";
import ArrowDownIcon from "assets/images/iconComponents/arrowDown";
import ArrowUpIcon from "assets/images/iconComponents/arrowUp";
import { CurrencyInput } from "./components/CurrencyInput";
import { AdvanceOption } from "./components/AdvanceOption";
import { useSelector } from "react-redux";
import { globalSelectors } from "app/appSelectors";
import { useSwapPageSlice } from "./slice";

export const SwapPage: FC = () => {
  useSwapPageSlice();

  const { t } = useTranslation();

  const tokens = useSelector(globalSelectors.tokens);

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
          spacing={3}
        >
          <StyledContainerItem item xs={12}>
            <Grid container direction="column" spacing={1}>
              <Grid item>
                <Grid
                  container
                  justifyContent="space-between"
                  alignItems="center"
                >
                  <Grid item>
                    <HeaderText variant="h5">FROM</HeaderText>
                  </Grid>

                  <Grid item>
                    <MaxText>Max</MaxText>
                  </Grid>
                </Grid>
              </Grid>

              <Grid item>
                <CurrencyInput />
              </Grid>

              <Grid item>
                <Grid container justifyContent="flex-end">
                  <Grid item>
                    <BalanceText>wallet balance 0.00</BalanceText>
                  </Grid>
                </Grid>
              </Grid>

              <Grid item></Grid>
            </Grid>
          </StyledContainerItem>

          <Grid item>
            <ArrowUpIcon color={CssVariables.white} />
            <ArrowDownIcon color={CssVariables.white} />
          </Grid>

          <StyledContainerItem item>
            <Grid container direction="column" spacing={1}>
              <Grid item>
                <Grid container justifyContent="space-between">
                  <Grid item>
                    <HeaderText variant="h5">TO</HeaderText>
                  </Grid>
                </Grid>
              </Grid>

              <Grid item>
                <CurrencyInput />
              </Grid>

              <Grid item>
                <Grid container justifyContent="flex-end">
                  <Grid item>
                    <BalanceText>wallet balance 0.00</BalanceText>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          </StyledContainerItem>

          <StyledContainerItem item>
            <AdvanceOption />
          </StyledContainerItem>

          <Grid item>
            <ContainedButton width={220}>Swap</ContainedButton>
          </Grid>
        </StyledContainer>
      </StyledSwapCard>
    </>
  );
};

const StyledSwapCard = styled("div")({
  width: 650,
  margin: "0px auto",
  backgroundColor: CssVariables.poolCardBackground,
  border: `4px solid ${CssVariables.poolCardBorder}`,
  borderRadius: "20px",
  padding: "20px",
});

const StyledContainer = styled(Grid)({
  width: 550,
  margin: "auto",
});

const StyledContainerItem = styled(Grid)({
  width: "100%",
});

const HeaderText = styled(Typography)({
  color: CssVariables.white,
});

const MaxText = styled(TextButton)({
  fontSize: "1.5rem",
});

const BalanceText = styled(Typography)({
  color: CssVariables.white,
});
