import { FC } from "react";
import { Grid, styled, Typography } from "@mui/material";
import { useTranslation } from "react-i18next";

import { translations } from "locales/i18n";
import { CssVariables } from "styles/cssVariables/cssVariables";
import { Proposal } from "app/containers/BlockChain/Governance/types";

interface Props {
  proposal: Proposal;
}

export const VoteStatus: FC<Props> = ({ proposal }) => {
  const { t } = useTranslation();

  return (
    <Grid container>
      <Grid item>
        <TextUnderline variant="body1">
          {t(translations.GovernancePage.VoteStatus())}
        </TextUnderline>
      </Grid>

      <Grid item container justifyContent="space-between" alignItems="center">
        <Grid item>
          <Text variant="body1">Option 1</Text>
        </Grid>

        <Grid item>
          <Text variant="body2">1.853.280</Text>
        </Grid>
      </Grid>

      <Grid item container justifyContent="space-between" alignItems="center">
        <Grid item>
          <Text variant="body1">Option 2</Text>
        </Grid>

        <Grid item>
          <Text variant="body2">853.280</Text>
        </Grid>
      </Grid>

      <Grid item container justifyContent="space-between" alignItems="center">
        <Grid item>
          <Text variant="body1">Option 3</Text>
        </Grid>

        <Grid item>
          <Text variant="body2">3.280</Text>
        </Grid>
      </Grid>
    </Grid>
  );
};

const Text = styled(Typography)({
  color: CssVariables.white,
});

const TextUnderline = styled(Typography)({
  color: CssVariables.white,
  textDecoration: "underline",
});
