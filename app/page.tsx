import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"

export default async function Home() {
  return (
    <div className="flex flex-col h-screen">
      <main className="flex flex-col flex-1 items-center gap-4 m-8">
        <Input />
        <Button variant="default">Button</Button>
      </main>
    </div>
  );
}
