import { styled } from "@mui/material";
import { env } from "environment";
import { translations } from "locales/i18n";
import { useTranslation } from "react-i18next";
import { CssVariables } from "styles/cssVariables/cssVariables";

export const StakingDescription = () => {
  const { t } = useTranslation();
  return (
    <Wrapper>
      <Title>
        {t(translations.Staking.StakingPageFirstDescTitle_MAINTOKENNAME(), {
          mainTokenName: env.MAIN_TOKEN_NAME,
        })}
      </Title>
      <Desc>{t(translations.Staking.StakingPageFirstDesc())}</Desc>
    </Wrapper>
  );
};

const Desc = styled("div")({
  fontSize: "16px",
  fontWeight: 400,
  color: CssVariables.commonTextColor,
});

const Title = styled("h1")({
  fontSize: "42px",
  fontWeight: 700,
  margin: 0,
  color: CssVariables.commonTextColor,
  marginBottom: "20px",
});

const Wrapper = styled("div")({
  maxWidth: "525px",
});
