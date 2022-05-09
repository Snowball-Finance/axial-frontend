import { styled, Typography } from "@mui/material";
import { useDispatch } from "react-redux";
import { useTranslation } from "react-i18next";

import { translations } from "locales/i18n";
import { CssVariables } from "styles/cssVariables/cssVariables";
import { StakingPageActions } from "app/pages/Staking/slice";
import { TextButton } from "app/components/common/buttons/textButton";

export const Max = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();

  const handleMaxClick = () => {
    dispatch(StakingPageActions.stakeAllTheBalances());
  };
  return (
    <TextButton onClick={handleMaxClick}>
      <MaxText variant="h2">{t(translations.Common.Max())}</MaxText>
    </TextButton>
  );
};

const MaxText = styled(Typography)({
  color: CssVariables.green,
  textTransform: "uppercase",
});
