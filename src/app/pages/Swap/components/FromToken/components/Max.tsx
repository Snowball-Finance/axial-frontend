import React, { FC } from "react";
import { styled, Grid, Typography } from "@mui/material";
import { useDispatch } from "react-redux";
import { useTranslation } from "react-i18next";

import { translations } from "locales/i18n";
import { TextButton } from "app/components/common/buttons/textButton";
import { SwapPageActions } from "../../../slice";
import { CssVariables } from "styles/cssVariables/cssVariables";

export const Max: FC = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();

  const handleMaxAmountSelection = () => {
    dispatch(SwapPageActions.maxAmountSelection());
  };

  return (
    <Grid item>
      <TextButton onClick={handleMaxAmountSelection}>
        <MaxText variant="h2">
          {t(translations.SwapPage.FromToken.Max())}
        </MaxText>
      </TextButton>
    </Grid>
  );
};

const MaxText = styled(Typography)({
  color: CssVariables.green,
  textTransform: "uppercase",
});
