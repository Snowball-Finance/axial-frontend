import { FC } from "react";
import { Grid, styled, Typography } from "@mui/material";
import { useTranslation } from "react-i18next";

import { translations } from "locales/i18n";
import { CssVariables } from "styles/cssVariables/cssVariables";

interface Props {
  description: string;
}

export const ProposalDescription: FC<Props> = ({ description }) => {
  const { t } = useTranslation();

  return (
    <StyledPoolCard>
      <Grid container spacing={2} direction="column">
        <Grid item>
          <Text variant="body1">
            {t(translations.GovernancePage.ProposalDescription())}
          </Text>
        </Grid>

        <Grid item>
          <Text variant="body2">{description}</Text>
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
