import { Grid, styled, Typography } from "@mui/material";
import { globalSelectors } from "app/appSelectors";
import { SnowInput } from "app/components/base/SnowInput";
import { translations } from "locales/i18n";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { GlobalActions } from "store/slice";
import { CssVariables } from "styles/cssVariables/cssVariables";
import { Slippages } from "utils/slippage";

export const SlippageSelect = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const selectedSlippage = useSelector(globalSelectors.selectedSlippage);
  const customSlippage = useSelector(globalSelectors.customSlippage);
  const valueToShow = customSlippage?.valueRaw || "";

  const handleSlippageInputChange = (e: string) => {
    dispatch(GlobalActions.setCustomSlippage(e));
  };

  const handleChangeSelectedSlippage = (e: Slippages) => {
    dispatch(GlobalActions.setSlippage(e));
  };

  return (
    <Grid container alignItems="center" spacing={2}>
      <Grid item>
        <Text variant="body2">
          {t(translations.SwapPage.AdvanceOption.MaxSlippage())}:
        </Text>
      </Grid>
      <Grid item>
        <Grid container alignItems="center" spacing={1}>
          <Grid item>
            <SelectButton
              isselected={
                selectedSlippage === Slippages.One ? "true" : undefined
              }
              onClick={() => handleChangeSelectedSlippage(Slippages.One)}
            >
              1
            </SelectButton>
          </Grid>
          <Grid item>
            <PercentageText variant="body1">%</PercentageText>
          </Grid>
        </Grid>
      </Grid>

      <Grid item>
        <Grid container alignItems="center" spacing={1}>
          <SelectButton
            isselected={
              selectedSlippage === Slippages.OneTenth ? "true" : undefined
            }
            onClick={() => handleChangeSelectedSlippage(Slippages.OneTenth)}
          >
            0.1
          </SelectButton>
          <Grid item>
            <PercentageText variant="body1">%</PercentageText>
          </Grid>
        </Grid>
      </Grid>

      <Grid item>
        <Grid container alignItems="center" spacing={1}>
          <Grid item>
            <InputField
              value={valueToShow}
              onChange={handleSlippageInputChange}
            />
          </Grid>
          <Grid item>
            <PercentageText variant="body1">%</PercentageText>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
};

const PercentageText = styled(Typography)({
  color: CssVariables.primary,
  fontSize: "20px",
});

const InputField = styled(SnowInput)({
  ".MuiInputBase-root": {
    color: CssVariables.white,
    fontSize: "16px",
    width: 60,
    height: 40,
  },

  ".MuiOutlinedInput-notchedOutline": {
    border: `2px solid ${CssVariables.primary} !important`,
    borderRadius: CssVariables.buttonBorderRadius,
  },
});

const SelectButton = styled("div")<{ isselected: string | undefined }>(
  ({ isselected }) => ({
    cursor: "pointer",
    color: CssVariables.white,
    fontSize: "16px",
    width: 60,
    height: 40,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    border: `2px solid ${CssVariables.primary}`,
    borderRadius: CssVariables.buttonBorderRadius,
    backgroundColor: isselected
      ? CssVariables.primary
      : CssVariables.swapInputbackground,
  })
);

const Text = styled(Typography)({
  color: CssVariables.bodyTextColor,
  fontSize: "16px",
});
