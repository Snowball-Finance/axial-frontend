import { styled } from "@mui/material";
import { GovernanceSelectors } from "app/containers/BlockChain/Governance/selectors";
import { useSelector } from "react-redux";
import { ProposalListItem } from "./listItem";

export const ProposalsList = () => {
  const proposals = useSelector(
    GovernanceSelectors.selectFilteredProposalsProposals
  );
  return (
    <Wrapper>
      {proposals.map((proposal) => (
        <ProposalListItem key={proposal.index} proposal={proposal} />
      ))}
    </Wrapper>
  );
};

const Wrapper = styled("div")({
  marginTop: "16px",
  position: "relative",
});
