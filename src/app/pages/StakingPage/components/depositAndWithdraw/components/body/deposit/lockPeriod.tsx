import { styled } from "@mui/material";
import { StakingPageSelectors } from "app/pages/StakingPage/selectors";
import { translations } from "locales/i18n";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import { CssVariables } from "styles/cssVariables/cssVariables";

export const LockPeriod = () => {
  const { t } = useTranslation();
  const selectedEpoch = useSelector(StakingPageSelectors.selectSelectedEpoch);
  return (
    <Wrapper>
      <Title>{t(translations.Staking.LockPeriod())}</Title>
      <InputWrapper>
        {selectedEpoch?.toLocaleString().split(",")[0]}
      </InputWrapper>
    </Wrapper>
  );
};

const Title = styled("h6")({
  fontSize: "16px",
  fontWeight: "400",
  color: CssVariables.darkText,
  margin: 0,
});

const Wrapper = styled("div")({});

const InputWrapper = styled("div")({
  padding: "10px 16px",
  borderRadius: CssVariables.paperBorderRadius,
  border: `1px solid ${CssVariables.ctaBlue}`,
  minHeight: "46px",
});
