import { styled, useMediaQuery } from "@mui/material";
import { ColDef } from "ag-grid-community";
import { AgGridReact } from "ag-grid-react";
import { GaugeItem } from "app/containers/PoolsAndGauges/types";
import { GovernancePageSelectors } from "app/pages/Governance/selectors";
import { translations } from "locales/i18n";
import { useMemo } from "react";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import { CssVariables } from "styles/cssVariables/cssVariables";
import { theme } from "styles/theme";
import { FitButtons } from "./fitbuttons";
import { topTableRowsConfig } from "./gridRowsConfig";

interface GridConfigTypes {
  columnDefs: ColDef[];
  rowData: GaugeItem[];
}

export const SelectedPairsTable = () => {
  const { t } = useTranslation();
  const selectedPairs = useSelector(
    GovernancePageSelectors.selectedVoteAllocationGaugesArray
  );
  const smallScreen = useMediaQuery(theme.breakpoints.down("sm"));
  const noSelectedPair = selectedPairs.length === 0;
  const rowConfigs = useMemo(
    () => topTableRowsConfig({ t, isSmall: smallScreen }),
    [smallScreen]
  );

  const gridConfig: GridConfigTypes = {
    columnDefs: [...rowConfigs],
    rowData: selectedPairs,
  };

  return (
    <>
      {noSelectedPair ? (
        <></>
      ) : (
        <Wrapper>
          <GridWrapper className="ag-theme-balham">
            <AgGridReact
              animateRows
              headerHeight={52}
              rowHeight={60}
              columnDefs={gridConfig.columnDefs}
              rowData={gridConfig.rowData}
              defaultColDef={{
                suppressMenu: true,
                sortable: false,
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
          </GridWrapper>
          <FitButtons />
          <PercentageMessage>
            {t(translations.GovernancePage.VoteAllocation.IfPercentage())}
          </PercentageMessage>
        </Wrapper>
      )}
    </>
  );
};

const PercentageMessage = styled("p")({
  fontSize: "12px",
  color: CssVariables.dark,
});

const Wrapper = styled("div")({});

const GridWrapper = styled("div")({
  height: "250px",
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
});
