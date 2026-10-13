export default function TodoListItem({ data, updateTodo }) {
  return (
    <li>
      <div className="flex items-center gap-4">
        <div>
          <label htmlFor="is-complete" className="sr-only">
            Complete Todo
          </label>
          <input
            type="checkbox"
            id="is-complete"
            checked={data.isDone}
            onChange={() => updateTodo(data)}
          />
        </div>
        <p
          className="flex-1"
          style={{
            textDecoration: data.isDone ? "line-through" : "none",
          }}
        >
          {data.text}
        </p>
        <button type="button" className="border p-1">
          Delete Todo
        </button>
      </div>
    </li>
  );
}
