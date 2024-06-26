"use client";
import { Products } from "@/db/models/products";
import Link from "next/link";
import { FunctionComponent } from "react";
import { AddWishlist } from "@/components/AddWishlist";
interface AllProducts {
  product: Products[];
}
const ListProducts: FunctionComponent<AllProducts> = ({ product }) => {
  const formatRupiah = (number: number) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
    }).format(number);
  };
  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-4 justify-center m-8">
        {product?.map((prod) => (
          <div
            key={prod.slug}
            className="mb-8 relative flex flex-col text-gray-700 hover:bg-red-100 bg-gray-200 bg-clip-border rounded-xl w-80"
          >
            <div className="relative mx-4 mt-4 overflow-hidden text-gray-700 bg-white bg-clip-border rounded-xl h-80">
              <img
                src={prod.images[0]}
                alt="card-image"
                className="object-cover w-full h-full"
              />
            </div>
            <div className="p-2 flex-grow">
              <div className="flex items-center justify-between mb-2">
                <p className="block font-sans text-base antialiased font-medium leading-relaxed text-blue-gray-900">
                  {prod.name}
                </p>
              </div>
              <p className="block font-sans text-sm antialiased font-normal leading-normal text-gray-700 opacity-75">
                {prod.excerpt}
              </p>
              <p className="block font-sans text-base antialiased font-medium leading-relaxed text-blue-gray-900">
                {formatRupiah(+prod.price)}
              </p>
            </div>
            <div className="flex  justify-between items-center ">
              <Link
                href={`/products/${prod.slug}`}
                className="bg-green-500 hover:bg-green-600  flex-grow mt-4 text-white font-bold py-2 px-4 "
              >
                Detail
              </Link>
              <AddWishlist productId={prod._id} />
            </div>
          </div>
        ))}
      </div>
    </>
  );
};
export default ListProducts;
