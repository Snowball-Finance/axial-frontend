import { styled } from "@mui/material";
import { SnowDatePicker } from "app/components/base/snowDatePicker";
import { StakingPageSelectors } from "app/pages/Staking/selectors";
import { StakingPageActions } from "app/pages/Staking/slice";
import { addDaysToTodayAndGetOnlyDate } from "app/pages/Staking/utils/addDays";
import { convertPercentToDaysFromNow } from "app/pages/Staking/utils/dateToPercent";
import { translations } from "locales/i18n";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { CssVariables } from "styles/cssVariables/cssVariables";

export const LockPeriod = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  let selectedEpoch = useSelector(StakingPageSelectors.selectSelectedEpoch);
  const daysToUnlock = useSelector(StakingPageSelectors.remainingDaysToShow);
  const minimumDate = addDaysToTodayAndGetOnlyDate(daysToUnlock || 0);
  const maximumDaysFromNow = convertPercentToDaysFromNow(100);
  const maximumDate = addDaysToTodayAndGetOnlyDate(maximumDaysFromNow);
  const handleDateChange = (date: Date) => {
    if (date) {
      dispatch(StakingPageActions.setSelectedDateInStakingGovernance(date));
    }
  };
  return (
    <Wrapper>
      <Title>{t(translations.Staking.LockPeriod())}</Title>
      {daysToUnlock ? (
        <SubTitle>
          current days to unlock :{daysToUnlock}, you can only increase the
          locking period
        </SubTitle>
      ) : (
        <></>
      )}
      <InputWrapper>
        <SnowDatePicker
          minDate={minimumDate}
          maxDate={maximumDate}
          value={selectedEpoch}
          onChange={handleDateChange}
        />
      </InputWrapper>
    </Wrapper>
  );
};

const SubTitle = styled("h6")({
  fontSize: "11px",
  margin: 0,
  color: CssVariables.primary,
});

const Title = styled("h6")({
  margin: 0,
  fontSize: "26px",
  textTransform: "uppercase",
});

const Wrapper = styled("div")({
  color: CssVariables.commonTextColor,
});

const InputWrapper = styled("div")({
  padding: "10px 16px",
  borderRadius: CssVariables.paperBorderRadius,
  border: `4px solid ${CssVariables.cardBorder}`,
  minHeight: "46px",
  textAlign: "end",
});
