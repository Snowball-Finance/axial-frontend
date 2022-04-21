import { styled, Typography } from "@mui/material";
import { useDispatch } from "react-redux";
import { useTranslation } from "react-i18next";

import { translations } from "locales/i18n";
import { CssVariables } from "styles/cssVariables/cssVariables";
import { StakingPageActions } from "app/pages/Staking/slice";
import { TextButton } from "app/components/common/buttons/textButton";
import { convertPercentToDaysFromNow } from "app/pages/Staking/utils/dateToPercent";
import { addDaysToTodayAndGetOnlyDate } from "app/pages/Staking/utils/addDays";

export const MaxPeriod = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();

  const maximumDaysFromNow = convertPercentToDaysFromNow(100);
  const maximumDate = addDaysToTodayAndGetOnlyDate(maximumDaysFromNow);
  const handleMaxClick = () => {
    dispatch(StakingPageActions.setSelectedDateInStakingGovernance(maximumDate));
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
