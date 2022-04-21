import { useEffect, useState } from "react";
import {
  styled,
  Slider,
  sliderClasses,
  Mark,
  Box,
  SliderProps,
} from "@mui/material";
import { subtract } from "precise-math";
import { useDispatch, useSelector } from "react-redux";
import { useTranslation } from "react-i18next";

import { translations } from "locales/i18n";
import { StakingPageSelectors } from "app/pages/Staking/selectors";
import { StakingPageActions } from "app/pages/Staking/slice";
import { convertDaysFromNowToPercentage } from "app/pages/Staking/utils/dateToPercent";
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
  const remainingDaysToShow = useSelector(
    StakingPageSelectors.remainingDaysToShow
  );
  const handleSliderChange = (v: number) => {
    dispatch(StakingPageActions.setSelectedSliderValue(v));
  };

  useEffect(() => {
    const minimum = convertDaysFromNowToPercentage(remainingDaysToShow || 0);
    setMin(minimum);
    dispatch(StakingPageActions.setSelectedSliderValue(minimum));
    return () => {};
  }, [remainingDaysToShow]);

  return (
    <Wrapper>
      {min !== 100 && <DisabledSlider width={`${min}%`} />}
      {min !== 100 ? (
        <StyledSlider
          width={`${subtract(100, min)}%`}
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
    </Wrapper>
  );
};

const DisabledSlider = styled("div")<{ width: string }>(({ width }) => ({
  width,
  height: 10,
  marginTop: "14px",
  backgroundColor: CssVariables.primaryDisabled,
  borderRadius: 5,
}));

const Wrapper = styled(Box)({
  color: CssVariables.green,
  height: 50,
  width: "98%",
  margin: "auto",
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
  display: "flex",
});

const StyledSlider = styled(Slider)<SliderProps & { width: string }>(
  ({ width }) => ({
    width,
    maxWidth: width,
    color: CssVariables.green,
    height: 10,

    "& .MuiSlider-track": {
      border: "none",
    },
    "& .MuiSlider-thumb": {
      height: 24,
      width: 24,
      backgroundColor: CssVariables.green,
      border: `2px solid ${CssVariables.green}`,
      "&:focus, &:hover, &.Mui-active, &.Mui-focusVisible": {
        boxShadow: "inherit",
      },
      "&:before": {
        display: "none",
      },
    },
    "& .MuiSlider-valueLabel": {
      lineHeight: 1.2,
      fontSize: 12,
      background: "unset",
      padding: 0,
      width: 32,
      height: 32,
      borderRadius: "50% 50% 50% 0",
      backgroundColor: CssVariables.green,
      transformOrigin: "bottom left",
      transform: "translate(50%, -100%) rotate(-45deg) scale(0)",
      "&:before": { display: "none" },
      "&.MuiSlider-valueLabelOpen": {
        transform: "translate(50%, -100%) rotate(-45deg) scale(1)",
      },
      "& > *": {
        transform: "rotate(45deg)",
      },
    },
  })
);
