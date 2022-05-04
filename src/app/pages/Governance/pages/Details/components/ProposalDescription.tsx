import { FC } from "react";
import { Grid, styled, Typography } from "@mui/material";
import { useSelector } from "react-redux";
import { useTranslation } from "react-i18next";

import { translations } from "locales/i18n";
import { CssVariables } from "styles/cssVariables/cssVariables";
import { GovernancePageSelectors } from "app/pages/Governance/selectors";
import { PrimaryCardWrapper } from "app/components/wrappers/PrimaryCard";

export const ProposalDescription: FC = () => {
  const { t } = useTranslation();

  const proposal = useSelector(GovernancePageSelectors.selectedProposal);

  return (
    <PrimaryCardWrapper>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Text variant="body1">
            {t(translations.GovernancePage.ProposalDescription())}
          </Text>
        </Grid>

        <Grid item xs={12}>
          <Text variant="body2">{proposal?.description}</Text>
        </Grid>
      </Grid>
    </PrimaryCardWrapper>
  );
};

const Text = styled(Typography)({
  color: CssVariables.white,
});
