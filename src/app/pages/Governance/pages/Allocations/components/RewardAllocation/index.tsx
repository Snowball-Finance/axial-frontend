import { FC } from "react";
import { Grid, styled, Typography } from "@mui/material";
import { useTranslation } from "react-i18next";

import { translations } from "locales/i18n";
import { PrimaryCardWrapper } from "app/components/wrappers/PrimaryCard";
import { CssVariables } from "styles/cssVariables/cssVariables";
import { AllocationTable } from "./AllocationTable";
import { env } from "environment";

export const RewardAllocation: FC = () => {
  const { t } = useTranslation();

  return (
    <StyledPrimaryCardWrapper>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <HeaderText variant="h2">
            {t(
              translations.GovernancePage.VoteAllocation.TOKEN_RewardAllocations(),
              { token: env.MAIN_TOKEN_NAME }
            )}
          </HeaderText>
        </Grid>

        <Grid item xs={12}>
          <Text variant="body2">
            {t(translations.GovernancePage.VoteAllocation.BottomDescs())}
          </Text>
        </Grid>

        <Grid item xs={12}>
          <AllocationTable />
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
});
