import { FC } from "react";
import {
  styled,
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  TableSortLabel,
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { useTranslation } from "react-i18next";

import { CssVariables, FontFamilies } from "styles/cssVariables/cssVariables";
import {
  selectGauges,
  selectIsLoadingUserPoolsAndGauges,
  PoolsAndGaugesSelectors,
} from "app/containers/PoolsAndGauges/selectors";
import { tableHeader } from "./constants";
import { formatNumber } from "common/format";
import { getComparator, stableSort } from "./utils/sorting";
import { GovernancePageActions } from "app/pages/Governance/slice";
import { GovernancePageSelectors } from "app/pages/Governance/selectors";
import { useDeviceSize } from "hooks/mediaQuery";
import { mobile } from "styles/media";

export const AllocationTable: FC = () => {
  const { t } = useTranslation();
  const { isMobile } = useDeviceSize();
  const gauges = useSelector(selectGauges);
  const isLoading = useSelector(selectIsLoadingUserPoolsAndGauges);
  const poolsArray = useSelector(PoolsAndGaugesSelectors.poolsArray);
  const sortingData = useSelector(
    GovernancePageSelectors.allocationSortingData
  );

  const dispatch = useDispatch();

  const getAllocation = (address: string) => {
    const gaugeAllocation = gauges.find(
      (item) => item.address === address
    )?.allocPoint;
    return formatNumber(gaugeAllocation || 0, 2);
  };

  const getBoostedAxialAPR = (pool) => {
    const data = pool.last_rewards_apr[0][pool.last_rewards_apr[0].length - 1];
    return formatNumber(+data || 0, 2);
  };

  if (isLoading) {
    return <>Loading...</>;
  }

  const handleRequestSort = (property) => {
    const isAsc =
      sortingData.orderBy === property && sortingData.order === "asc";
    dispatch(
      GovernancePageActions.setSortingData({
        order: isAsc ? "desc" : "asc",
        orderBy: property,
      })
    );
  };

  const rows = poolsArray.map((pool) => {
    return {
      name: pool.symbol,
      allocation: getAllocation(pool.gauge_address),
      allocationPerDay: formatNumber(+pool.last_daily_axial_alloc, 2),
      axialAPR: formatNumber(+pool.last_apr, 2),
      boostedAxialAPR: getBoostedAxialAPR(pool),
      gaugeWeight: formatNumber(+pool.last_gauge_weight, 2),
      balance: formatNumber(+pool.last_gauge_axial_balance, 2),
    };
  });

  const Tbl = isMobile ? MobileElWrapper : StyledTable;
  const Tr = isMobile ? MobileTrWrapper : TableRow;
  const Th = isMobile ? MobileElWrapper : StyledTableHead;
  return (
    <Tbl aria-label="customized table">
      <Th>
        <Tr>
          {!isMobile
            ? tableHeader(t, isMobile).map((header) => {
                return (
                  <StyledTableCell
                    key={header.id}
                    sortDirection={
                      sortingData.orderBy === header.id
                        ? sortingData.order
                        : false
                    }
                  >
                    <TableSortLabel
                      active={true}
                      direction={
                        sortingData.orderBy === header.id
                          ? sortingData.order
                          : "asc"
                      }
                      onClick={() => handleRequestSort(header.id)}
                    >
                      {header.label}
                    </TableSortLabel>
                  </StyledTableCell>
                );
              })
            : tableHeader(t, isMobile).map((header) => {
                return <MobileElWrapper>{header.label}</MobileElWrapper>;
              })}
        </Tr>
      </Th>
      <TableBody>
        {stableSort(
          rows,
          getComparator(sortingData.order, sortingData.orderBy)
        ).map((pool) => {
          return (
            <StyledTableRow key={pool.name}>
              <StyledTableCell component="th" scope="row">
                {pool.name}
              </StyledTableCell>
              {!isMobile && (
                <>
                  <StyledTableCell>{pool.allocation}</StyledTableCell>
                  <StyledTableCell>{pool.allocationPerDay}</StyledTableCell>
                </>
              )}
              <StyledTableCell>{pool.axialAPR}</StyledTableCell>
              <StyledTableCell>{pool.gaugeWeight}</StyledTableCell>
              <StyledTableCell>{pool.balance}</StyledTableCell>
            </StyledTableRow>
          );
        })}
      </TableBody>
    </Tbl>
  );
};
const MobileElWrapper = styled("div")({
  color: "white",
});
const MobileTrWrapper = styled("div")({
  display: "flex",
  gap: "30px",
});
const StyledTable = styled(Table)({
  minWidth: 700,
  backgroundColor: "transparent",
  borderStyle: "hidden",
  borderRadius: "20px",
  boxShadow: `0 0 0 4px ${CssVariables.cardBorder}`,
  overflow: "auto",
});

const StyledTableHead = styled(TableHead)({
  backgroundColor: CssVariables.tableHeadColor,
  border: 0,
});

const StyledTableRow = styled(TableRow)({
  "td, tr, th": {
    border: 0,
    color: CssVariables.white,
    fontSize: "16px",
    fontFamily: FontFamilies.IBMPlexSans,
  },

  th: {
    fontWeight: "bold",
  },
});

const StyledTableCell = styled(TableCell)({
  borderBottom: `4px solid ${CssVariables.cardBorder}`,
  color: CssVariables.white,
  fontSize: "12px",
  fontFamily: FontFamilies.IBMPlexSans,
  "&:first-child": {
    borderRadius: "20px 0px 0px 0px",
    [mobile]: {
      paddingLeft: 0,
    },
  },

  "&:last-child": {
    borderRadius: "0px 20px 0px 0px",
  },

  ".MuiTableSortLabel-root": {
    color: `${CssVariables.white} !important`,
    ".MuiTableSortLabel-icon": {
      color: `${CssVariables.white} !important`,
    },
  },
  th: {
    maxWidth: "100px",
  },
});
