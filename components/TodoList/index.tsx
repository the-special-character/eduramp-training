import axios from "axios";
import { notFound } from "next/navigation";
import TodoListItem from "../TodoListItem";

export default async function TodoList() {
  const { data } = await axios.get("http://localhost:8000/todoList");

  if (!data) notFound();

  return (
    <ul className="flex flex-col gap-2 w-full">
      {data.map((x) => (
        <TodoListItem key={x.id} data={x} />
      ))}
    </ul>
  );
}
