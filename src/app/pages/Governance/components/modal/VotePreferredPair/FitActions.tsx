import { FC } from "react";
import { Grid } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { useTranslation } from "react-i18next";

import { translations } from "locales/i18n";
import { OutlinedButton } from "app/components/common/buttons/outlinedButton";
import { GovernancePageActions } from "app/pages/Governance/slice";
import { GovernancePageSelectors } from "app/pages/Governance/selectors";

export const FitActions: FC = () => {
  const { t } = useTranslation();

  const selectedPairs = useSelector(
    GovernancePageSelectors.selectedVoteAllocationGaugesArray
  );
  const dispatch = useDispatch();

  const handleFitProportionallyClick = () => {
    dispatch(GovernancePageActions.fitSelectedPairsProportionally());
  };

  const handleFitEquallyClick = () => {
    dispatch(GovernancePageActions.fitSelectedPairsEqually());
  };

  return selectedPairs.length < 2 ? (
    <></>
  ) : (
    <Grid container spacing={2}>
      <Grid item>
        <OutlinedButton onClick={handleFitProportionallyClick}>
          {t(translations.GovernancePage.VoteAllocation.FitProportionally())}
        </OutlinedButton>
      </Grid>

      <Grid item>
        <OutlinedButton onClick={handleFitEquallyClick}>
          {t(translations.GovernancePage.VoteAllocation.FitEqually())}
        </OutlinedButton>
      </Grid>
    </Grid>
  );
};
