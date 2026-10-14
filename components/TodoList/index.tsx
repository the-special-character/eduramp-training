import { TodoContext } from "@/context/todoContext";
import { useContext } from "react";
import TodoListItem from "../TodoListItem";

export default function TodoList() {
  const { todoList, updateTodo, deleteTodo, filterType } = useContext(TodoContext);

  return (
    <ul className="flex flex-col gap-2 w-full">
      {todoList
        .filter((x) => {
          switch (filterType) {
            case "completed":
              return x.isDone;
            case "pending":
              return !x.isDone;
            default:
              return true;
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
  );
}
