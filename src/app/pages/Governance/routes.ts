import { AppPages } from "app/types";

export enum GovernancePathQueries {
  proposalIndex = "proposalIndex",
}

export const GovernanceSubPages = {
  newProposal: `${AppPages.GovernancePage}/newProposal`,
  proposals: `${AppPages.GovernancePage}/proposals`,
  proposal: `${AppPages.GovernancePage}/proposals/:${GovernancePathQueries.proposalIndex}`,
  allocations: `${AppPages.GovernancePage}/allocations`,
};
