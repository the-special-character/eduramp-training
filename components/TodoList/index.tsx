import { TodoContext } from "@/context/todoContext";
import { useContext } from "react";
import TodoListItem from "../TodoListItem";

export default function TodoList() {
  const { todoList, updateTodo, deleteTodo } = useContext(TodoContext);

  return (
    <ul className="flex flex-col gap-2 w-full">
      {todoList
        .map((list) => (
          <TodoListItem
            key={list.id}
            data={list}
            updateTodo={updateTodo}
            deleteTodo={deleteTodo}
          />
        ))}
    </ul>
  );
}
