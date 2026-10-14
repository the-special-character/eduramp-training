"use client";
import axios from "axios";
import { createContext, useEffect, useRef, useState } from "react";

export const TodoContext = createContext();

export const TodoProvider = ({ children }) => {
  const [todoList, setTodoList] = useState([]);
  const [selectedTodos, setSelectedTodos] = useState([]);
  const [filterType, setFilterType] = useState("all");
  const todoTextInputRef = useRef();

  const loadTodo = async (ft = "all") => {
    try {
      let url = "http://localhost:8000/todoList";
      if (ft !== "all") {
        url = `${url}?isDone=${ft === "completed"}`;
      }

      const response = await axios.get(url);
      setTodoList(response.data);
    } catch (error) {}
  };

  const addTodo = async (e) => {
    try {
      e.preventDefault();
      const todoText = todoTextInputRef.current;
      if (todoText) {
        const todoValue = todoText.value;
        const response = await axios.post("http://localhost:8000/todoList", {
          text: todoValue,
          isDone: false,
        });
        setTodoList((prev) => [...prev, response.data]);
        todoText.value = "";
      }
    } catch (error) {}
  };

  const updateTodo = async (todo) => {
    try {
      const index = todoList.findIndex((x) => x.id === todo.id);

      const response = await axios.put(
        `http://localhost:8000/todoList/${todo.id}`,
        todo,
      );

      setTodoList((prev) => {
        return [
          ...prev.slice(0, index),
          response.data,
          ...prev.slice(index + 1),
        ];
      });

      setSelectedTodos((prev) => {
        const selectedIndex = prev.findIndex((x) => x === todo.id);
        if (selectedIndex === -1 && todo.isDone) {
          return [...prev, todo.id];
        } else {
          return [
            ...prev.slice(0, selectedIndex),
            ...prev.slice(selectedIndex + 1),
          ];
        }
      });
    } catch (error) {}
  };

  const deleteTodo = async (todo) => {
    try {
      const index = todoList.findIndex((x) => x.id === todo.id);

      await axios.delete(`http://localhost:8000/todoList/${todo.id}`, todo);

      setTodoList((prev) => {
        return [...prev.slice(0, index), ...prev.slice(index + 1)];
      });
    } catch (error) {}
  };

  const deleteAllSelected = () => {
    setTodoList((prev) => prev.filter((x) => !selectedTodos.includes(x.id)));
  };

  const changeFilterType = (type) => {
    loadTodo(type);
    setFilterType(type);
  };

  useEffect(() => {
    loadTodo();
  }, []);

  return (
    <TodoContext.Provider
      value={{
        todoList,
        filterType,
        addTodo,
        updateTodo,
        deleteTodo,
        deleteAllSelected,
        changeFilterType,
        todoTextInputRef,
      }}
    >
      {children}
    </TodoContext.Provider>
  );
};
