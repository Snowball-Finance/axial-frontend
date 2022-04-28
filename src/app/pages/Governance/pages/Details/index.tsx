import { FC } from "react";
import { Grid, styled } from "@mui/material";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";

import { Max1040 } from "app/components/wrappers/max1040";
import { VotingPowerInfo } from "../../components/VotingPowerInfo";
import { DocLinksAndInfo } from "./components/DocLinksAndInfo";
import { ProposalDescription } from "./components/ProposalDescription";
import { ProposalDetails } from "./components/ProposalDetails";
import { VoteOptions } from "./components/VoteOptions";
import { GovernanceSelectors } from "app/containers/BlockChain/Governance/selectors";
import {
  Proposal,
  // ProposalState,
} from "app/containers/BlockChain/Governance/types";

type TParams = { proposalIndex: string };

export const Details: FC = () => {
  const { proposalIndex } = useParams<TParams>();
  const proposals = useSelector(GovernanceSelectors.proposals);

  const proposal: Proposal | undefined = proposals.find(
    (item) => item.governance_id === proposalIndex
  );
  // let isForAgainstType = true;

  if (proposals.length === 0) {
    return <>Loading</>;
  }

  if (proposal === undefined) {
    return <>proposal not found</>;
  }

  // if (proposal?.execution_contexts.length > 1) {
  //   isForAgainstType = false;
  // }

  // const { proposal_state } = proposal;
  // const isActive = proposal_state === ProposalState.Active;

  return (
    <StyledMax1040>
      <Grid container direction="column" spacing={4}>
        <Grid item>
          <ProposalDetails proposal={proposal} />
        </Grid>

        <Grid item>
          <VotingPowerInfo />
        </Grid>

        <Grid item>
          <VoteOptions />
        </Grid>

        <Grid item>
          <DocLinksAndInfo
            discordLink={proposal?.discussion || ""}
            documentLink={proposal?.document || ""}
            startTime={proposal?.start_date || ""}
            endTime={proposal?.end_date || ""}
          />
        </Grid>

        <Grid item>
          <ProposalDescription description={""} />
        </Grid>
      </Grid>
    </StyledMax1040>
  );
};

const StyledMax1040 = styled(Max1040)(() => ({
  margin: "0 auto",
}));
