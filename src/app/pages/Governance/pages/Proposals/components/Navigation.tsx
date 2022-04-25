import { FC } from "react";
import { styled, Grid, Typography } from "@mui/material";
// import { useTranslation } from "react-i18next";

// import { translations } from "locales/i18n";
import { CssVariables } from "styles/cssVariables/cssVariables";

export const Navigation: FC = () => {
  //   const { t } = useTranslation();

  return (
    <Grid container spacing={2} alignItems="center">
      <Grid item>
        <ActiveText variant="h2">Proposals</ActiveText>
      </Grid>

      <Grid item>
        <Text variant="h2">Allocations</Text>
      </Grid>
    </Grid>
  );
};

const Text = styled(Typography)({
  color: CssVariables.white,
  textTransform: "uppercase",
});

const ActiveText = styled(Typography)({
  color: CssVariables.green,
  textTransform: "uppercase",
  textDecoration: "underline",
  cursor: "pointer",
});
