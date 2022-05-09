import { FC } from "react";
import {
  styled,
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
} from "@mui/material";
import { useSelector } from "react-redux";
import { useTranslation } from "react-i18next";

import { CssVariables, FontFamilies } from "styles/cssVariables/cssVariables";
import {
  selectGauges,
  selectIsLoadingUserPoolsAndGauges,
  PoolsAndGaugesSelectors,
} from "app/containers/PoolsAndGauges/selectors";
import { tableHeader } from "./constants";
import { formatNumber } from "common/format";

export const AllocationTable: FC = () => {
  const { t } = useTranslation();

  const gauges = useSelector(selectGauges);
  const isLoading = useSelector(selectIsLoadingUserPoolsAndGauges);
  const poolsArray = useSelector(PoolsAndGaugesSelectors.poolsArray);

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

  return (
    <StyledTable aria-label="customized table">
      <StyledTableHead>
        <TableRow>
          {tableHeader(t).map((header) => {
            return (
              <StyledTableCell key={header.id}>{header.label}</StyledTableCell>
            );
          })}
        </TableRow>
      </StyledTableHead>
      <TableBody>
        {poolsArray.map((pool) => (
          <StyledTableRow key={pool.id}>
            <StyledTableCell component="th" scope="row">
              {pool.symbol}
            </StyledTableCell>
            <StyledTableCell>
              {getAllocation(pool.gauge_address)}
            </StyledTableCell>
            <StyledTableCell>
              {formatNumber(+pool.last_daily_axial_alloc, 2)}
            </StyledTableCell>
            <StyledTableCell>{formatNumber(+pool.last_apr, 2)}</StyledTableCell>
            <StyledTableCell>{getBoostedAxialAPR(pool)}</StyledTableCell>
            <StyledTableCell>
              {formatNumber(+pool.last_gauge_weight, 2)}
            </StyledTableCell>
            <StyledTableCell>
              {formatNumber(+pool.last_gauge_axial_balance, 2)}
            </StyledTableCell>
          </StyledTableRow>
        ))}
      </TableBody>
    </StyledTable>
  );
};

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
  },

  "&:last-child": {
    borderRadius: "0px 20px 0px 0px",
  },
});
