import { FC } from "react";
import { Grid } from "@mui/material";
import { OutlinedButton } from "app/components/common/buttons/outlinedButton";
// import { useTranslation } from "react-i18next";

// import { translations } from "locales/i18n";

export const FitActions: FC = () => {
  //   const { t } = useTranslation();

  return (
    <Grid container spacing={2}>
      <Grid item>
        <OutlinedButton>Fit proportionally</OutlinedButton>
      </Grid>

      <Grid item>
        <OutlinedButton>Fit equally</OutlinedButton>
      </Grid>
    </Grid>
  );
};
