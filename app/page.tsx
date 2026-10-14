"use client";
import TodoListItem from "@/components/TodoListItem";
import { useState, useRef } from "react";

// let a = 1;

export default function Home() {
  const [todoList, setTodoList] = useState([]);
  const [selectedTodos, setSelectedTodos] = useState([]);
  const [filterType, setFilterType] = useState("all");
  const todoTextInputRef = useRef();

  console.log(filterType);
  

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
    setTodoList((prev) => prev.filter(x => !selectedTodos.includes(x.id)));
  };

  return (
    <div className="flex flex-col h-screen">
      <main className="flex flex-col flex-1 items-center gap-4 m-8">
        <h1 className="font-bold text-4xl">Todo App</h1>
        <form className="flex" onSubmit={addTodo}>
          <div>
            <label htmlFor="todo-text" className="sr-only">
              Enter Todo
            </label>
            <input
              ref={todoTextInputRef}
              type="text"
              id="todo-text"
              className="border border-r-0 p-2"
            />
          </div>
          <button type="submit" className="border p-2">
            Add Todo
          </button>
        </form>
        {selectedTodos.length > 0 && (
          <button
            type="button"
            className="border p-2"
            onClick={deleteAllSelected}
          >
            Delete All Todos
          </button>
        )}
        <ul className="flex flex-col gap-2 w-full">
          {todoList
          .filter(x => {
            switch (filterType) {
              case 'completed':
                return x.isDone;
              case 'pending':
                return !x.isDone;
              default:
                return true
            }
          })
          .map((list) => (
            <TodoListItem
              key={list.id}
              data={list}
              updateTodo={updateTodo}
              deleteTodo={deleteTodo}
            />
          ))}
        </ul>
      </main>
      <footer className="flex ">
        <button type="button" className="flex-1 border p-2" onClick={() => setFilterType("all")}>
          All
        </button>
        <button type="button" className="flex-1 border p-2" onClick={() => setFilterType("pending")}>
          Pending
        </button>
        <button type="button" className="flex-1 border p-2" onClick={() => setFilterType("completed")}>
          Completed
        </button>
      </footer>
    </div>
  );
}
