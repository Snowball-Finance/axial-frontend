
export enum GovernancePathQueries {
  proposalIndex = "proposalIndex",
}

export const   GovernancePageAddress = "/governance"


export const GovernanceSubPages = {
  proposals: `${GovernancePageAddress}/proposals`,
  proposal: `${GovernancePageAddress}/proposals/:${GovernancePathQueries.proposalIndex}`,
};
