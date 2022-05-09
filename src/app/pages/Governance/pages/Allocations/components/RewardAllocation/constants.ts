import { translations } from "locales/i18n";

export const tableHeader = (t) => [
  {
    id: "name",
    label: t(translations.GovernancePage.VoteAllocation.AllocationTable.Name()),
  },
  {
    id: "allocation",
    label: t(
      translations.GovernancePage.VoteAllocation.AllocationTable.Allocation()
    ),
  },
  {
    id: "allocationPerDay",
    label: t(
      translations.GovernancePage.VoteAllocation.AllocationTable.AllocationPerDay()
    ),
  },
  {
    id: "axialAPR",
    label: t(
      translations.GovernancePage.VoteAllocation.AllocationTable.AxialAPR()
    ),
  },
  {
    id: "boostedAxialAPR",
    label: t(
      translations.GovernancePage.VoteAllocation.AllocationTable.BoostedAxialAPR()
    ),
  },
  {
    id: "gaugeWeight",
    label: t(
      translations.GovernancePage.VoteAllocation.AllocationTable.GaugeWeight()
    ),
  },
  {
    id: "Balance",
    label: t(
      translations.GovernancePage.VoteAllocation.AllocationTable.Balance()
    ),
  },
];
