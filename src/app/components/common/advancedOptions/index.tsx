import React, { FC } from "react";
import {
  styled,
  Grid,
  Typography,
  Checkbox,
  Accordion,
  AccordionSummary,
  AccordionDetails,
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { useTranslation } from "react-i18next";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

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
    <StyledAccordion>
      <StyledAccordionSummary
        expandIcon={<ExpandMoreIcon color="primary" />}
        aria-controls="panel1a-content"
        id="panel1a-header"
      >
        <Text variant="body2">
          {t(translations.SwapPage.AdvanceOption.Title())}
        </Text>
      </StyledAccordionSummary>

      <StyledAccordionDetails>
        <Grid container spacing={2}>
          <Grid item xs={12}>
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

          <Grid item xs={12}>
            <SlippageSelect />
          </Grid>
        </Grid>
      </StyledAccordionDetails>
    </StyledAccordion>
  );
};

const StyledAccordion = styled(Accordion)({
  backgroundColor: CssVariables.swapInputbackground,
  border: `4px solid ${CssVariables.cardBorder}`,

  "&.MuiPaper-root": {
    borderRadius: "20px",
  },
});

const StyledAccordionSummary = styled(AccordionSummary)({});

const StyledAccordionDetails = styled(AccordionDetails)({});

const Text = styled(Typography)({
  color: CssVariables.bodyTextColor,
  fontSize: "16px",
});

const CustomCheckbox = styled(Checkbox)({
  path: {
    fill: CssVariables.primary,
  },
});
