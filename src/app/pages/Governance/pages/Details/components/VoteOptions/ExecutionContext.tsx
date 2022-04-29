import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { Grid } from "@mui/material";

import { OutlinedButton } from "app/components/common/buttons/outlinedButton";
import { GovernanceSelectors } from "app/containers/BlockChain/Governance/selectors";
import { GovernanceActions } from "app/containers/BlockChain/Governance/slice";

type TParams = { proposalIndex: string };

export const ExecutionContext = () => {
  const { proposalIndex } = useParams<TParams>();

  const proposal = useSelector(GovernanceSelectors.proposalById(proposalIndex));
  const dispatch = useDispatch();

  const handleVoteClick = (index: number) => {
    if (proposal) {
      dispatch(
        GovernanceActions.vote({
          proposal,
          voteFor: index,
        })
      );
    }
  };

  if (!proposal) {
    return <></>;
  }

  return (
    <Grid container spacing={2} direction="column">
      {proposal.execution_contexts.map((context, index) => {
        return (
          <Grid item key={index}>
            <OutlinedButton fullWidth onClick={() => handleVoteClick(index)}>
              {context.label}
            </OutlinedButton>
          </Grid>
        );
      })}
    </Grid>
  );
};
