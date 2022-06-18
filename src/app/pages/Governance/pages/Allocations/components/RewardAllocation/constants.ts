import { translations } from "locales/i18n";

export const tableHeader = (t, isMobile) => [
  {
    id: "name",
    label: t(translations.GovernancePage.VoteAllocation.AllocationTable.Name()),
  },
  ...(!isMobile
    ? [
        {
          id: "allocation",
          label: t(
            translations.GovernancePage.VoteAllocation.AllocationTable.Allocation()
          ),
          numeric: true,
        },
        {
          id: "allocationPerDay",
          label: t(
            translations.GovernancePage.VoteAllocation.AllocationTable.AllocationPerDay()
          ),
          numeric: true,
        },
      ]
    : []),

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
    numeric: true,
  },
  {
    id: "balance",
    label: t(
      translations.GovernancePage.VoteAllocation.AllocationTable.Balance()
    ),
    numeric: true,
  },
];
