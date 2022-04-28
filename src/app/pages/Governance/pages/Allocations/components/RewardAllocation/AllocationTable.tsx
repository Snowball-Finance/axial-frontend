import { FC } from "react";
import {
  styled,
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
} from "@mui/material";
import { CssVariables, FontFamilies } from "styles/cssVariables/cssVariables";

function createData(
  name: string,
  allocation: string,
  allocationPerDay: string,
  axialAPR: string,
  boostedAxialAPR: string,
  voteWeight: string,
  balance: string
) {
  return {
    name,
    allocation,
    allocationPerDay,
    axialAPR,
    boostedAxialAPR,
    voteWeight,
    balance,
  };
}

const rows = [
  createData(
    "AM3D",
    "6.0%",
    "40",
    "36.0%",
    "36.0%",
    "36.0%",
    "6,632 AM3D ($6,632.4)"
  ),
  createData(
    "AC4D",
    "6.0%",
    "40",
    "36.0%",
    "36.0%",
    "36.0%",
    "6,632 AM3D ($6,632.4)"
  ),
  createData(
    "AS4D",
    "6.0%",
    "40",
    "36.0%",
    "36.0%",
    "36.0%",
    "6,632 AM3D ($6,632.4)"
  ),
  createData(
    "AA3D",
    "6.0%",
    "40",
    "36.0%",
    "36.0%",
    "36.0%",
    "6,632 AM3D ($6,632.4)"
  ),
];

export const AllocationTable: FC = () => {
  return (
    <StyledTable sx={{ minWidth: 700 }} aria-label="customized table">
      <StyledTableHead>
        <TableRow>
          <StyledTableCell>Name</StyledTableCell>
          <StyledTableCell align="right">Allocation</StyledTableCell>
          <StyledTableCell align="right">Allocation per day</StyledTableCell>
          <StyledTableCell align="right">Axial APR</StyledTableCell>
          <StyledTableCell align="right">Boosted Axial APR</StyledTableCell>
          <StyledTableCell align="right">Vote Weight</StyledTableCell>
          <StyledTableCell align="right">Balance</StyledTableCell>
        </TableRow>
      </StyledTableHead>
      <TableBody>
        {rows.map((row) => (
          <StyledTableRow key={row.name}>
            <StyledTableCell component="th" scope="row">
              {row.name}
            </StyledTableCell>
            <StyledTableCell align="right">{row.allocation}</StyledTableCell>
            <StyledTableCell align="right">
              {row.allocationPerDay}
            </StyledTableCell>
            <StyledTableCell align="right">{row.axialAPR}</StyledTableCell>
            <StyledTableCell align="right">
              {row.boostedAxialAPR}
            </StyledTableCell>
            <StyledTableCell align="right">{row.voteWeight}</StyledTableCell>
            <StyledTableCell component="th" align="right">
              {row.balance}
            </StyledTableCell>
          </StyledTableRow>
        ))}
      </TableBody>
    </StyledTable>
  );
};

const StyledTable = styled(Table)({
  backgroundColor: "transparent",
  borderStyle: "hidden",
  borderRadius: "20px",
  boxShadow: `0 0 0 4px ${CssVariables.cardBorder}`,
});

const StyledTableHead = styled(TableHead)({
  backgroundColor: "#0F0E3B",
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
