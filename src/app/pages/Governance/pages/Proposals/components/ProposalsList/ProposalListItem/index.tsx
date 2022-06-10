import { FC } from "react";
import { Grid, styled, Typography } from "@mui/material";
import { useTranslation } from "react-i18next";

import { translations } from "locales/i18n";
import { CssVariables } from "styles/cssVariables/cssVariables";
import { PrimaryCardWrapper } from "app/components/wrappers/PrimaryCard";
import { Info } from "./Info";
import { DetailsButton } from "./DetailsButton";
import { Proposal } from "app/containers/BlockChain/Governance/types";
import { mobile } from "styles/media";

interface ProposalListItemProps {
  proposal: Proposal;
}

export const ProposalListItem: FC<ProposalListItemProps> = ({ proposal }) => {
  const { t } = useTranslation();

  return (
    <PrimaryCardWrapper>
      <Grid container direction="column" spacing={1}>
        <Grid item>
          <Text variant="body1">
            {t(translations.GovernancePage.ProposalNumber(), {
              number: proposal.governance_id,
            })}
          </Text>
        </Grid>

        <Grid item>
          <Title variant="h2">{proposal.title}</Title>
        </Grid>

        <Grid item>
          <StyledChildContainer container>
            <StyledSubChildContainer item>
              <Info proposal={proposal} />
            </StyledSubChildContainer>
            <StyledSubChildContainer item>
              <DetailsButton proposal={proposal} />
            </StyledSubChildContainer>
          </StyledChildContainer>
        </Grid>
      </Grid>
    </PrimaryCardWrapper>
  );
};

const StyledChildContainer = styled(Grid)(() => ({
  justifyContent: "space-between",
  alignItems: "flex-end",

  [mobile]: {
    flexDirection: "column",
    rowGap: 10,
  },
}));

const StyledSubChildContainer = styled(Grid)(() => ({
  [mobile]: {
    width: "100%",
  },
}));

const Title = styled(Typography)({
  color: CssVariables.white,
  textTransform: "uppercase",
});

const Text = styled(Typography)({
  color: CssVariables.white,
});
