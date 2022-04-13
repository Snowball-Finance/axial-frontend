import {
  styled,
  Slider,
  sliderClasses,
  Mark,
  Box,
  SliderProps,
} from "@mui/material";
import { StakingPageSelectors } from "app/pages/Staking/selectors";
import { StakingPageActions } from "app/pages/Staking/slice";
import { findEquivalentOfANumberFromARangeToANumberFromAnotherRange } from "app/pages/Staking/utils/dateToPercent";
import { translations } from "locales/i18n";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { CssVariables } from "styles/cssVariables/cssVariables";
import { mobile } from "styles/media";

const marks = (t: any): Mark[] => [
  {
    value: 0,
    label: t(translations.Staking.epochs.oneDay()),
  },
  {
    value: 25,
    label: t(translations.Staking.epochs.oneWeek()),
  },
  {
    value: 50,
    label: t(translations.Staking.epochs.oneMonth()),
  },
  {
    value: 75,
    label: t(translations.Staking.epochs.oneYear()),
  },
  {
    value: 100,
    label: t(translations.Staking.epochs.twoYears()),
  },
];

export const LockPeriodSlider = () => {
  const [min, setMin] = useState(0);
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const value = useSelector(
    StakingPageSelectors.selectSelectedDepositSliderValue
  );
  const handleSliderChange = (v: number) => {
    dispatch(StakingPageActions.setSelectedEpoch(v));
  };
  const daysToUnlock = useSelector(StakingPageSelectors.remainingDaysToShow);
  const selectedEpoch = useSelector(StakingPageSelectors.selectSelectedEpoch);
  if (selectedEpoch) {
    console.log(
      findEquivalentOfANumberFromARangeToANumberFromAnotherRange(
        8,
        [8, 30],
        [26, 50]
      )
    );
  }

  return (
    <Wrapper>
      {min !== 100 ? (
        <StyledSlider
          min={min}
          max={100}
          value={value}
          onChange={(_, v) => handleSliderChange(v as number)}
          marks={marks(t)}
        />
      ) : (
        <div style={{ color: CssVariables.commonTextColor }}>
          you can only lock for 2 years
        </div>
      )}
      {/* {min !== 100 && (
        <DisabledWrapper>
          {Array(numberOfDisabledSliders)
            .fill(0)
            .map((_, i) => {
              return <DisabledSlider key={i} />;
            })}
        </DisabledWrapper>
      )} */}
    </Wrapper>
  );
};

const DisabledWrapper = styled("div")({
  width: "330px",
  display: "flex",
  marginTop: "14px",
});

const DisabledSlider = styled("div")({
  width: "calc(25% + 18px)",
  height: "2px",
  marginRight: "5px",
  backgroundColor: CssVariables.commonTextColor,
});

const Wrapper = styled(Box)({
  height: "50px",
  position: "relative",
  [sliderClasses.markLabel]: {
    fontSize: "11px",
    color: CssVariables.commonTextColor,
  },
  ".MuiSlider-markLabel": {
    color: CssVariables.commonTextColor,
  },
  [mobile]: {
    width: "90%",
    padding: 0,
  },
});

const StyledSlider = styled(Slider)<SliderProps>({
  position: "absolute",
  right: "0",
});
