"use client";
import { addTodoAction } from "@/app/actions";
import { useActionState } from "react";

const initialState = { success: false, error: null, values: { todoText: "" } };

export default function TodoForm() {
  const [state, formAction, isPending] = useActionState(
    addTodoAction,
    initialState,
  );
  
  return (
    <div>
      <form action={formAction} className="flex">
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
            autoComplete="off"
          />
        </div>
        <button
          type="submit"
          className="border p-2 cursor-not-allowed"
          style={{
            cursor: isPending ? "not-allowed" : "none",
          }}
          disabled={isPending}
        >
          {isPending ? "Adding..." : "Add Todo"}
        </button>
      </form>
      {state?.error && <p className="text-red-500" role="alert">{state.error}</p>}
    </div>
  );
}
