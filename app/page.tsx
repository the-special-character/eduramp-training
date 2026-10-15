import TodoFilter from "@/components/TodoFilter";
import TodoForm from "@/components/TodoForm";
import TodoList from "@/components/TodoList";


export default async function Home({ searchParams }) {
  const filters = (await searchParams).filters
  return (
    <div className="flex flex-col h-screen">
      <main className="flex flex-col flex-1 items-center gap-4 m-8">
        <h1 className="font-bold text-4xl">Todo App</h1>
        <TodoForm />
        <TodoList filters={filters} />
      </main>
      <TodoFilter />
    </div>
  );
}
