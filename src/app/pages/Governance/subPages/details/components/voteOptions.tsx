import { GovernanceSelectors } from "app/containers/BlockChain/Governance/selectors";
import { GovernanceActions } from "app/containers/BlockChain/Governance/slice";
import { GovernanceSubPages } from "app/pages/Governance/routes";
import { useDispatch, useSelector } from "react-redux";

export const VoteOptions = () => {
  const idx = window.location.pathname.split(
    GovernanceSubPages.proposals + "/"
  )[1];
  const proposal = useSelector(GovernanceSelectors.proposalById(idx));
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
  return (
    <>
      {proposal ? (
        <div>
          {proposal.execution_contexts.map((context, index) => {
            return (
              <div
                key={index}
                style={{ cursor: "pointer", color: "white" }}
                onClick={() => handleVoteClick(index)}
              >
                <div>{context.label}</div>
                <div>{context.target}</div>
              </div>
            );
          })}
        </div>
      ) : (
        <></>
      )}
    </>
  );
};
