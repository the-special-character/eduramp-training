import axios from "axios";
import { notFound } from "next/navigation";
import ProductCard from "@/components/products/productCard";
import { cacheLife } from "next/cache";

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


async function getProducts(): Promise<Product[]> {
  "use cache"
  cacheLife("hours")

  const res = await fetch("https://fakestoreapi.com/products");;
  if(!res.ok) throw new Error("Failed to load Products")
  return res.json();
}

export default async function Products() {
  const products = await getProducts()

  return (
    <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {products.map((item: Product) => {
        return (
          <li key={item.id}>
            <ProductCard product={item}  />
          </li>
        );
      })}
    </ul>
  );
}
