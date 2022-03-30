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
import { SnowModal } from "app/components/common/modal";
import { Review } from "./Review";

export const Actions: FC = () => {
  const { t } = useTranslation();

  const dispatch = useDispatch();
  const account = useSelector(Web3Selectors.selectAccount);
  const isSwapping = useSelector(SwapSelectors.selectIsSwapping);
  const selectedFromToken = useSelector(SwapPageSelectors.selectedFromToken);
  const selectedToToken = useSelector(SwapPageSelectors.selectedToToken);
  const selectedFromAmount = useSelector(SwapPageSelectors.selectedFromAmount);
  const bestPath = useSelector(SwapSelectors.selectBestPath);
  const errorMessage = useSelector(SwapPageSelectors.errorMessage);
  const isGettingBestSwapPath = useSelector(
    SwapSelectors.selectIsGettingBestPath
  );
  const isSwapModalOpen = useSelector(SwapPageSelectors.isModalOpen);

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
    dispatch(SwapPageActions.setSwapModalOpen(true));
  };

  const handleClose = () => {
    dispatch(SwapPageActions.setSwapModalOpen(false));
  };

  return (
    <>
      <Grid item>
        {account ? (
          <ContainedButton
            width={220}
            onClick={handleOpen}
            loading={isSwapping}
            disabled={
              isSwapping || !bestPath || !!errorMessage || isGettingBestSwapPath
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

      {isSwapModalOpen && (
        <SnowModal
          isOpen={isSwapModalOpen}
          onClose={handleClose}
          title={`${t(translations.SwapPage.ReviewSwap.Title())}`}
        >
          <Review />
        </SnowModal>
      )}
    </>
  );
};
