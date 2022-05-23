import { Grid, styled, TextField, Typography } from "@mui/material";
import { globalSelectors } from "app/appSelectors";
import { translations } from "locales/i18n";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { GlobalActions } from "store/slice";
import { CssVariables } from "styles/cssVariables/cssVariables";
import { mobile } from "styles/media";
import { Slippages } from "utils/slippage";

export const SlippageSelect = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const selectedSlippage = useSelector(globalSelectors.selectedSlippage);
  const customSlippage = useSelector(globalSelectors.customSlippage);
  const valueToShow = customSlippage?.valueRaw || "";

  const handleSlippageInputChange = (e: string) => {
    if (e.split(".").length > 2) {
      return;
    }
    if (e.split(".").length === 2) {
      if (e.split(".")[1].length > 2) {
        return;
      }
    }
    if (isNaN(Number(e))) {
      return;
    }
    dispatch(GlobalActions.setCustomSlippage(e || "0"));
  };

  const handleChangeSelectedSlippage = (e: Slippages) => {
    dispatch(GlobalActions.setSlippage(e));
  };

  return (
    <StyledContainer container spacing={2}>
      <Grid item>
        <Text variant="body2">
          {t(translations.SwapPage.AdvanceOption.MaxSlippage())}:
        </Text>
      </Grid>

      <Grid item>
        <StyledInputContainer container spacing={2}>
          <Grid item>
            <Grid container alignItems="center" spacing={1}>
              <SelectButton
                isselected={
                  selectedSlippage === Slippages.One ? "true" : undefined
                }
                onClick={() => handleChangeSelectedSlippage(Slippages.One)}
              >
                1
              </SelectButton>

              <Grid item>
                <PercentageText variant="body2">%</PercentageText>
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
                <PercentageText variant="body2">%</PercentageText>
              </Grid>
            </Grid>
          </Grid>

          <Grid item>
            <Grid container alignItems="center" spacing={1}>
              <Grid item style={{ paddingTop: 0 }}>
                <InputField
                  type="tel"
                  inputProps={{ step: "0.01" }}
                  isselected={
                    selectedSlippage === Slippages.Custom ? "true" : undefined
                  }
                  value={valueToShow}
                  onChange={(e) => handleSlippageInputChange(e.target.value)}
                />
              </Grid>
              <Grid item>
                <PercentageText variant="body2">%</PercentageText>
              </Grid>
            </Grid>
          </Grid>
        </StyledInputContainer>
      </Grid>
    </StyledContainer>
  );
};

const StyledContainer = styled(Grid)({
  flexDirection: "row",
  alignItems: "center",
  justifyContent: "space-between",

  [mobile]: {
    alignItems: "flex-start",
    flexDirection: "column",
  },
});

const StyledInputContainer = styled(Grid)({
  flexDirection: "row",
  alignItems: "center",
});

const PercentageText = styled(Typography)({
  color: CssVariables.green,
  fontSize: "20px",
});

const InputField = styled(TextField)<{ isselected: "true" | undefined }>(
  ({ isselected }) => ({
    ".MuiInputBase-root": {
      color: CssVariables.white,
      fontSize: "16px",
      width: 60,
      height: 40,
    },

    ".MuiOutlinedInput-notchedOutline": {
      border: `2px solid ${CssVariables.green} !important`,
      borderRadius: CssVariables.buttonBorderRadius,
    },
    ...(isselected && {
      backgroundColor: CssVariables.green,
      borderRadius: CssVariables.buttonBorderRadius,
    }),
  })
);

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
    border: `2px solid ${CssVariables.green}`,
    borderRadius: CssVariables.buttonBorderRadius,
    backgroundColor: isselected
      ? CssVariables.green
      : CssVariables.swapInputbackground,
  })
);

const Text = styled(Typography)({
  color: CssVariables.bodyTextColor,
  fontSize: "16px",
});
