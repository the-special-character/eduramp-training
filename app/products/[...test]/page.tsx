import ProductCard from "@/components/products/productCard";
import { cacheLife } from "next/cache";
import Link from "next/link";

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

  const res = await fetch(`http://localhost:8000/products/${id}`);
  
  if (!res.ok) throw new Error("Failed to load Products");
  return res.json();
}

async function getProducts(category): Promise<Product[]> {
  "use cache";
  cacheLife("hours");

  const res = await fetch(`http://localhost:8000/products?category=${category}`);
  if (!res.ok) throw new Error("Failed to load Products");
  return res.json();
}

export default async function ProductDetails({
  params,
}: {
  params: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const {test} = await params;


  console.log("test", test);

  if(test.length > 1) {
    const products = await getProducts(test.at(-1));
    return (
    <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
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

  } else {
    const product = await getProduct(Number(test.at(-1)));
    return <div>Product details</div>;
  }

  
}
