"use client";
import { Products } from "@/db/models/products";
import Link from "next/link";
import { AddWishlist } from "./AddWishlist";

type CardProps = {
  product: Products;
};

const Card = ({ product }: CardProps) => {
  const formatRupiah = (number: number) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
    }).format(number);
  };

  return (
    <div
      key={product._id.toString()}
      className="m-1 relative bg-gray-200 hover:bg-red-100 flex flex-col border-solid border-2 shadow-md"
    >
      <div className="relative overflow-hidden bg-white bg-clip-border">
        <img
          src={product.images[0]}
          alt="card-image"
          className="object-cover w-full h-80 sm:h-60"
        />
      </div>
      <div className="p-2 flex-grow">
        <div className="mb-2">
          <p className="font-sans text-base font-bold leading-relaxed text-black break-words">
            {product.name}
          </p>
        </div>
        <p className="mb-2 font-sans text-sm font-normal text-gray-700 opacity-75 break-words">
          {product.excerpt}
        </p>
        <p className="font-sans text-sm font-normal text-gray-700 opacity-75 break-words">
          {formatRupiah(+product.price)}
        </p>
      </div>
      <div className="flex justify-between items-center ">
        <Link
          href={`/products/${product.slug}`}
          className="bg-green-500 hover:bg-green-600  flex-grow mt-4 text-white font-bold py-2 px-4"
        >
          Detail
        </Link>
        <AddWishlist productId={product._id} />
      </div>
    </div>
  );
};

export default Card;
