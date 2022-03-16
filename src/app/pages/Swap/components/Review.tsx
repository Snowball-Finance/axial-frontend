/**
 *
 * Swap Page
 *
 */

import React, { FC, useEffect } from "react";
import { styled, Grid, Typography } from "@mui/material";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";

import { translations } from "locales/i18n";
import { CssVariables } from "styles/cssVariables/cssVariables";
import { ContainedButton } from "app/components/common/buttons/containedButton";
import { OutlinedButton } from "app/components/common/buttons/outlinedButton";
import { formatBNToString } from "app/containers/utils/contractUtils";
import { SwapSelectors } from "app/containers/Swap/selectors";
import { Zero } from "app/containers/Rewards/constants";
import { BestPath } from "app/pages/Swap/components/BestPath";
import { SwapPageSelectors } from "app/pages/Swap/selectors";
import { SwapPageActions } from "app/pages/Swap/slice";
import { SwapActions } from "app/containers/Swap/slice";
import { globalSelectors } from "app/appSelectors";

export const Review: FC = () => {
  const { t } = useTranslation();

  const selectedFromToken = useSelector(SwapPageSelectors.selectedFromToken);
  const selectedToToken = useSelector(SwapPageSelectors.selectedToToken);
  const tokens = useSelector(globalSelectors.tokens);
  const bestPath = useSelector(SwapSelectors.selectBestPath);
  const isSwapping = useSelector(SwapSelectors.selectIsSwapping);

  const dispatch = useDispatch();

  // Logic for closing the modal, when toToken balance got increase
  useEffect(() => {
    if (
      selectedToToken &&
      +formatBNToString(
        tokens?.[selectedToToken.symbol]?.balance || Zero,
        selectedToToken?.decimals || 18
      ) >
        +formatBNToString(
          selectedToToken?.balance || Zero,
          selectedToToken?.decimals || 18
        )
    ) {
      dispatch(SwapPageActions.confirmSwap());
    }
  }, [tokens, selectedToToken]);

  const handleSwap = () => {
    dispatch(SwapActions.swap());
  };

  const handleClose = () => {
    dispatch(SwapPageActions.setSwapModalOpen(false));
  };

  let tokenInfo = [
    {
      symbol: selectedFromToken?.symbol,
      icon: selectedFromToken?.logo,
      value: formatBNToString(
        bestPath?.amounts[0] || Zero,
        selectedFromToken?.decimals || 18
      ),
    },
    {
      symbol: selectedToToken?.symbol,
      icon: selectedToToken?.logo,
      value: formatBNToString(
        bestPath?.amounts[bestPath?.amounts.length - 1] || Zero,
        selectedToToken?.decimals || 18
      ),
    },
  ];

  return (
    <ReviewContainer container spacing={2}>
      <Grid item xs={12}>
        <TokenContainer>
          <Grid container direction="column" spacing={1}>
            {tokenInfo.map((token) => (
              <Grid item key={token.symbol}>
                <Grid
                  container
                  justifyContent="space-between"
                  alignItems="center"
                >
                  <TokenIconContainer item>
                    <Grid
                      container
                      spacing={1}
                      alignItems="center"
                      justifyContent="center"
                    >
                      <Grid item>
                        <TokenIcon
                          src={token.icon}
                          alt={`token-${token.symbol}`}
                        />
                      </Grid>

                      <Grid item>
                        <TokenTitle variant="body2">{token.symbol}</TokenTitle>
                      </Grid>
                    </Grid>
                  </TokenIconContainer>

                  <Grid item>
                    <TokenTitle variant="h6">{token.value}</TokenTitle>
                  </Grid>
                </Grid>
              </Grid>
            ))}
          </Grid>
        </TokenContainer>
      </Grid>

      <BestPath />

      <Grid item xs={12}>
        <InfoContainer>
          <InfoText variant="body1">
            {t(translations.SwapPage.ReviewSwap.InfoDescription())}
          </InfoText>
        </InfoContainer>
      </Grid>

      <Grid item xs={12}>
        <Grid container spacing={1} justifyContent="center">
          <Grid item>
            <OutlinedButton onClick={handleClose}>Cancel</OutlinedButton>
          </Grid>

          <Grid item>
            <ContainedButton
              onClick={handleSwap}
              loading={isSwapping}
              disabled={isSwapping}
            >
              Swap
            </ContainedButton>
          </Grid>
        </Grid>
      </Grid>
    </ReviewContainer>
  );
};

const ReviewContainer = styled(Grid)({
  maxWidth: 600,
  minHeight: 500,
});

const TokenContainer = styled("div")({
  width: "100%",
  backgroundColor: CssVariables.swapInputbackground,
  border: `4px solid ${CssVariables.cardBorder}`,
  borderRadius: "20px",
  padding: 20,
  marginTop: 20,
});

const TokenIconContainer = styled(Grid)({
  border: `2px solid ${CssVariables.cardBorder}`,
  borderRadius: CssVariables.buttonBorderRadius,
  padding: 5,
  minWidth: 150,
});

const TokenTitle = styled(Typography)({
  color: CssVariables.white,
});

const InfoText = styled(Typography)({
  color: CssVariables.white,
});

const TokenIcon = styled("img")({
  width: "33px",
});

const InfoContainer = styled("div")({
  width: "100%",
  backgroundColor: CssVariables.swapInputbackground,
  border: `4px solid ${CssVariables.cardBorder}`,
  borderRadius: "20px",
  padding: 20,
});
