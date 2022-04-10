import { styled, Slider, sliderClasses } from "@mui/material";
import { StakingSelectors } from "app/containers/BlockChain/Governance/Staking/selectors";
import { StakingPageSelectors } from "app/pages/Staking/selectors";
import { StakingPageActions } from "app/pages/Staking/slice";
import { translations } from "locales/i18n";
import { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { CssVariables } from "styles/cssVariables/cssVariables";
import { mobile } from "styles/media";

const marks = (t: any) => [
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

export const BalanceSlider = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const value = useSelector(
    StakingPageSelectors.selectSelectedDepositSliderValue
  );
  const lockedGovernanceTokenInfo = useSelector(
    StakingSelectors.lockedGovernanceTokenInfo
  );
  useEffect(() => {
    const endTimeInfo = lockedGovernanceTokenInfo?.endBlockTime;
    if (endTimeInfo) {
      dispatch(
        StakingPageActions.modifySelectedDepositSliderValueBasedOnExistingLockTime(
          endTimeInfo
        )
      );
    }
    return () => {};
  }, [lockedGovernanceTokenInfo]);

  const handleSliderChange = (v: number) => {
    dispatch(StakingPageActions.setSelectedEpoch(v));
  };

  return (
    <Wrapper>
      <Slider
        value={value}
        onChange={(_, v) => handleSliderChange(v as number)}
        step={25}
        marks={marks(t)}
      />
    </Wrapper>
  );
};

const Wrapper = styled("div")({
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
