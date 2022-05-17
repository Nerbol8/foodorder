import * as React from "react";
import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { Link } from "react-router-dom";
import { Button } from "@mui/material";
import { adminContext } from "../context/AdminContext";

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));

export default function AdminTable(props) {
  const data = React.useContext(adminContext);
  const { deleteProduct } = data;
  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 700 }} aria-label="customized table">
        <TableHead>
          <TableRow>
            <StyledTableCell>№</StyledTableCell>
            <StyledTableCell align="right">Название</StyledTableCell>
            <StyledTableCell align="right">Описание</StyledTableCell>
            <StyledTableCell align="right">Цена</StyledTableCell>
            <StyledTableCell align="right">Фото</StyledTableCell>
            <StyledTableCell align="right">Размер</StyledTableCell>
            <StyledTableCell align="right">прожарка</StyledTableCell>
            <StyledTableCell align="right">#</StyledTableCell>
            <StyledTableCell align="right">#</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {props.products.map((item, index) => (
            <StyledTableRow key={item.id}>
              <StyledTableCell component="th" scope="row">
                {index + 1}
              </StyledTableCell>
              <StyledTableCell align="right">{item.name}</StyledTableCell>
              <StyledTableCell align="right">{item.desc}</StyledTableCell>
              <StyledTableCell align="right">{item.price}</StyledTableCell>
              <StyledTableCell align="right">
                <img width={100} src={item.image} alt="" />
              </StyledTableCell>
              <StyledTableCell align="right">{item.size}</StyledTableCell>
              <StyledTableCell align="right">{item.roasting}</StyledTableCell>
              <StyledTableCell align="right">
                <Link to={`/admin-panel-edit/${item.id}`}>EDIT</Link>
              </StyledTableCell>
              <StyledTableCell align="right">
                <Button onClick={() => deleteProduct(item.id)}>DEL</Button>
              </StyledTableCell>
            </StyledTableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
