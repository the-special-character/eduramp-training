import axios from "axios";
import { notFound } from "next/navigation";
import TodoListItem from "../TodoListItem";

export default async function TodoList({ filters }) {
  let url = "http://localhost:8000/todoList";
  if (filters === "pending") url += `?isDone=false`;
  if (filters === "completed") url += `?isDone=true`;
  const { data } = await axios.get(url);

  if (!data) throw new Error("Data not found")

  return (
    <ul className="flex flex-col gap-2 w-full">
      {data.map((x) => (
        <TodoListItem key={x.id} data={x} />
      ))}
    </ul>
  );
}
