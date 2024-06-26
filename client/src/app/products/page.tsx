"use client";

import ListProducts from "@/components/ListProducts";
import InfiniteScroll from "react-infinite-scroll-component";
import { useEffect, useState } from "react";
import { Products } from "@/db/models/products";
import { useDebounce } from "use-debounce";

const ProductsPage = () => {
  const [products, setProducts] = useState<Products[]>([]);
  const [hasMore, setHasMore] = useState(true);
  const [limit, setLimit] = useState(10);
  const [searchTerm, setSearchTerm] = useState("");
  const [debouncedSearchTerm] = useDebounce(searchTerm, 500);

  async function fetchProducts() {
    const response = await fetch(
      process.env.NEXT_PUBLIC_BASE_URL +
        `/api/products?limit=${limit}&search=${searchTerm}`,
      {
        cache: "no-store",
      }
    );
    const data: Products[] = await response.json();
    if (data.length < 49) {
      setTimeout(() => {
        setLimit(limit + 5);
        setProducts(data);
      }, 200);
    } else {
      setProducts(data);
      setHasMore(false);
    }
  }

  useEffect(() => {
    fetchProducts();
  }, [debouncedSearchTerm]);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  return (
    <section className="bg-white">
      <div className="flex justify-center">
        <div className="text-black relative m-4">
          <input
            className="py-2 px-4 bg-gray-100 rounded-md pl-10 focus:outline-none"
            type="text"
            placeholder="Search Product..."
            value={searchTerm}
            onChange={handleSearchChange}
          />
        </div>
      </div>
      <InfiniteScroll
        dataLength={products.length}
        next={fetchProducts}
        hasMore={hasMore}
        loader={hasMore ? <p className="text-black">Loading...</p> : null}
      >
        <div className="mx-8">
          <h6 className="text-black text-xl font-light tracking-widest mt-12">
            total products : {products.length}{" "}
          </h6>
        </div>
        <div>
          <ListProducts product={products} />
        </div>
      </InfiniteScroll>
    </section>
  );
};

export default ProductsPage;
