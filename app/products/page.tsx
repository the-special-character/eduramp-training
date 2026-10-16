import axios from "axios";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardAction,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { notFound } from "next/navigation";
import Image from "next/image";

const shimmer = (w: number, h: number) => `
<svg width="${w}" height="${h}" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
  <defs>
    <linearGradient id="g">
      <stop stop-color="#222" offset="20%" />
      <stop stop-color="#111" offset="50%" />
      <stop stop-color="#222" offset="70%" />
    </linearGradient>
  </defs>
  <rect width="${w}" height="${h}" fill="#222" />
  <rect id="r" width="${w}" height="${h}" fill="url(#g)" />
  <animate xlink:href="#r" attributeName="x" from="-${w}" to="${w}" dur="1s" repeatCount="indefinite"  />
</svg>`;

const toBase64 = (str: string) =>
  typeof window === "undefined"
    ? Buffer.from(str).toString("base64")
    : window.btoa(str);

export default async function Products() {
  const { data } = await axios.get("https://fakestoreapi.com/products");

  if (!data) notFound();

  return (
    <>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2">
        {data.map((item) => {
          return (
            <Card
              key={item.id}
              className="relative mx-auto w-full max-w-sm pt-0 grid grid-rows-subgrid row-span-3"
            >
              {/* <div className="absolute inset-0 z-30 aspect-square w-full"> */}
                <Image
                  src={item.image}
                  alt={`${item.title} image`}
                  className="relative z-20 aspect-video w-full object-cover brightness-60 grayscale dark:brightness-40"
                  height={300}
                  width={300}
                  quality={0.75}
                  placeholder={`data:image/svg+xml;base64,${toBase64(shimmer(300, 300))}`}
                />
              {/* </div> */}
              <CardHeader>
                {/* <CardAction>
                    <Badge variant="secondary">{item.category}</Badge>
                  </CardAction> */}
                <CardTitle>{item.title}</CardTitle>
                <CardDescription className="line-clamp-3">
                  {item.description}
                </CardDescription>
              </CardHeader>
              <CardFooter>
                <Button className="w-full">Add To Cart</Button>
              </CardFooter>
            </Card>
          );
        })}
      </div>
    </>
  );
}
