import { FC } from "react";
import { useSelector } from "react-redux";
import { Grid } from "@mui/material";

import { GovernanceSelectors } from "app/containers/BlockChain/Governance/selectors";
import { ProposalListItem } from "./ProposalListItem";

export const ProposalsList: FC = () => {
  const proposals = useSelector(GovernanceSelectors.filteredProposals);

  return (
    <Grid container spacing={2} direction="column">
      {proposals.map((proposal) => (
        <Grid item key={proposal.governance_id}>
          <ProposalListItem proposal={proposal} />
        </Grid>
      ))}
    </Grid>
  );
};
