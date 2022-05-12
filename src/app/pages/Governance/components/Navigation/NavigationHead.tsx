import { FC } from "react";
import { styled, Grid, Typography } from "@mui/material";
import { useDispatch } from "react-redux";
import { push } from "connected-react-router";
import { useLocation } from "react-router-dom";
import { useTranslation } from "react-i18next";

import { translations } from "locales/i18n";
import { CssVariables } from "styles/cssVariables/cssVariables";
import { GovernanceSubPages } from "app/pages/Governance/routes";

export const NavigationHead: FC = () => {
  const { t } = useTranslation();
  const location = useLocation();

  const dispatch = useDispatch();

  const handleClick = (isProposal: boolean) => {
    if (isProposal) {
      dispatch(push(GovernanceSubPages.proposals));
    } else {
      dispatch(push(GovernanceSubPages.allocations));
    }
  };

  const isAllocationActive =
    location?.pathname === GovernanceSubPages.allocations;

  return (
    <Grid container spacing={2} alignItems="center">
      <Grid item>
        <Text
          variant="h2"
          isactive={(!isAllocationActive).toString()}
          onClick={() => handleClick(true)}
        >
          {t(translations.GovernancePage.Tabs.Proposals())}
        </Text>
      </Grid>

      <Grid item>
        <Text
          variant="h2"
          isactive={isAllocationActive.toString()}
          onClick={() => handleClick(false)}
        >
          {t(translations.GovernancePage.Tabs.VoteAllocation())}
        </Text>
      </Grid>
    </Grid>
  );
};

const Text = styled(Typography)<{ isactive: string }>(({ isactive }) => ({
  color: JSON.parse(isactive) ? CssVariables.green : CssVariables.white,
  textTransform: "uppercase",
  textDecoration: JSON.parse(isactive) ? "underline" : "none",
  cursor: "pointer",
}));
