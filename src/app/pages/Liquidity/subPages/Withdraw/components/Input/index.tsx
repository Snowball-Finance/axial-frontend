import React, { FC, useState } from "react";
import {
  styled,
  Grid,
  Typography,
  Slider,
  RadioGroup,
  FormControl,
  FormControlLabel,
} from "@mui/material";

import { CssVariables } from "styles/cssVariables/cssVariables";
import { SnowInput } from "app/components/base/SnowInput";
import { ContainedButton } from "app/components/common/buttons/containedButton";
import { CurrencyInput } from "../../../../components/CurrencyInput";
import { SnowRadio } from "app/components/base/SnowRadio";
import { SnowModal } from "app/components/common/modal";
import { WithdrawModal } from "app/pages/Liquidity/components/modal/Withdraw";

export const WithdrawInput: FC = () => {
  const [open, setOpen] = useState<boolean>(false); //TODO: implemented for testing, please change the functionality while integration

  return (
    <>
      <StyledWithdrawInput>
        <Grid container direction="column" spacing={2}>
          <Grid item>
            <HeaderText variant="h4">Withdraw</HeaderText>
          </Grid>

          <Grid item>
            <WithdrawSlider
              defaultValue={50}
              aria-label="Default"
              valueLabelDisplay="auto"
            />
          </Grid>

          <Grid item>
            <Grid container justifyContent="space-between" alignItems="center">
              <Grid item>
                <SubtitleText variant="body2">
                  withdrawl percentage (%):
                </SubtitleText>
              </Grid>

              <Grid item>
                <InputField value="0.00" onChange={() => {}} />
              </Grid>
            </Grid>
          </Grid>

          <Grid item>
            <StyledWithdrawOption>
              <StyledRadioGroup row>
                <FormControlLabel
                  value="combo"
                  control={<SnowRadio />}
                  label="Combo"
                />
                <FormControlLabel
                  value="tusd"
                  control={<SnowRadio />}
                  label="TUSD"
                />
                <FormControlLabel
                  value="mim"
                  control={<SnowRadio />}
                  label="MIM"
                />
                <FormControlLabel
                  value="frax"
                  control={<SnowRadio />}
                  label="FRAX"
                />
                <FormControlLabel
                  value="dai.e"
                  control={<SnowRadio />}
                  label="DAI.e"
                />
              </StyledRadioGroup>
            </StyledWithdrawOption>
          </Grid>

          {[1, 2, 3, 4].map((inputItem) => (
            <Grid item key={inputItem}>
              <CurrencyInput />
            </Grid>
          ))}

          <Grid item>
            <Grid container justifyContent="space-between">
              <Grid item>
                <SubtitleText variant="body2">bonus (%):</SubtitleText>
              </Grid>
              <Grid item>
                <SubtitleText variant="body2">0%</SubtitleText>
              </Grid>
            </Grid>
          </Grid>

          <Grid item alignSelf="center">
            <ContainedButton width={220} onClick={() => setOpen(true)}>
              Withdraw
            </ContainedButton>
          </Grid>
        </Grid>
      </StyledWithdrawInput>

      {open && (
        <SnowModal isOpen={open} onClose={() => setOpen(false)}>
          <WithdrawModal />
        </SnowModal>
      )}
    </>
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

const StyledWithdrawOption = styled(FormControl)({
  width: "100%",
  backgroundColor: CssVariables.swapInputbackground,
  border: `4px solid ${CssVariables.cardBorder}`,
  borderRadius: "20px",
  padding: "5px 20px",
  color: CssVariables.white,
});

const StyledRadioGroup = styled(RadioGroup)({
  width: "100%",
  display: "flex",
  justifyContent: "space-between",
  color: CssVariables.white,
});
