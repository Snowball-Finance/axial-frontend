import { useDispatch, useSelector } from "react-redux";
import { Grid, styled } from "@mui/material";

import { OutlinedButton } from "app/components/common/buttons/outlinedButton";
import { GovernanceSelectors } from "app/containers/BlockChain/Governance/selectors";
import { GovernanceActions } from "app/containers/BlockChain/Governance/slice";
import { ContainedButton } from "app/components/common/buttons/containedButton";
import { GovernancePageSelectors } from "app/pages/Governance/selectors";
import { mobile } from "styles/media";
import { ProposalState } from "app/containers/BlockChain/Governance/types";

export const ExecutionContext = () => {
  const receipt = useSelector(GovernanceSelectors.receipt);
  const proposal = useSelector(GovernancePageSelectors.selectedProposal);
  const supportingOption = receipt?.support;
  const isActive = proposal?.proposal_state === ProposalState.Active;

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

  const disabled = !isActive;

  return (
    <Grid container spacing={2} direction="column">
      {proposal.execution_contexts.map((context, index) => {
        return (
          <Grid item key={index}>
            {supportingOption === index ? (
              <StyledContainedButton
                disabled={disabled}
                fullWidth
                onClick={() => handleVoteClick(index)}
              >
                {context.label}
              </StyledContainedButton>
            ) : (
              <StyledOutlinedButton
                disabled={disabled}
                fullWidth
                onClick={() => handleVoteClick(index)}
              >
                {context.label}
              </StyledOutlinedButton>
            )}
          </Grid>
        );
      })}
    </Grid>
  );
};

const StyledContainedButton = styled(ContainedButton)({
  [mobile]: {
    width: "100%",
  },
});

const StyledOutlinedButton = styled(OutlinedButton)({
  [mobile]: {
    width: "100%",
  },
});
