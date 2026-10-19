import { cacheLife } from "next/cache";
import { notFound } from "next/navigation";

export const instant = false;

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

async function getProduct(id: number): Promise<Product[]> {
  "use cache";
  cacheLife("hours");

  const res = await fetch(`https://fakestoreapi.com/products/${id}`);
  if (!res.ok) throw new Error("Failed to load Products");
  return res.json();
}

export default async function ProductDetails({
  params,
}: {
  params: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const { productId } = await params;

  if (!productId) throw new Error("Something went wrong");

  const product = await getProduct(Number(productId));

  if (!product) notFound();

  return <div>Product details</div>;
}
