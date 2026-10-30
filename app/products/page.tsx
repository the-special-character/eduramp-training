import axios from "axios";
import { notFound } from "next/navigation";
import ProductCard from "@/components/products/productCard";
import { cacheLife } from "next/cache";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { requireSession } from "@/lib/session";

export const instant = false

export type Product = {
  id: number;
  title: string;
  price: number;
  description: string;
  category: string;
  image: string;
  rating: {
    rate: number;
    count: number;
  };
};

async function getProducts(category: string): Promise<Product[]> {
  "use cache";
  cacheLife("hours");

  let url = "http://localhost:8000/products";
  if(category) url += `?category=${category}`

  console.log("url", url);
  

  const res = await fetch(url);
  if (!res.ok) throw new Error("Failed to load Products");
  return res.json();
}

export default async function Products({ searchParams }) {
  const { user, session } = await requireSession();
  console.log(JSON.stringify(user));
  

  const category = (await searchParams).category
  const products = await getProducts(category);
  const categories = [...new Set(products.map((x) => x.category))];

  return (
    <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {categories.map((category) => (
        <Button variant="outline" className="capitalize" asChild>
          <Link href={`products?category=${category}`}>{category}</Link>
        </Button>
      ))}

      {products.map((item: Product) => {
        return (
          <li key={item.id}>
            <Link href={`products/${item.id}`} prefetch={true}>
              <ProductCard product={item} />
            </Link>
          </li>
        );
      })}
    </ul>
  );
}
