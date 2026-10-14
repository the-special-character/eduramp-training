import { TodoContext } from "@/context/todoContext";
import { useContext } from "react";

export default function TodoFilter() {
  const { changeFilterType } = useContext(TodoContext);
  
  return (
    <footer className="flex ">
      <button
        type="button"
        className="flex-1 border p-2"
        onClick={() => changeFilterType("all")}
      >
        All
      </button>
      <button
        type="button"
        className="flex-1 border p-2"
        onClick={() => changeFilterType("pending")}
      >
        Pending
      </button>
      <button
        type="button"
        className="flex-1 border p-2"
        onClick={() => changeFilterType("completed")}
      >
        Completed
      </button>
    </footer>
  );
}
