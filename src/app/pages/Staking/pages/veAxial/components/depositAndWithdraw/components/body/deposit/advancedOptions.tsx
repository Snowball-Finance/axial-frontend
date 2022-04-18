import {
  FormControl,
  FormControlLabel,
  Radio,
  RadioGroup,
  styled,
} from "@mui/material";
import { StakingPageSelectors } from "app/pages/Staking/selectors";
import { StakingPageActions } from "app/pages/Staking/slice";
import { DepositUnlockPeriod } from "app/pages/Staking/types";
import { translations } from "locales/i18n";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { CssVariables } from "styles/cssVariables/cssVariables";

const options = (t: any) => [
  {
    label: t(translations.Staking.UnlockTokensDaily()),
    value: DepositUnlockPeriod.daily,
  },
  {
    label: t(translations.Staking.UnlockTokensAtTheEndOfTheLockingPeriod()),
    value: DepositUnlockPeriod.end,
  },
];

export const AdvancedOptions = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();

  const selectedPeriod = useSelector(
    StakingPageSelectors.selectedDepositUnlockPeriod
  );

  const handleRadioChange = (e: DepositUnlockPeriod) => {
    dispatch(StakingPageActions.setSelectedDepositUnlockPeriod(e));
  };

  return (
    <Wrapper>
      <Title>{t(translations.Staking.AdvancedOptions())}</Title>
      <OptionsWrapper>
        <FormControl>
          <RadioGroup
            aria-labelledby="demo-controlled-radio-buttons-group"
            name="controlled-radio-buttons-group"
            value={selectedPeriod}
            onChange={(_, v) => handleRadioChange(v as DepositUnlockPeriod)}
          >
            {options(t).map((option, index) => (
              <FormControlLabel
                key={index}
                value={option.value}
                control={<Radio />}
                label={option.label}
              />
            ))}
          </RadioGroup>
        </FormControl>
      </OptionsWrapper>
    </Wrapper>
  );
};

const OptionsWrapper = styled("div")({
  border: `4px solid ${CssVariables.cardBorder}`,
  padding: "24px 16px",
  borderRadius: CssVariables.paperBorderRadius,
});

const Title = styled("h6")({
  fontSize: "26px",
  margin: 0,
  color: CssVariables.commonTextColor,
  textTransform: "uppercase",
});

const Wrapper = styled("div")({
  label: {
    span: {
      fontSize: "14px",
    },
  },
  ".MuiFormControlLabel-label": {
    flex: 1,
    color: CssVariables.commonTextColor,
  },
  ".MuiButtonBase-root:not(.Mui-checked)": {
    color: CssVariables.commonTextColor,
  },
});
