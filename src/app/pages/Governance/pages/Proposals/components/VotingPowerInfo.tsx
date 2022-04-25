import { FC } from "react";
import { Grid, styled, Typography } from "@mui/material";
import { useTranslation } from "react-i18next";

import { translations } from "locales/i18n";
import { CssVariables } from "styles/cssVariables/cssVariables";
import { env } from "environment";

export const VotingPowerInfo: FC = () => {
  const { t } = useTranslation();

  return (
    <StyledPoolCard>
      <Grid container spacing={2}>
        <Grid item>
          <Logo src={env.GOVERNANCE_TOKEN_LOGO_ADDRESS} alt="logo" />
        </Grid>

        <Grid item>
          <Title variant="h2">
            {t(translations.GovernancePage.VotingPower())}
          </Title>

          <Text variant="body2">2000 sAxial</Text>
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

const Logo = styled("img")({
  width: "48px",
  height: "48px",
});

const Title = styled(Typography)({
  color: CssVariables.white,
  textTransform: "uppercase",
});

const Text = styled(Typography)({
  color: CssVariables.white,
});
