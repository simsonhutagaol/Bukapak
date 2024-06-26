"use client";
import { UserWithWishlist } from "@/db/models/user";
import { useEffect, useState } from "react";
import CardWishlist from "./CardWishlist";

export default function FetchListWishlist() {
  const [wishlist, setWishlist] = useState<UserWithWishlist>();

  const fetchProducts = async () => {
    const response = await fetch(
      process.env.NEXT_PUBLIC_BASE_URL + "/api/wishlist",
      {
        cache: "no-store",
      }
    );
    const responseJson: UserWithWishlist = await response.json();

    const data = responseJson as UserWithWishlist;

    setWishlist(data);
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <>
      <div className="grid grid-rows-1 ">
        <div className="col-1 m-8">
          <div className="mx-8 ">
            <h6 className="text-black text-xl font-light tracking-widest  capitalize">
              {wishlist?.name} Wishlist:{" "}
            </h6>
          </div>
          <br />
          {wishlist?.wishlists && wishlist?.wishlists.length > 0 ? (
            <>
              <div className="mt-12 mb-12">
                <div className="grid grid-cols-1 md:grid-cols-5 gap-4 justify-center ">
                  {wishlist.wishlists.map((el, index) => (
                    <CardWishlist
                      key={index}
                      product={el}
                      fetchProducts={fetchProducts}
                    />
                  ))}
                </div>
              </div>
            </>
          ) : (
            <>
              <div className="text-center text-gray-500 text-lg h-96 mt-12 mb-12">
                <div className=" flex flex-col justify-center h-full max-h-full ">
                  <p className="text-2xl">Your wishlist is still empty.</p>
                  <p className="text-2xl">
                    Come on, add your favorite products now!
                  </p>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </>
  );
}
