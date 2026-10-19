import { Star } from "lucide-react";

export default function Rating({
  rate,
  count,
}: {
  rate: number;
  count: number;
}) {
  const filled = Math.round(rate);

  return (
    <div className="flex items-center gap-2">
      <div className="flex">
        {Array.from({ length: 5 }, (_, i) => {
          return (
            <Star
              key={i}
              className={
                i < filled
                  ? "size-3.5 fill-amber-400 text-amber-400"
                  : "size-3.5 text-muted-foreground/40"
              }
            />
          );
        })}
      </div>
      <span className="text-xs text-muted-foreground">
        {rate.toFixed(1)} ({count})
      </span>
    </div>
  );
}
