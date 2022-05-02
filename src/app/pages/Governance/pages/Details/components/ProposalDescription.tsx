import { FC } from "react";
import { Grid, styled, Typography } from "@mui/material";
import { useSelector } from "react-redux";
import { useTranslation } from "react-i18next";

import { translations } from "locales/i18n";
import { CssVariables } from "styles/cssVariables/cssVariables";
import { GovernancePageSelectors } from "app/pages/Governance/selectors";

export const ProposalDescription: FC = () => {
  const { t } = useTranslation();

  const proposal = useSelector(GovernancePageSelectors.selectedProposal);

  return (
    <StyledPoolCard>
      <Grid container spacing={2} direction="column">
        <Grid item>
          <Text variant="body1">
            {t(translations.GovernancePage.ProposalDescription())}
          </Text>
        </Grid>

        <Grid item>
          <Text variant="body2">{proposal?.description}</Text>
        </Grid>
      </Grid>
    </StyledPoolCard>
  );
};

const StyledPoolCard = styled("div")({
  backgroundColor: CssVariables.poolCardBackground,
  border: `4px solid ${CssVariables.cardBorder}`,
  borderRadius: "20px",
  padding: "20px",
});

const Text = styled(Typography)({
  color: CssVariables.white,
});
