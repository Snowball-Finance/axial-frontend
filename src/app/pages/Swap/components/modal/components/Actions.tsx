import React, { FC } from "react";
import { Grid } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { useTranslation } from "react-i18next";

import { translations } from "locales/i18n";
import { ContainedButton } from "app/components/common/buttons/containedButton";
import { OutlinedButton } from "app/components/common/buttons/outlinedButton";
import { SwapSelectors } from "app/containers/Swap/selectors";
import { SwapActions } from "app/containers/Swap/slice";
import { SwapPageSelectors } from "app/pages/Swap/selectors";

export const Actions: FC = () => {
  const { t } = useTranslation();

  const isSwapping = useSelector(SwapSelectors.selectIsSwapping);
  const isApproving = useSelector(SwapSelectors.selectIsApproving);
  const isTokenApproved = useSelector(SwapSelectors.selectIsTokenApproved);
  const selectedFromToken = useSelector(SwapPageSelectors.selectedFromToken);
  const reviewSwapConfirmationData = useSelector(
    SwapPageSelectors.reviewSwapConfirmationData
  );
  const hasConfirmedHighPriceImpact = useSelector(
    SwapPageSelectors.hasConfirmedHighPriceImpact
  );

  const dispatch = useDispatch();

  const handleSwap = () => {
    dispatch(SwapActions.swap());
  };

  const handleApprove = () => {
    dispatch(SwapActions.approve());
  };

  return (
    <Grid container spacing={1} justifyContent="center">
      <Grid item xs={6}>
        <OutlinedButton
          onClick={handleApprove}
          loading={isApproving}
          disabled={isTokenApproved}
          fullWidth
        >
          {t(translations.SwapPage.ApproveButton())} {selectedFromToken?.symbol}
        </OutlinedButton>
      </Grid>

      <Grid item xs={6}>
        <ContainedButton
          onClick={handleSwap}
          loading={isSwapping}
          disabled={
            isSwapping ||
            !isTokenApproved ||
            (reviewSwapConfirmationData?.isHighPriceImpactTxn &&
              !hasConfirmedHighPriceImpact)
          }
          fullWidth
        >
          {t(translations.SwapPage.SwapButton())}
        </ContainedButton>
      </Grid>
    </Grid>
  );
};
