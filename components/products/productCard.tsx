import { Product } from "@/app/products/page";
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Image from "next/image";
import { Button } from "../ui/button";
import { ShoppingCart } from "lucide-react";
import Rating from "./productRating";
import { Badge } from "../ui/badge";

const price = new Intl.NumberFormat("en-IN", {
  style: "currency",
  currency: "INR",
});

const shimmer = (w: number, h: number) => `
<svg width="${w}" height="${h}" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
  <defs>
    <linearGradient id="g">
      <stop stop-color="#f4f4f5" offset="20%" />
      <stop stop-color="#e4e4e7" offset="50%" />
      <stop stop-color="#f4f4f5" offset="70%" />
    </linearGradient>
  </defs>
  <rect width="${w}" height="${h}" fill="#f4f4f5" />
  <rect id="r" width="${w}" height="${h}" fill="url(#g)" />
  <animate xlink:href="#r" attributeName="x" from="-${w}" to="${w}" dur="1s" repeatCount="indefinite"  />
</svg>`;

const shimmerDataUrl: `data:image/${string}` = `data:image/svg+xml;base64,${Buffer.from(
  shimmer(300, 300),
).toString("base64")}`;

export default function ProductCard({ product }: { product: Product }) {
  return (
    <Card className="group h-full pt-0 transition-shadow hover:shadow-lg hover:ring-foreground/20">
      <div className="relative aspect-square overflow-hidden bg-white">
        <Image
          src={product.image}
          alt={`${product.title} thumbnail Image`}
          fill
          placeholder={shimmerDataUrl}
          className="object-contain p-8 transition-transform duration-300 group-hover:scale-105"
        />
        <Badge variant="secondary" className="absolute left-3 top-3 capitalize">{product.category}</Badge>
      </div>
      <CardHeader className="flex-1 gap-2">
        <CardTitle className="line-clamp-2 min-h-10" title={product.title}>
          {product.title}
        </CardTitle>
        <Rating rate={product.rating.rate} count={product.rating.count} />
        <CardDescription className="line-clamp-2">
          {product.description}
        </CardDescription>
      </CardHeader>
      
      <CardFooter className="justify-between gap-3">
        <span className="text-lg font-semibold">
          {price.format(product.price)}
        </span>
        <Button>
          <ShoppingCart data-icon="inline-start" />
          Add To Cart
        </Button>
      </CardFooter>
    </Card>
  );
}
