import { styled } from "@mui/material"
import { useSelector } from "react-redux"
import { ProposalListItem } from "./listItem"
import React from "react"
import { selectFilteredProposalsProposals } from "../../../../../containers/BlockChain/Governance/selectors"

export const ProposalsList = () => {
  const proposals = useSelector(selectFilteredProposalsProposals)
  return (
    <Wrapper>
      {proposals.map((proposal) => (
        <ProposalListItem key={proposal.index} proposal={proposal} />
      ))}
    </Wrapper>
  )
}

const Wrapper = styled("div")({
  marginTop: "16px",
  position: "relative",
})
