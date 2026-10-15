import { deleteTodoAction, updateTodoAction } from "@/app/actions";
import { SquareCheck, Square } from 'lucide-react';

export default function TodoListItem({ data }) {
  const deleteTodoActionWithId = deleteTodoAction.bind(null, data.id)
  const updateTodoActionWithData = updateTodoAction.bind(null, data);
  return (
    <li>
      <div className="flex items-center gap-4">
        <form action={updateTodoActionWithData}>
          <label htmlFor="is-complete" className="sr-only">
            Complete Todo
          </label>
          <button type="submit">
              {data.isDone ? <SquareCheck /> : <Square />}
          </button>
        </form>
        <p
          className="flex-1"
          style={{
            textDecoration: data.isDone ? "line-through" : "none",
          }}
        >
          {data.text}
        </p>
        <form action={deleteTodoActionWithId}>
          <button type="submit" className="border p-1">
            Delete Todo
          </button>
        </form>
      </div>
    </li>
  );
}
