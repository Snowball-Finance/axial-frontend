import React, { FC } from "react";
import {
  styled,
  Grid,
  Typography,
  RadioGroup,
  FormControl,
  FormControlLabel,
} from "@mui/material";
import { useTranslation } from "react-i18next";

import { translations } from "locales/i18n";
import { CssVariables } from "styles/cssVariables/cssVariables";
import { SnowRadio } from "app/components/base/SnowRadio";

export const Steps: FC = () => {
  const { t } = useTranslation();

  return (
    <Grid container direction="column" spacing={2}>
      <Grid item alignSelf="center">
        <FormControl>
          <StyledRadioGroup row>
            <FormControlLabel
              value="approval"
              control={<SnowRadio />}
              label={`${t(translations.RewardsPage.Modal.Approval())} a3md`}
            />
            <FormControlLabel
              value="withdraw"
              control={<SnowRadio />}
              label={`${t(translations.RewardsPage.Modal.Withdraw())}`}
            />
          </StyledRadioGroup>
        </FormControl>
      </Grid>

      <Grid item alignSelf="center">
        <Text variant="body2">
          {t(translations.RewardsPage.Modal.Steps())} 1/2
        </Text>
      </Grid>
    </Grid>
  );
};

const Text = styled(Typography)({});

const StyledRadioGroup = styled(RadioGroup)({
  width: "100%",
  display: "flex",
  justifyContent: "space-between",
  color: CssVariables.white,
});
