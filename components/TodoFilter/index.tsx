export default function TodoFilter() {
  return (
    <footer className="flex ">
      <button
        type="button"
        className="flex-1 border p-2"
      >
        All
      </button>
      <button
        type="button"
        className="flex-1 border p-2"
      >
        Pending
      </button>
      <button
        type="button"
        className="flex-1 border p-2"
      >
        Completed
      </button>
    </footer>
  );
}
