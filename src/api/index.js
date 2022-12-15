import axios from "axios";

const url = "http://localhost:5000/todos";

export const fetchTodos = async () => {
  try {
    const response = await axios.get(url);
    return response;
  } catch (error) {
    return error;
  }
};

export const addTodo = async (newTodo) => {
  try {
    const response = await axios.post(url, newTodo);
    return response;
  } catch (error) {
    return error;
  }
};

export const editTodo = async (id, editedTodo) => {
  try {
    const response = await axios.patch(`${url}/${id}`, editedTodo);
    return response;
  } catch (error) {
    return error;
  }
};

export const deleteTodo = async (id) => {
  try {
    const response = await axios.delete(`${url}/${id}`);
    return response;
  } catch (error) {
    return error;
  }
};
