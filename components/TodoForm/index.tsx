
import { addTodoAction } from "@/app/actions";

export default function TodoForm() {
  return (
    <form action={addTodoAction} className="flex">
      <div>
        <label htmlFor="todo-text" className="sr-only">
          Enter Todo
        </label>
        <input
          type="text"
          placeholder="Enter your todo here"
          id="todo-text"
          name="todoText"
          className="border border-r-0 p-2"
          required
          maxLength={200}
          autoComplete="off"
        />
      </div>
      <button type="submit" className="border p-2">
        Add Todo
      </button>
    </form>
  );
}
