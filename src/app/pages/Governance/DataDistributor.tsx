import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { GovernanceSelectors } from "app/containers/BlockChain/Governance/selectors";
import { Web3Selectors } from "app/containers/BlockChain/Web3/selectors";
import { Proposal } from "app/containers/BlockChain/Governance/types";
import { GovernanceActions } from "app/containers/BlockChain/Governance/slice";
import { GovernancePageActions } from "./slice";

type TParams = { proposalIndex: string };

export const DataDistributor = () => {
  const dispatch = useDispatch();
  const { proposalIndex } = useParams<TParams>();

  const library = useSelector(Web3Selectors.selectLibrary);
  const proposals = useSelector(GovernanceSelectors.proposals);

  const proposal: Proposal | undefined = proposals.find(
    (item) => item.governance_id === proposalIndex
  );

  useEffect(() => {
    if (library && proposal && proposalIndex) {
      dispatch(GovernanceActions.getVotingReceipt({ proposal }));
      dispatch(GovernancePageActions.setSelectedProposal(proposal));
    }
    return () => {};
  }, [library, proposal, proposalIndex]);

  return <></>;
};
