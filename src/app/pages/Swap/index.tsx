/**
 *
 * Swap Page
 *
 */

import React, { FC, useEffect } from "react";
import { Helmet } from "react-helmet-async";
import { useTranslation } from "react-i18next";
import { styled, Grid, IconButton } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { parseUnits } from "@ethersproject/units";

import { translations } from "locales/i18n";
import { CssVariables } from "styles/cssVariables/cssVariables";
import { ContainedButton } from "app/components/common/buttons/containedButton";
import ReverseSwapArrow from "assets/images/iconComponents/reverseSwapArrow";
import { SwapSelectors } from "app/containers/Swap/selectors";
import { SwapActions } from "app/containers/Swap/slice";
import { TokenSymbols } from "app/containers/Swap/types";
import { Web3Selectors } from "app/containers/BlockChain/Web3/selectors";
import { AdvanceOption } from "./components/AdvanceOption";
import { SwapPageActions, useSwapPageSlice } from "./slice";
import { FromToken } from "./components/FromToken";
import { ToToken } from "./components/ToToken";
import { SwapPageSelectors } from "./selectors";
import { BestPath } from "./components/BestPath";
import { WalletToggle } from "app/components/common/walletToggle";

export const SwapPage: FC = () => {
  useSwapPageSlice();

  const { t } = useTranslation();
  const dispatch = useDispatch();
  const isSwapping = useSelector(SwapSelectors.selectIsSwapping);
  const selectedFromToken = useSelector(SwapPageSelectors.selectedFromToken);
  const selectedToToken = useSelector(SwapPageSelectors.selectedToToken);
  const selectedFromAmount = useSelector(SwapPageSelectors.selectedFromAmount);
  const bestPath = useSelector(SwapSelectors.selectBestPath);
  const account = useSelector(Web3Selectors.selectAccount);
  const errorMessage = useSelector(SwapPageSelectors.errorMessage);

  useEffect(() => {
    if (
      selectedFromToken?.symbol &&
      selectedToToken?.symbol &&
      selectedFromAmount
    ) {
      dispatch(
        SwapActions.findBestPath({
          fromTokenSymbol: TokenSymbols.USDTe, // TODO: Need to work on it
          amountToGive: parseUnits(
            selectedFromAmount,
            selectedFromToken?.decimals
          ),
          toTokenSymbol: TokenSymbols.TUSD, // TODO: Need to work on it, static code
        })
      );
    }
  }, [selectedFromToken?.symbol, selectedToToken?.symbol, selectedFromAmount]);

  const handleReverseTokenChange = () => {
    dispatch(SwapPageActions.reverseTokenChange());
  };

  const handleSwap = () => {
    dispatch(SwapActions.swap());
  };

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

          <Grid item>
            <IconButton
              aria-label="reverse swap"
              onClick={handleReverseTokenChange}
            >
              <ReverseSwapArrow color={CssVariables.white} />
            </IconButton>
          </Grid>

          <ToToken />

          <BestPath />

          <StyledContainerItem item>
            <AdvanceOption />
          </StyledContainerItem>

          <Grid item>
            {account ? (
              <ContainedButton
                width={220}
                onClick={handleSwap}
                loading={isSwapping}
                disabled={isSwapping || !bestPath || !!errorMessage}
              >
                {errorMessage
                  ? errorMessage
                  : t(translations.SwapPage.SwapButton())}
              </ContainedButton>
            ) : (
              <WalletToggle />
            )}
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
