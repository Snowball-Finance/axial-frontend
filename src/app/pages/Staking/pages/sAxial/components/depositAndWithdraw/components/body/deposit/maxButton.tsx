import { styled } from "@mui/material";
import { StakingPageActions } from "app/pages/Staking/slice";
import { translations } from "locales/i18n";
import { useTranslation } from "react-i18next";
import { useDispatch } from "react-redux";
import { CssVariables } from "styles/cssVariables/cssVariables";

export const MaxButton = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const handleMaxClick = () => {
    dispatch(StakingPageActions.stakeAllTheBalances());
  };
  return (
    <StyledMaxButton onClick={handleMaxClick}>
      {t(translations.Common.Max())}
    </StyledMaxButton>
  );
};

const StyledMaxButton = styled("button")({
  fontSize: "26px",
  textTransform: "uppercase",
  color: CssVariables.primary,
  backgroundColor: "transparent",
  border: "none",
  padding: "0",
  cursor: "pointer",
});
