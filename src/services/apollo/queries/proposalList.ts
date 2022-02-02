import { gql } from "@apollo/client";

export const PROPOSAL_QUERY = `
{
  ProposalList{
    proposalCount
    quorumVotes
    proposals{
      index
      origin
      offset
      title
      duration
      startDate
      endDate
      state
      forVotes
      againstVotes
      proposer
      metadata
      {
        description
        discussion
        document
      }
      details
    }
  }
}
`;

const PROPOSAL_LIST = gql`
  query ${PROPOSAL_QUERY}
`;

export { PROPOSAL_LIST };
