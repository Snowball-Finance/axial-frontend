import { FC } from "react";
import { styled, Typography } from "@mui/material";
import { useTranslation } from "react-i18next";

import { translations } from "locales/i18n";
import { CssVariables } from "styles/cssVariables/cssVariables";

export const HeaderText: FC = () => {
  const { t } = useTranslation();

  return (
    <Text variant="h2">{t(translations.Staking.StakingRootsaxialDescs())}</Text>
  );
};

const Text = styled(Typography)({
  color: CssVariables.white,
});
