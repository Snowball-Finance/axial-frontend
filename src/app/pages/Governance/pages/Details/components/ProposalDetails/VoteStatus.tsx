import { FC } from "react";
import { Grid, styled, Typography } from "@mui/material";
import { useTranslation } from "react-i18next";

import { translations } from "locales/i18n";
import { CssVariables } from "styles/cssVariables/cssVariables";
import { useSelector } from "react-redux";
import { GovernancePageSelectors } from "app/pages/Governance/selectors";
import { commify } from "app/containers/utils/contractUtils";
import { Proposal } from "app/containers/BlockChain/Governance/types";

interface Props {
  proposal?: Proposal;
}

export const VoteOptionsStatus: FC<Props> = ({ proposal }) => {
  const { t } = useTranslation();
  let selectedProposal = useSelector(GovernancePageSelectors.selectedProposal);
  if (proposal) selectedProposal = proposal;
  const options: { title: string; votes: string }[] = [];
  if (selectedProposal?.votes && selectedProposal.votes.length === 2) {
    options.push({
      title: t(translations.GovernancePage.For()),
      votes: commify(selectedProposal.votes[1]),
    });
    options.push({
      title: t(translations.GovernancePage.Against()),
      votes: commify(selectedProposal.votes[0]),
    });
  } else if (selectedProposal?.votes && selectedProposal.votes.length > 2) {
    let execContexts = selectedProposal.execution_contexts;
    execContexts.forEach((item) => {
      options.push({
        title: item.label,
        votes: commify(item.value),
      });
    });
  } else {
    return <></>;
  }
  return (
    <Grid container>
      <Grid item>
        <TextUnderline variant="body1">
          {t(translations.GovernancePage.VoteStatus())}
        </TextUnderline>
      </Grid>

      {options.map((item, index) => {
        return (
          <Grid
            key={index}
            item
            container
            justifyContent="space-between"
            alignItems="center"
          >
            <Grid item>
              <Text variant="body1">{item.title}</Text>
            </Grid>
            <Grid item>
              <Text variant="body2">{item.votes}</Text>
            </Grid>
          </Grid>
        );
      })}
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
