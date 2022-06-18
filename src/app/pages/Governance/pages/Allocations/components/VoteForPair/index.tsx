import { FC } from "react";
import { Grid, styled, Typography } from "@mui/material";
import { useTranslation } from "react-i18next";

import { translations } from "locales/i18n";
import { PrimaryCardWrapper } from "app/components/wrappers/PrimaryCard";
import { CssVariables } from "styles/cssVariables/cssVariables";
import { VoteButton } from "./VoteButton";

export const VoteForPair: FC = () => {
  const { t } = useTranslation();

  return (
    <StyledPrimaryCardWrapper>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <HeaderText variant="h2">
            {t(
              translations.GovernancePage.VoteAllocation.Voteforyourpreferredpair()
            )}
          </HeaderText>
        </Grid>

        <Grid item xs={12}>
          <Text variant="body2">
            {t(translations.GovernancePage.VoteAllocation.TopDescs())}
          </Text>
        </Grid>

        <Grid item xs={12}>
          <VoteButton />
        </Grid>
      </Grid>
    </StyledPrimaryCardWrapper>
  );
};

const HeaderText = styled(Typography)({
  color: CssVariables.white,
  textTransform: "uppercase",
});

const Text = styled(Typography)({
  color: CssVariables.white,
});

const StyledPrimaryCardWrapper = styled(PrimaryCardWrapper)({
  maxWidth: `calc(100vw - 10px)`,
})