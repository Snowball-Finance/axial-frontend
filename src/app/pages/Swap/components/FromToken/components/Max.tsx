import React, { FC } from "react";
import { styled, Grid } from "@mui/material";
import { useDispatch } from "react-redux";
import { useTranslation } from "react-i18next";

import { translations } from "locales/i18n";
import { TextButton } from "app/components/common/buttons/textButton";
import { SwapPageActions } from "../../../slice";

export const Max: FC = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();

  const handleMaxAmountSelection = () => {
    dispatch(SwapPageActions.maxAmountSelection());
  };

  return (
    <Grid item>
      <MaxText onClick={handleMaxAmountSelection}>
        {t(translations.SwapPage.FromToken.Max())}
      </MaxText>
    </Grid>
  );
};

const MaxText = styled(TextButton)({
  fontSize: "1.5rem",
});
