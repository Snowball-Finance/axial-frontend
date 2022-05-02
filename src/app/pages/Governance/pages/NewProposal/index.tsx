import { FC } from "react";
import { styled, Grid } from "@mui/material";
import { useTranslation } from "react-i18next";

import { translations } from "locales/i18n";
import { Max1040 } from "app/components/wrappers/max1040";
import { VotingPowerInfo } from "../../components/VotingPowerInfo";
import { DocsLinkAndPeriod } from "./components/DocsLinkAndPeriod";
import { ProposalInfo } from "./components/ProposalInfo";
import { DetailNavigationHead } from "../../components/Navigation/DetailsNavigationHead";

export const NewProposal: FC = () => {
  const { t } = useTranslation();

  return (
    <StyledMax1040>
      <Grid container spacing={4} direction="column">
        <Grid item>
          <DetailNavigationHead
            routeName={t(translations.GovernancePage.NewProposal())}
          />
        </Grid>

        <Grid item>
          <VotingPowerInfo />
        </Grid>

        <Grid item>
          <DocsLinkAndPeriod />
        </Grid>

        <Grid item>
          <ProposalInfo />
        </Grid>
      </Grid>
    </StyledMax1040>
  );
};

const StyledMax1040 = styled(Max1040)(() => ({
  margin: "0 auto",
}));
