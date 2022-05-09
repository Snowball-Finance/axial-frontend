import { styled, useMediaQuery } from "@mui/material";
import { ColDef } from "ag-grid-community";
import { AgGridReact } from "ag-grid-react";
import { selectGauges } from "app/containers/PoolsAndGauges/selectors";
import { GaugeItem } from "app/containers/PoolsAndGauges/types";
import { useMemo } from "react";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import { CssVariables } from "styles/cssVariables/cssVariables";
import { theme } from "styles/theme";
import { bottomTableRowsConfig } from "./gridRowsConfig";

interface GridConfigTypes {
  columnDefs: ColDef[];
  rowData: GaugeItem[];
}

export const RewardsAllocationsTable = () => {
  const { t } = useTranslation();
  const smallScreen = useMediaQuery(theme.breakpoints.down("sm"));
  const rowConfigs = useMemo(
    () =>
      bottomTableRowsConfig({
        t,
      }),
    //@ts-ignore ignored for the same reason as above
    [smallScreen]
  );
  const gauges = useSelector(selectGauges);
  const gridConfig: GridConfigTypes = {
    columnDefs: [...rowConfigs],
    rowData: gauges,
  };

  return (
    <Wrapper className="ag-theme-balham">
      <AgGridReact
        animateRows
        headerHeight={52}
        rowHeight={60}
        columnDefs={gridConfig.columnDefs}
        rowData={gridConfig.rowData}
        defaultColDef={{
          suppressMenu: true,
          sortable: true,
          cellStyle: {
            "font-size": "12px",
            height: "100%",
            display: "flex ",
            "align-items": "center ",
          },
        }}
        immutableData
        getRowNodeId={(data: GaugeItem) => data.address}
      />
    </Wrapper>
  );
};

const Wrapper = styled("div")({
  height: "500px",
  border: "none",
  ".ag-header": {
    borderRadius: "8px",
    border: `1px solid ${CssVariables.lightGrey}`,
  },
  ".ag-header-row": {
    fontWeight: "400 !important",
  },
  ".ag-row": {
    borderRadius: "8px",
  },
  ".ag-center-cols-viewport": {
    overflowX: "hidden",
  },
  ".blue": {
    color: CssVariables.ctaBlue + ` !important`,
  },
  ".darkBold": {
    fontWeight: "bold",
    color: CssVariables.dark,
  },
});
