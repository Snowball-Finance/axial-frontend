import { Checkbox, styled } from "@mui/material";
import { StakingSelectors } from "app/containers/BlockChain/Governance/Staking/selectors";
import { StakingActions } from "app/containers/BlockChain/Governance/Staking/slice";
import { translations } from "locales/i18n";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { CssVariables, FontFamilies } from "styles/cssVariables/cssVariables";

export const AdvancedOptions = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();

  const keepUnclaimed = useSelector(
    StakingSelectors.selectKeepThaUnclaimedWhenExtendingLockPeriod
  );

  const handleCheckboxChange = (_, checked: boolean) => {
    dispatch(
      StakingActions.setKeepTheUnclaimedWhenExtendingLockPeriod(checked)
    );
  };

  return (
    <Wrapper>
      <Title>{t(translations.Staking.AdvancedOptions())}</Title>
      <CheckboxWrapper>
        <CustomCheckbox
          checked={keepUnclaimed}
          onChange={handleCheckboxChange}
        />
        <Label>don't claim the unclaimed tokens yet</Label>
      </CheckboxWrapper>
    </Wrapper>
  );
};

const Label = styled("span")({
  color: CssVariables.commonTextColor,
  fontSize: "14px",
  fontFamily: FontFamilies.IBMPlexSans,
  fontWeight: 700,
});

const CustomCheckbox = styled(Checkbox)({
  path: {
    fill: CssVariables.green,
  },
});
const CheckboxWrapper = styled("div")({
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
