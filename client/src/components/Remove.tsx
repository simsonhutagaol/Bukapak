"use client";

import { ObjectId } from "mongodb";
import { FunctionComponent } from "react";
import Swal from "sweetalert2";
interface RemoveProps {
  productId: ObjectId;
  fetchProducts: () => Promise<void>;
}

const Remove: FunctionComponent<RemoveProps> = ({
  productId,
  fetchProducts,
}) => {
  async function handleDelete() {
    const confirmation = await Swal.fire({
      title: "Confirmation",
      text: "Are you sure you want to remove this product?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, remove it",
      cancelButtonText: "Cancel",
    });

    if (confirmation.isConfirmed) {
      const response = await fetch(
        process.env.NEXT_PUBLIC_BASE_URL + "/api/wishlist",
        {
          method: "DELETE",
          body: JSON.stringify({
            productId: String(productId),
          }),
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      await response.json();
      fetchProducts();
    }
  }

  return (
    <button
      onClick={() => {
        handleDelete();
      }}
      className="bg-red-400 text-black py-2 px-4 mt-4  hover:bg-red-200 "
      type="button"
    >
      Remove
    </button>
  );
};

export default Remove;
