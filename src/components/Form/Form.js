import React, { useState, useEffect } from "react";
import {
  TextField,
  Checkbox,
  FormControlLabel,
  Button,
  Typography,
  Paper,
} from "@mui/material";

import { addTodo, editTodo, fetchTodos } from "../../api/index";

const Form = (props) => {
  const [todoData, setTodoData] = useState({
    title: "",
    description: "",
    isCompleted: false,
  });
  const [todos, setTodos] = useState([]);
  const [currentTodo, setCurrentTodo] = useState(null);

  useEffect(() => {
    fetchTodos().then((res) => {
      setTodos(res.data);
    });
  }, []);

  useEffect(() => {
    setCurrentTodo(props.id ? todos.find((t) => t._id === props.id) : null);
  }, [props.id, todos]);

  useEffect(() => {
    if (currentTodo) setTodoData(currentTodo);
  }, [currentTodo]);

  const [error, setError] = useState(false);

  const refreshPage = () => {
    fetchTodos();
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(todoData);
    if (todoData.title !== "" && todoData.description !== "") {
      setError(false);
      if (props.id) {
        editTodo(props.id, todoData);
      } else {
        addTodo(todoData);
        refreshPage();
      }
      clear();
      window.location.reload();
    } else {
      setError(true);
      return false;
    }
  };

  const clear = () => {
    setCurrentTodo(null);
    setTodoData({
      title: "",
      description: "",
      isCompleted: false,
    });
  };

  return (
    <Paper sx={{ padding: 2 }}>
      <form
        sx={{
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "center",
        }}
        autoComplete="off"
        noValidate
        onSubmit={handleSubmit}>
        <Typography sx={{ marginBottom: 2 }} variant="h6">
          {currentTodo ? "Edit " : "Add "} Todo
        </Typography>
        <TextField
          name="title"
          variant="outlined"
          label="Title"
          fullWidth
          value={todoData.title}
          onChange={(e) => setTodoData({ ...todoData, title: e.target.value })}
          sx={{ marginBottom: 2 }}
          error={error}
          helperText={error && "Title is required"}
        />

        <TextField
          name="description"
          variant="outlined"
          label="Description"
          fullWidth
          value={todoData.description}
          onChange={(e) =>
            setTodoData({ ...todoData, description: e.target.value })
          }
          sx={{ marginBottom: 2 }}
          error={error}
          helperText={error && "Description is required"}
        />

        <FormControlLabel
          control={
            <Checkbox
              name="isCompleted"
              checked={todoData.isCompleted}
              value={todoData.isCompleted}
              onChange={(e) =>
                setTodoData({ ...todoData, isCompleted: e.target.checked })
              }
            />
          }
          label="Completed?"
          sx={{ marginBottom: 2 }}
        />

        <Button
          sx={{ marginBottom: 2 }}
          variant="contained"
          color="primary"
          size="small"
          type="submit"
          fullWidth>
          Submit
        </Button>
        <Button
          variant="contained"
          color="secondary"
          size="small"
          onClick={clear}
          fullWidth>
          Clear
        </Button>
      </form>
    </Paper>
  );
};

export default Form;
