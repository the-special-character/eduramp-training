import { TodoContext } from "@/context/todoContext";
import { useContext } from "react";

export default function TodoForm() {
  const { addTodo, todoTextInputRef } = useContext(TodoContext);

  return (
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
  );
}
