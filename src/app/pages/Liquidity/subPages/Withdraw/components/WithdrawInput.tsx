import React, { FC } from "react";
import { styled, Grid, Typography, Slider } from "@mui/material";
import { useTranslation } from "react-i18next";

import { translations } from "locales/i18n";
import { CssVariables } from "styles/cssVariables/cssVariables";
import { SnowInput } from "app/components/base/SnowInput";
import { ContainedButton } from "app/components/common/buttons/containedButton";
import { CurrencyInput } from "./CurrencyInput";
import { Selection } from "./Selection";

export const WithdrawInput: FC = () => {
  const { t } = useTranslation();

  return (
    <StyledWithdrawInput>
      <Grid container direction="column" spacing={2}>
        <Grid item>
          <HeaderText variant="h4">
            {t(translations.LiquidityPage.Withdraw.Title())}
          </HeaderText>
        </Grid>

        <Grid item>
          <WithdrawSlider
            defaultValue={0}
            aria-label="Default"
            valueLabelDisplay="auto"
          />
        </Grid>

        <Grid item>
          <Grid container justifyContent="space-between" alignItems="center">
            <Grid item>
              <SubtitleText variant="body2">
                {t(translations.LiquidityPage.Withdraw.WithdrawlPercentage())}{" "}
                (%):
              </SubtitleText>
            </Grid>

            <Grid item>
              <InputField value="0.00" onChange={() => {}} />
            </Grid>
          </Grid>
        </Grid>

        <Selection />

        <CurrencyInput />

        <Grid item>
          <Grid container justifyContent="space-between">
            <Grid item>
              <SubtitleText variant="body2">
                {t(translations.LiquidityPage.Withdraw.Bonus())} (%):
              </SubtitleText>
            </Grid>

            <Grid item>
              <SubtitleText variant="body2">0%</SubtitleText>
            </Grid>
          </Grid>
        </Grid>

        <Grid item alignSelf="center">
          <ContainedButton width={220}>
            {t(translations.LiquidityPage.ActionButtons.Withdraw())}
          </ContainedButton>
        </Grid>
      </Grid>
    </StyledWithdrawInput>
  );
};

const StyledWithdrawInput = styled("div")({
  width: 600,
  margin: "0 auto",
  backgroundColor: CssVariables.poolCardBackground,
  border: `4px solid ${CssVariables.cardBorder}`,
  borderRadius: "20px",
  padding: "40px",
});

const HeaderText = styled(Typography)({
  color: CssVariables.white,
  fontSize: "26px",
});

const SubtitleText = styled(Typography)({
  color: CssVariables.bodyTextColor,
  fontSize: "16px",
});

const InputField = styled(SnowInput)({
  ".MuiInputBase-root": {
    color: CssVariables.white,
    fontSize: "16px",
    height: 40,
  },

  ".MuiInputBase-input": {
    textAlign: "right",
  },

  ".MuiOutlinedInput-notchedOutline": {
    border: "none",
  },
});

const WithdrawSlider = styled(Slider)({
  color: CssVariables.primary,
  height: 10,

  "& .MuiSlider-track": {
    border: "none",
  },
  "& .MuiSlider-thumb": {
    height: 24,
    width: 24,
    backgroundColor: CssVariables.primary,
    border: `2px solid ${CssVariables.primary}`,
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
    backgroundColor: CssVariables.primary,
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
});
