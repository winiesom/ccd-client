import React, { useState, useEffect } from "react";

import {
  Table,
  TableBody,
  TableCell,
  tableCellClasses,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Typography,
  Grid,
  CircularProgress,
} from "@mui/material";
import { blue, red } from "@mui/material/colors";
import { Edit, Delete } from "@mui/icons-material";
import { styled } from "@mui/material/styles";
import moment from "moment";

import { fetchTodos, deleteTodo } from "../../api/index";

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.white,
    color: theme.palette.common.secondary,
    fontWeight: 600,
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

const Todos = (props) => {
  const [todos, setTodos] = useState([]);
  const [currentId, setCurrentId] = useState(null);
  useEffect(() => {
    fetchTodos().then((data) => {
      setTodos(data);
    });
  }, []);

  const handleEdit = (id) => {
    setCurrentId(id);
  };

  const handleDelete = (id) => {
    deleteTodo(id);
    window.location.reload();
  };

  props.id(currentId);

  const rows = todos.data;

  return (
    <>
      {!rows ? (
        <Grid container spacing={2}>
          <Grid
            item
            xs={12}
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}>
            <CircularProgress />
          </Grid>
        </Grid>
      ) : rows < 1 ? (
        <Paper>
          <Typography
            variant="h6"
            color="secondary"
            sx={{ padding: 2, textAlign: "center" }}>
            No Todo Found
          </Typography>
        </Paper>
      ) : (
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 700 }} aria-label="customized table">
            <TableHead>
              <TableRow>
                <StyledTableCell>Title</StyledTableCell>
                <StyledTableCell align="left">Description</StyledTableCell>
                <StyledTableCell align="left">Completed</StyledTableCell>
                <StyledTableCell align="left">Created</StyledTableCell>
                <StyledTableCell align="left"> </StyledTableCell>
              </TableRow>
            </TableHead>

            <TableBody>
              {rows.map((row) => (
                <StyledTableRow key={row._id}>
                  <StyledTableCell component="th" scope="row">
                    {row.title}
                  </StyledTableCell>
                  <StyledTableCell align="left">
                    {row.description}
                  </StyledTableCell>
                  <StyledTableCell align="left">
                    {row.isCompleted === true ? "Yes" : "No"}
                  </StyledTableCell>
                  <StyledTableCell align="left">
                    {moment(row.createdAt).format("LLL")}
                  </StyledTableCell>
                  <StyledTableCell align="left">
                    <Edit
                      sx={{ fontSize: 20, color: blue[700], cursor: "pointer" }}
                      onClick={() => handleEdit(row._id)}
                    />
                  </StyledTableCell>
                  <StyledTableCell align="left">
                    <Delete
                      sx={{ fontSize: 20, color: red[500], cursor: "pointer" }}
                      onClick={() => handleDelete(row._id)}
                    />
                  </StyledTableCell>
                </StyledTableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}
    </>
  );
};

export default Todos;
