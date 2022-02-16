import { AppPages } from "app/types";

export enum GovernancePathQueries {
  proposalIndex = "proposalIndex",
}

export const GovernanceSubPages = {
  proposals: `${AppPages.GovernancePage}/proposals`,
  proposal: `${AppPages.GovernancePage}/proposals/:${GovernancePathQueries.proposalIndex}`,
};
