import { FC } from "react";
import { Checkbox, Grid, styled, Typography } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { useTranslation } from "react-i18next";

import { translations } from "locales/i18n";
import { CssVariables } from "styles/cssVariables/cssVariables";
import { SwapPageSelectors } from "app/pages/Swap/selectors";
import { SwapPageActions } from "app/pages/Swap/slice";

export const HighPriceImpact: FC = () => {
  const { t } = useTranslation();

  const hasConfirmedHighPriceImpact = useSelector(
    SwapPageSelectors.hasConfirmedHighPriceImpact
  );

  const dispatch = useDispatch();

  const handleConfirm = () => {
    dispatch(
      SwapPageActions.setHasConfirmedHighPriceImpact(
        !hasConfirmedHighPriceImpact
      )
    );
  };

  return (
    <Wrapper>
      <Grid container>
        <Grid item xs={12}>
          <Typography variant="body2">
            {t(translations.SwapPage.ReviewSwap.HighPriceImpact())}
          </Typography>
        </Grid>

        <Grid item xs={12}>
          <Grid container alignItems="center" justifyContent="flex-start">
            <Grid item>
              <CustomCheckbox
                checked={hasConfirmedHighPriceImpact}
                onChange={handleConfirm}
              />
            </Grid>
            <Grid item>
              <Typography variant="body2">
                {t(translations.SwapPage.ReviewSwap.Understand())}
              </Typography>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Wrapper>
  );
};

const Wrapper = styled("div")({
  backgroundColor: CssVariables.error,
  padding: 20,
  borderRadius: 20,
});

const CustomCheckbox = styled(Checkbox)({
  path: {
    fill: CssVariables.primary,
  },
});
