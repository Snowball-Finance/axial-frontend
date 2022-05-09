import { FC } from "react";
import { styled, Typography } from "@mui/material";
import { useTranslation } from "react-i18next";

import { translations } from "locales/i18n";
import { CssVariables } from "styles/cssVariables/cssVariables";
import { env } from "environment";

export const WithdrawWarning: FC = () => {
  const { t } = useTranslation();

  return (
    <Wrapper>
      <Text variant="body1">
        {t(
          translations.Staking.WithdrawWarning_ACCRUINGTOKENNAME_MAINTOKENNAME(),
          {
            accruingTokenName: env.ACCRUING_TOKEN_NAME,
            mainTokenName: env.MAIN_TOKEN_NAME,
          }
        )}
      </Text>
    </Wrapper>
  );
};

const Wrapper = styled("div")({
  backgroundColor: CssVariables.error,
  padding: "14px 36px",
  borderRadius: 20,
});

const Text = styled(Typography)({
  color: CssVariables.white,
});
