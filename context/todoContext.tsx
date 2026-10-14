"use client";
import { createContext, useRef, useState } from "react";

export const TodoContext = createContext();

export const TodoProvider = ({ children }) => {
  const [todoList, setTodoList] = useState([]);
  const [selectedTodos, setSelectedTodos] = useState([]);
  const [filterType, setFilterType] = useState("all");
  const todoTextInputRef = useRef();

  const addTodo = (e) => {
    e.preventDefault();
    const todoText = todoTextInputRef.current;
    if (todoText) {
      const todoValue = todoText.value;
      setTodoList((prev) => [
        ...prev,
        {
          id: new Date().valueOf(),
          text: todoValue,
          isDone: false,
        },
      ]);
      todoText.value = "";
    }
  };

  const updateTodo = (todo) => {
    const index = todoList.findIndex((x) => x.id === todo.id);

    setTodoList((prev) => {
      return [
        ...prev.slice(0, index),
        { ...todo, isDone: !todo.isDone },
        ...prev.slice(index + 1),
      ];
    });

    setSelectedTodos((prev) => {
      const selectedIndex = prev.findIndex((x) => x === todo.id);
      if (selectedIndex === -1 && !todo.isDone) {
        return [...prev, todo.id];
      } else {
        return [
          ...prev.slice(0, selectedIndex),
          ...prev.slice(selectedIndex + 1),
        ];
      }
    });
  };

  const deleteTodo = (todo) => {
    const index = todoList.findIndex((x) => x.id === todo.id);

    setTodoList((prev) => {
      return [...prev.slice(0, index), ...prev.slice(index + 1)];
    });
  };

  const deleteAllSelected = () => {
    setTodoList((prev) => prev.filter((x) => !selectedTodos.includes(x.id)));
  };

  const changeFilterType = (type) => {
    setFilterType(type)
  }

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
        todoTextInputRef
      }}
    >
      {children}
    </TodoContext.Provider>
  );
};
