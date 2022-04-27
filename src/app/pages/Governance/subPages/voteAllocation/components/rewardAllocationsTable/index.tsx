import { styled, useMediaQuery } from "@mui/material";
import { ColDef } from "ag-grid-community";
import { AgGridReact } from "ag-grid-react";
import {
  selectGauges,
  selectPoolsAndGaugesLastInfo,
} from "app/containers/PoolsAndGauges/selectors";
import { GaugeItem } from "app/containers/PoolsAndGauges/types";
import { multiply } from "precise-math";
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
  const lastInfo = useSelector(selectPoolsAndGaugesLastInfo);
  const rowConfigs = useMemo(
    () =>
      bottomTableRowsConfig({
        t,
        isSmall: smallScreen,
        totalSnob: multiply(
          // @ts-ignore ignored, because snobPerBlock is specific to this project and is not defined in lastInfo model
          lastInfo?.snobPerBlock ?? 0,
          lastInfo?.blocksPast24hrs ?? 0
        ),
      }),
    //@ts-ignore ignored for the same reason as above
    [smallScreen, lastInfo?.snobPerBlock]
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
