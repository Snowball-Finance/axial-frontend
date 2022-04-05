import React, { FC } from "react";
import { styled, Grid, Typography } from "@mui/material";
import { useTranslation } from "react-i18next";

import { translations } from "locales/i18n";
import { CssVariables } from "styles/cssVariables/cssVariables";

export const Header: FC = () => {
  const { t } = useTranslation();

  return (
    <Grid item>
      <HeaderText variant="h2">
        {t(translations.SwapPage.FromToken.From())}
      </HeaderText>
    </Grid>
  );
};

const HeaderText = styled(Typography)({
  color: CssVariables.white,
  textTransform: "uppercase",
});
