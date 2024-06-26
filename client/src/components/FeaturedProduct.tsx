import Card from "@/components/Card";
import Link from "next/link";
import { Products } from "@/db/models/products";

const fetchProducts = async () => {
  const response = await fetch(
    process.env.NEXT_PUBLIC_BASE_URL + "/api/products",
    {
      cache: "no-store",
    }
  );
  const responseJson: Products[] = await response.json();

  return responseJson;
};

const FeaturedProduct = async () => {
  const products = await fetchProducts();
  return (
    <section className="py-8 md:py-20">
      {" "}
      <div className="container mx-auto">
        <h2 className="text-3xl font-semibold mb-4 text-gray-800">
          Featured Product
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-5 gap-4 justify-center m-4">
          {" "}
          {products.splice(0, 5).map((product, index) => (
            <Card product={product} key={index} />
          ))}
        </div>
        <div className="flex justify-center">
          <Link href={"/products"}>
            <button className="m-4 border hover:bg-gray-50 text-black font-light py-2 px-4 rounded-full">
              See All
            </button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default FeaturedProduct;
