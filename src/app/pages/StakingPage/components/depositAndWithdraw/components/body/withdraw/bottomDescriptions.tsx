import { styled } from "@mui/material";
import { env } from "environment";
import { translations } from "locales/i18n";
import { useTranslation } from "react-i18next";
import { CssVariables } from "styles/cssVariables/cssVariables";

export const WithdrawBottomDescriptions = () => {
  const { t } = useTranslation();
  return (
    <Description>
      {t(
        translations.Staking.WithdrawBottomDescriptions_GOVERNANCETOKENNAME_MAINTOKENNAME(),
        {
          governanceTokenName: env.GOVERNANCE_TOKEN_NAME,
          mainTokenName: env.MAIN_TOKEN_NAME,
        }
      )}
    </Description>
  );
};

const Description = styled("h6")({
  fontSize: "14px",
  fontWeight: "600",
  margin: 0,
  color: CssVariables.commonTextColor,
  textAlign: "center",
  padding: "0 20px",
});
