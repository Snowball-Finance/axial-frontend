import { Proposal } from "app/containers/BlockChain/Governance/types";
import { formatNumber } from "common/format";

export const forAndAgainst = ({ proposal }: { proposal: Proposal }) => {
  const { forVotes, againstVotes } = proposal;
  const sumOfVotes = forVotes + againstVotes;
  const forPercent = (forVotes / sumOfVotes) * 100;
  const againstPercent = (againstVotes / sumOfVotes) * 100;

  return {
    forVotes: {
      percent: forPercent,
      votes: forVotes,
      formattedVotes: formatNumber(forVotes, 2),
    },
    againstVotes: {
      percent: againstPercent,
      votes: againstVotes,
      formattedVotes: formatNumber(againstVotes, 2),
    },
  };
};
