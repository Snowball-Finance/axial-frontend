import React, { FC } from "react";
import { styled, Grid, Typography, Checkbox } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { useTranslation } from "react-i18next";

import { translations } from "locales/i18n";
import { CssVariables } from "styles/cssVariables/cssVariables";
import { SnowInput } from "app/components/base/SnowInput";
import { globalSelectors } from "app/appSelectors";
import { GlobalActions } from "store/slice";
import { ContainedButton } from "app/components/common/buttons/containedButton";
import { OutlinedButton } from "app/components/common/buttons/outlinedButton";

export const AdvanceOption: FC = () => {
  const { t } = useTranslation();
  const infiniteApproval = useSelector(globalSelectors.infiniteApproval);
  const dispatch = useDispatch();

  const handleInfiniteApproval = () => {
    dispatch(GlobalActions.setInfiniteApproval(!infiniteApproval));
  };

  return (
    <StyledContainerItem item>
      <StyledAdvanceOption>
        <Grid container direction="column" spacing={2}>
          <Grid item>
            <Text variant="body2">
              {t(translations.SwapPage.AdvanceOption.Title())}
            </Text>
          </Grid>

          <Grid item>
            <Grid container alignItems="center" justifyContent="flex-start">
              <Grid item>
                <CustomCheckbox
                  checked={infiniteApproval}
                  onChange={handleInfiniteApproval}
                />
              </Grid>
              <Grid item>
                <Text variant="body2">
                  {t(translations.SwapPage.AdvanceOption.InfiniteApproval())}
                </Text>
              </Grid>
            </Grid>
          </Grid>

          <Grid item>
            <Grid container alignItems="center" spacing={2}>
              <Grid item>
                <Text variant="body2">
                  {t(translations.SwapPage.AdvanceOption.MaxSlippage())}:
                </Text>
              </Grid>

              <Grid item>
                <ContainedButton>0.1%</ContainedButton>
              </Grid>

              <Grid item>
                <OutlinedButton>1%</OutlinedButton>
              </Grid>

              <Grid item>
                <Grid container alignItems="center" spacing={1}>
                  <Grid item>
                    <InputField value="" onChange={() => {}} />
                  </Grid>
                  <Grid item>
                    <PercentageText variant="body1">%</PercentageText>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </StyledAdvanceOption>
    </StyledContainerItem>
  );
};

const StyledAdvanceOption = styled("div")({
  width: "100%",
  backgroundColor: CssVariables.swapInputbackground,
  border: `4px solid ${CssVariables.cardBorder}`,
  borderRadius: "20px",
  padding: 20,
});

const Text = styled(Typography)({
  color: CssVariables.bodyTextColor,
  fontSize: "16px",
});

const InputField = styled(SnowInput)({
  ".MuiInputBase-root": {
    color: CssVariables.white,
    fontSize: "16px",
    width: 60,
    height: 40,
  },

  ".MuiOutlinedInput-notchedOutline": {
    border: `2px solid ${CssVariables.primary}`,
    borderRadius: CssVariables.buttonBorderRadius,
  },
});

const PercentageText = styled(Typography)({
  color: CssVariables.primary,
  fontSize: "20px",
});

const StyledContainerItem = styled(Grid)({
  width: "100%",
});

const CustomCheckbox = styled(Checkbox)({
  path: {
    fill: CssVariables.primary,
  },
});
