import { ColDef } from "ag-grid-community";
import { GaugeItem } from "app/containers/PoolsAndGauges/types";
import { formatNumber, formatPercent } from "common/format";
import { env } from "environment";
import { translations } from "locales/i18n";
import { AllocationInput } from "./allocationInput";
import { RemoveButton } from "./removeButton";

interface ColumnDef extends ColDef {
  field?: keyof GaugeItem;
}

export const topTableRowsConfig = ({
  t,
  isSmall,
}: {
  t: any;
  isSmall: boolean;
}): ColumnDef[] => [
  {
    headerName: t(translations.GovernancePage.VoteAllocation.Pairs()),
    field: "depositTokenName",
    flex: 3,
    minWidth: 100,
  },
  {
    headerName: t(translations.GovernancePage.VoteAllocation.YourAllocation()),
    field: "enteredAllocation",
    flex: 2,
    minWidth: 100,
    cellRendererFramework: AllocationInput,
  },
  {
    headerName: t(translations.GovernancePage.VoteAllocation.TOKEN_APR(), {
      token: env.MAIN_TOKEN_NAME,
    }),
    flex: 3,
    minWidth: 100,
    valueFormatter: ({ data }: { data: GaugeItem }): string => {
      const pickleAPYMin = data.fullApy * 100 * 0.4;
      const pickleAPYMax = data.fullApy * 100;
      return `${formatNumber(pickleAPYMin, 2)} ~ ${formatNumber(
        pickleAPYMax,
        2
      )}`;
    },
  },
  {
    headerName: t(translations.GovernancePage.VoteAllocation.WeightVariation()),
    flex: 2,
    minWidth: 100,
    valueFormatter: ({ data }: { data: GaugeItem }): string => {
      return `${formatPercent(data.allocPoint)}% -> ${"?????"}%`;
    },
  },
  {
    headerName: "",
    flex: 1,
    minWidth: 100,
    cellRendererFramework: RemoveButton,
  },
];
