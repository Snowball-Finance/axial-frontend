import React, { FC } from "react";
import { styled, Grid, Typography, Checkbox } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { useTranslation } from "react-i18next";

import { translations } from "locales/i18n";
import { CssVariables } from "styles/cssVariables/cssVariables";
import { globalSelectors } from "app/appSelectors";
import { GlobalActions } from "store/slice";
import { SlippageSelect } from "./slippageSelect";

export const AdvanceOption: FC = () => {
  const { t } = useTranslation();
  const infiniteApproval = useSelector(globalSelectors.infiniteApproval);
  const dispatch = useDispatch();

  const handleInfiniteApproval = () => {
    dispatch(GlobalActions.setInfiniteApproval(!infiniteApproval));
  };

  return (
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
          <SlippageSelect />
        </Grid>
      </Grid>
    </StyledAdvanceOption>
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

const CustomCheckbox = styled(Checkbox)({
  path: {
    fill: CssVariables.primary,
  },
});
