import { styled, Grid, Typography } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { useTranslation } from "react-i18next";

import { translations } from "locales/i18n";
import { CssVariables } from "styles/cssVariables/cssVariables";
import { SnowDatePicker } from "app/components/base/snowDatePicker";
import { StakingPageSelectors } from "app/pages/Staking/selectors";
import { StakingPageActions } from "app/pages/Staking/slice";
import { addDaysToTodayAndGetOnlyDate } from "app/pages/Staking/utils/addDays";
import { convertPercentToDaysFromNow } from "app/pages/Staking/utils/dateToPercent";
import { CardWrapper } from "app/components/wrappers/Card";
import { MaxPeriod } from "./MaxPeriod";

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
    <Grid container spacing={1}>
      <Grid item xs={12}>
        <Grid container justifyContent="space-between" alignItems="center">
          <Grid item>
            <Text variant="h2">{t(translations.Staking.LockPeriod())}</Text>
          </Grid>

          <Grid item>
            <MaxPeriod />
          </Grid>
        </Grid>
      </Grid>

      <Grid item xs={12}>
        <CardWrapper>
          <Grid container justifyContent="flex-end">
            <Grid item>
              <SnowDatePicker
                minDate={minimumDate}
                maxDate={maximumDate}
                value={selectedEpoch}
                onChange={handleDateChange}
              />
            </Grid>
          </Grid>
        </CardWrapper>
      </Grid>

      {daysToUnlock ? (
        <Grid item xs={12}>
          <SubTitle variant="body1">
            Current days to unlock :{daysToUnlock}, you can only increase the
            locking period
          </SubTitle>
        </Grid>
      ) : (
        <></>
      )}
    </Grid>
  );
};

const SubTitle = styled(Typography)({
  color: CssVariables.primary,
});

const Text = styled(Typography)({
  color: CssVariables.white,
  textTransform: "uppercase",
});
