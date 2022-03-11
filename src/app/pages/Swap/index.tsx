/**
 *
 * Swap Page
 *
 */

import React, { FC, useEffect } from "react";
import { Helmet } from "react-helmet-async";
import { useTranslation } from "react-i18next";
import { styled, Grid } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { parseUnits } from "@ethersproject/units";

import { translations } from "locales/i18n";
import { CssVariables } from "styles/cssVariables/cssVariables";
import { ContainedButton } from "app/components/common/buttons/containedButton";
import { AdvanceOption } from "./components/AdvanceOption";
import { SwapSelectors } from "app/containers/Swap/selectors";
import { Web3Selectors } from "app/containers/BlockChain/Web3/selectors";
import { WalletToggle } from "app/components/common/walletToggle";
import { useSwapPageSlice } from "./slice";
import { SwapPageSelectors } from "./selectors";
import { FromToken } from "./components/FromToken";
import { ToToken } from "./components/ToToken";
import { BestPath } from "./components/BestPath";
import { ReverseSwap } from "./components/ReverseSwap";

export const SwapPage: FC = () => {
  useSwapPageSlice();

  const { t } = useTranslation();
  const isSwapping = useSelector(SwapSelectors.selectIsSwapping);
  const bestPath = useSelector(SwapSelectors.selectBestPath);
  const account = useSelector(Web3Selectors.selectAccount);
  const errorMessage = useSelector(SwapPageSelectors.errorMessage);
  const isGettingBestSwapPath = useSelector(
    SwapSelectors.selectIsGettingBestPath
  );

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

          <StyledContainerItem item>
            <AdvanceOption />
          </StyledContainerItem>

          <Grid item>
            {account ? (
              <ContainedButton
                width={220}
                onClick={handleSwap}
                loading={isSwapping}
                disabled={
                  isSwapping ||
                  !bestPath ||
                  !!errorMessage ||
                  isGettingBestSwapPath
                }
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
  border: `4px solid ${CssVariables.cardBorder}`,
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
