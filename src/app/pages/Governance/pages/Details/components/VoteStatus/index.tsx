import { FC, useEffect } from "react";
import { Grid } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";

import { Web3Selectors } from "app/containers/BlockChain/Web3/selectors";
import { GovernanceActions } from "app/containers/BlockChain/Governance/slice";
import { GovernanceSelectors } from "app/containers/BlockChain/Governance/selectors";
import { VotedInfo } from "./VotedInfo";
import { ChangeYourVote } from "./ChangeYourVote";

type TParams = { proposalIndex: string };

export const VoteStatus: FC = () => {
  const { proposalIndex } = useParams<TParams>();
  const dispatch = useDispatch();

  const proposal = useSelector(GovernanceSelectors.proposalById(proposalIndex));
  const library = useSelector(Web3Selectors.selectLibrary);

  useEffect(() => {
    if (library && proposal) {
      dispatch(GovernanceActions.getVotingReceipt({ proposal }));
    }
    return () => {};
  }, [library, proposal]);

  if (!proposal) {
    return <></>;
  }

  return (
    <Grid container direction="column" spacing={2}>
      <Grid item>
        <VotedInfo proposal={proposal} />
      </Grid>

      <Grid item>
        <ChangeYourVote proposal={proposal} />
      </Grid>
    </Grid>
  );
};
