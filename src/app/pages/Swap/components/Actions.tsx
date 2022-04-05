/**
 *
 * Swap Page
 *
 */

import React, { FC, useEffect } from "react";
import { Grid } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { parseUnits } from "@ethersproject/units";
import { useTranslation } from "react-i18next";

import { translations } from "locales/i18n";
import { ContainedButton } from "app/components/common/buttons/containedButton";
import { SwapSelectors } from "app/containers/Swap/selectors";
import { SwapActions } from "app/containers/Swap/slice";
import { Web3Selectors } from "app/containers/BlockChain/Web3/selectors";
import { WalletToggle } from "app/components/common/walletToggle";
import { SwapPageSelectors } from "../selectors";
import { SwapPageActions } from "../slice";
import { ReviewConfirmationModal } from "./ReviewConfirmationModal";

export const Actions: FC = () => {
  const { t } = useTranslation();

  const dispatch = useDispatch();
  const account = useSelector(Web3Selectors.selectAccount);
  const selectedFromToken = useSelector(SwapPageSelectors.selectedFromToken);
  const selectedToToken = useSelector(SwapPageSelectors.selectedToToken);
  const selectedFromAmount = useSelector(SwapPageSelectors.selectedFromAmount);
  const bestPath = useSelector(SwapSelectors.selectBestPath);
  const errorMessage = useSelector(SwapPageSelectors.errorMessage);
  const isGettingBestSwapPath = useSelector(
    SwapSelectors.selectIsGettingBestPath
  );

  useEffect(() => {
    if (
      selectedFromToken?.symbol &&
      selectedToToken?.symbol &&
      selectedFromAmount
    ) {
      dispatch(
        SwapActions.findBestPath({
          fromToken: selectedFromToken,
          amountToGive: parseUnits(
            selectedFromAmount,
            selectedFromToken?.decimals
          ),
          toToken: selectedToToken,
        })
      );
    }
  }, [selectedFromToken?.symbol, selectedToToken?.symbol, selectedFromAmount]);

  const handleOpen = () => {
    dispatch(SwapPageActions.buildReviewSwap());
  };

  return (
    <>
      <Grid item xs={12}>
        {account ? (
          <ContainedButton
            onClick={handleOpen}
            disabled={!bestPath || !!errorMessage || isGettingBestSwapPath}
            fullWidth
          >
            {errorMessage
              ? errorMessage
              : t(translations.SwapPage.SwapButton())}
          </ContainedButton>
        ) : (
          <WalletToggle />
        )}
      </Grid>

      <ReviewConfirmationModal />
    </>
  );
};
