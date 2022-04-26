import { styled } from "@mui/material";
import { GovernanceSelectors } from "app/containers/BlockChain/Governance/selectors";
import { useSelector } from "react-redux";
import { ProposalListItem } from "./listItem";

export const ProposalsList = () => {
  const proposals = useSelector(
    GovernanceSelectors.filteredProposals
  );
  return (
    <Wrapper>
      {proposals.map((proposal) => (
        <ProposalListItem key={proposal.governance_id} proposal={proposal} />
      ))}
    </Wrapper>
  );
};

const Wrapper = styled("div")({
  marginTop: "16px",
  position: "relative",
});
