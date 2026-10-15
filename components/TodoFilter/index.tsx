import Link from "next/link";

export default function TodoFilter() {
  return (
    <footer className="flex ">
      <Link href="/" className="flex-1 border p-2">All</Link>
      <Link href="?filters=pending" className="flex-1 border p-2">Pending</Link>
      <Link href="?filters=completed" className="flex-1 border p-2">Completed</Link>
    </footer>
  );
}
