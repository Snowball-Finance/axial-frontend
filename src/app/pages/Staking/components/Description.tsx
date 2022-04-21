import { FC } from "react";
import { styled, Typography } from "@mui/material";
import { useTranslation } from "react-i18next";

import { translations } from "locales/i18n";
import { CssVariables } from "styles/cssVariables/cssVariables";
import { env } from "environment";

export const Description: FC = () => {
  const { t } = useTranslation();

  return (
    <Text variant="body2" align="center">
      {t(
        translations.Staking.WithdrawBottomDescriptions_GOVERNANCETOKENNAME_MAINTOKENNAME(),
        {
          governanceTokenName: env.GOVERNANCE_TOKEN_NAME,
          mainTokenName: env.MAIN_TOKEN_NAME,
        }
      )}{" "}
      <AnchorWrapper>
        <Anchor target="_blank" rel="noreferrer" href={`https://snowtrace.io`}>
          Read more
        </Anchor>
      </AnchorWrapper>
    </Text>
  );
};

const AnchorWrapper = styled("span")({});

const Text = styled(Typography)({
  color: CssVariables.white,
});

const Anchor = styled("a")({
  color: CssVariables.green,
  textDecoration: "none",
  textAlign: "center",
});
